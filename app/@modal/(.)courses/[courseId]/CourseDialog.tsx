'use client';

import { PropsWithChildren } from 'react';
import { CourseType } from '../../../courses/[courseId]/course.query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';

export type CourseDialogProps = PropsWithChildren<{ course: CourseType }>;

export const CourseDialog = (props: CourseDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const iseCoursePage = pathname?.split('/').filter(Boolean).length === 2;

  console.log(pathname, iseCoursePage);
  return (
    <Dialog
      open={iseCoursePage}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>{props.course.name}</DialogTitle>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
