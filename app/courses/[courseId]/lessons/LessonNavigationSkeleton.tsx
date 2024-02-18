import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LessonItemPlaceholder } from './LessonItemPlaceHolder';
import { Skeleton } from '@/components/ui/skeleton';

export const LessonNavigationSkeleton = () => {
  return (
    <Card className="max-w-xs flex-1">
      <CardHeader>
        <Skeleton className="h-8 w-40" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <LessonItemPlaceholder key={index} />
        ))}
      </CardContent>
    </Card>
  );
};
