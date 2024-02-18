'use server';
import { authenticatedAction } from '@/lib/action';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { LessonDetailsSchema } from './form/lesson.schema';

const LessonActionEditDetailsSchema = z.object({
  lessonId: z.string(),
  data: LessonDetailsSchema,
});

export const lessionActionEditDetails = authenticatedAction(
  LessonActionEditDetailsSchema,

  async (props, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: props.lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: props.data,
    });

    return {
      message: 'Lesson updated successfully',
      lesson,
    };
  }
);

const lessionActionEditContentSchema = z.object({
  lessonId: z.string(),
  markdown: z.string(),
});

export const lessionActionEditContent = authenticatedAction(
  lessionActionEditContentSchema,

  async ({ lessonId, markdown }, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: { content: markdown },
    });

    return {
      message: 'Lesson updated successfully',
      lesson,
    };
  }
);
