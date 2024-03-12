'use client';

import { PropsWithChildren } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { usePathname, useRouter } from 'next/navigation';

export type CourseDialogProps = PropsWithChildren;

export const CourseDialog = ({ children }: CourseDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isCoursePage = pathname?.split('/').filter(Boolean).length === 2;

  return (
    <Dialog
      open={isCoursePage}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        {children}
      </DialogContent>
    </Dialog>
  );
};
