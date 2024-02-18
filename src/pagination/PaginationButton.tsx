'use client';

import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';

export type PaginationButtonProps = {
  totalPage: number;
  page: number;
  baseUrl: string;
};

export const PaginationButton = (props: PaginationButtonProps) => {
  const router = useRouter();
  const searchParams = new URLSearchParams({
    page: String(props.page - 1),
  });

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (props.page === 0) return;
          const searchParams = new URLSearchParams({
            page: String(props.page - 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (Math.ceil(props.totalPage / 5) === props.page + 1) return;
          const searchParams = new URLSearchParams({
            page: String(props.page + 1),
          });
          const url = `${props.baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Next
      </Button>
    </div>
  );
};
