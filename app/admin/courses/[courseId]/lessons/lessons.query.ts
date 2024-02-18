import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getCourseLessons = async ({
  creatorId,
  courseId,
}: {
  creatorId: string;
  courseId: string;
}) => {
  const lessons = await prisma.course.findFirst({
    where: {
      id: courseId,
      creatorId: creatorId,
    },

    select: {
      id: true,
      name: true,
      lessons: {
        orderBy: {
          rank: 'asc',
        },
        select: {
          id: true,
          name: true,
          state: true,
          courseId: true,
          rank: true,
        },
      },
    },
  });

  return lessons;
};

export type AdminLessonItemType = NonNullable<
  Prisma.PromiseReturnType<typeof getCourseLessons>
>['lessons'][number];
