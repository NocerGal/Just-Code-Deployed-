import Loader from '@/components/ui/loader';
import React from 'react';

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader className="animate-spin" size={32} />
    </div>
  );
}
