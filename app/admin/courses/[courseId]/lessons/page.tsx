import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Typography } from '@/components/ui/Typography';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getRequiredAuthSession } from '@/lib/auth';

import React from 'react';
import { getCourseLessons } from './lessons.query';
import { notFound, redirect } from 'next/navigation';
import { AdminLessonItem } from './AdminLessonItem';
import { SubmitButton } from '@/components/form/SubmitButton';
import { prisma } from '@/lib/prisma';
import { AdminLessonSortable } from './AdminLessonSortable';

export default async function CourseLessonsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  const course = await getCourseLessons({
    creatorId: session.user.id,
    courseId: params.courseId,
  });

  if (!course) return notFound();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lessons : {course?.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <AdminLessonSortable items={course.lessons} />
            <form>
              <SubmitButton
                size={'sm'}
                variant={'secondary'}
                className="w-full"
                formAction={async () => {
                  'use server';
                  const session = await getRequiredAuthSession();

                  const courseId = params.courseId;

                  const isAuthorized = await prisma.course.findFirstOrThrow({
                    where: {
                      creatorId: session.user.id,
                      id: courseId,
                    },
                  });

                  const lesson = await prisma.lesson.create({
                    data: {
                      name: 'Draft lesson',
                      rank: 'aaaaa',
                      state: 'HIDDEN',
                      courseId: courseId,
                      content: 'default content',
                    },
                  });
                  redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`);
                }}
              >
                Create lesson
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
