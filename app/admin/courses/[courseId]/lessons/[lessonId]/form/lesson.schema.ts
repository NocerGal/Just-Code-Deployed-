import { LessonState } from '@prisma/client';
import { z } from 'zod';

export const LESSON_STATUS = ['HIDDEN', 'PUBLIC', 'PUBLISHED'] as const;

export const LessonDetailsSchema = z.object({
  name: z.string().min(1).max(252),
  state: z.enum(LESSON_STATUS),
});

export type LessonDetailsSchema = z.infer<typeof LessonDetailsSchema>;
