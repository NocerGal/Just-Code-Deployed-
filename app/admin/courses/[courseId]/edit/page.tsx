import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { Typography } from '@/components/ui/Typography';
import { prisma } from '@/lib/prisma';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Label } from '@/components/ui/label';

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string().optional(),
});

export default async function EditCoursePage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session?.user.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardContent className="mt-6">
            <form
              action={async (formData) => {
                'use server';
                const userSession = await getRequiredAuthSession();

                const image = formData.get('image');
                const name = formData.get('name');
                const presentation = formData.get('presentation');

                const safeData = FormSchema.safeParse({
                  image,
                  name,
                  presentation,
                });

                if (!safeData.success) {
                  const searchParams = new URLSearchParams();
                  searchParams.set(
                    'error',
                    'Invalid data. Image must be an URL and name must be between 3 and 40 characters.'
                  );
                  redirect(
                    `/admin/courses/${
                      course.id
                    }/edit/edit?${searchParams.toString()}`
                  );
                }

                await prisma.course.update({
                  where: {
                    id: params.courseId,
                    creatorId: userSession.user.id,
                  },
                  data: safeData.data,
                });

                revalidatePath(`/admin/courses/${course.id}`);
                redirect(`/admin/courses/${course.id}`);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image URL</Label>
                <Input defaultValue={course.image} name="image" id="image" />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input defaultValue={course.name} name="name" id="name" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="presentation">Presentation</Label>
                <Textarea
                  defaultValue={course.presentation}
                  name="presentation"
                  id="presentation"
                />
              </div>

              {searchParams.error && (
                <Typography>Error: {searchParams.error as string}</Typography>
              )}
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
