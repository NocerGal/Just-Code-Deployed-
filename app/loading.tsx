import Loader from '@/components/ui/loader';
import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader className="animate-spin" size={32} />
    </div>
  );
}
