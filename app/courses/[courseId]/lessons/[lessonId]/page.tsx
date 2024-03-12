import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLesson } from './lesson.query';
import { MdxProse } from './MdxProse';
import { getAuthSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SubmitButton } from '@/components/form/SubmitButton';
import { handleLessonState } from './lesson.action';
import { OperLessonNavigationButton } from './OpenLessonNavigationButton';

export default async function LessonPage({
  params: { lessonId, courseId },
}: {
  params: {
    lessonId: string;
    courseId: string;
  };
}) {
  const session = await getAuthSession();
  const lesson = await getLesson(lessonId, session?.user.id);

  if (!lesson) {
    notFound();
  }

  const isAuthorized = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      users: {
        where: {
          userId: session?.user.id ?? '-',
          canceledAt: null,
        },
      },
    },
  });

  if (lesson?.state !== 'PUBLIC' && !isAuthorized?.users.length) {
    throw new Error('Unauthorized');
  }

  return (
    <Card className="flex-1">
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <OperLessonNavigationButton />
        <CardTitle>{lesson.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <MdxProse markdown={lesson.content} />
        <form className="m-auto flex max-w-2xl flex-row-reverse">
          <SubmitButton
            formAction={async () => {
              'use server';
              await handleLessonState({
                lessonId: lesson.id,
                progress:
                  lesson.progress === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED',
              });
            }}
          >
            {lesson.progress === 'COMPLETED'
              ? 'Mark as in progress'
              : 'Completed'}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
