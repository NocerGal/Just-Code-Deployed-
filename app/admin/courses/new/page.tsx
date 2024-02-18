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
import { CourseForm } from '../[courseId]/edit/CourseForm';

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string().optional(),
});

export default async function EditCoursePage() {
  const session = await getRequiredAuthSession();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="mb-4 flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CourseForm />
        </Card>
      </LayoutContent>
    </Layout>
  );
}
