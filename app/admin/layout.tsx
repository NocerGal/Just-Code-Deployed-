import { BackButton } from '@/components/utils/BackButton';
import { Breadcrumb } from '@/components/utils/Breadcrumb';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex-1">
        <div className="mx-auto mt-4 border-b border-border/20">
          <div className="m-auto flex max-w-3xl items-center gap-2 py-1">
            <BackButton variant="ghost" size="sm">
              Back
            </BackButton>
            <Breadcrumb />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
