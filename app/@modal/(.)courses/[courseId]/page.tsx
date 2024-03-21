import { getAuthSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { getCourse } from '../../../courses/[courseId]/course.query';
import { CourseDialog } from './CourseDialog';
import { Course } from '../../../courses/[courseId]/Course';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Suspense } from 'react';
import { CoursePlaceholder } from '../../../courses/[courseId]/CoursePlaceHolder';

export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await getAuthSession();

  const course = await getCourse({
    courseId: params.courseId,
    userId: session?.user.id,
  });

  if (!course) {
    notFound();
  }
  return (
    <CourseDialog>
      <Suspense
        fallback={
          <>
            <DialogHeader>
              <DialogTitle>Loading...</DialogTitle>
            </DialogHeader>
            <CoursePlaceholder />
          </>
        }
      >
        <CourseWithData courseId={params.courseId} />
      </Suspense>
    </CourseDialog>
  );
}

const CourseWithData = async ({ courseId }: { courseId: string }) => {
  const course = await getCourse({
    courseId: courseId,
  });

  if (!course) {
    notFound();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{course.name}</DialogTitle>
      </DialogHeader>
      <Course course={course} />
    </>
  );
};
