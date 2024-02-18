import { getAuthSession } from '@/lib/auth';
import { getCourse } from '../course.query';
import LessonNavigationCard from './LessonNavigationCard';

export type LessonNavigationProps = {
  courseId: string;
};

export const LessonNavigation = async (props: LessonNavigationProps) => {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: props.courseId,
    userId: session?.user.id,
  });

  if (!course) {
    return null;
  }

  return <LessonNavigationCard course={course} />;
};
