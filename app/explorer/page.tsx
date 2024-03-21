import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';

import {
  getCourses,
  getPublicCoursesWithPublishedLessons,
} from '../courses/course.query';
import { CourseCard } from '../courses/CourseCard';

export type pageProps = {};

export default async function ExplorerPage() {
  const courses = await getPublicCoursesWithPublishedLessons();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard course={course} key={course.id}></CourseCard>
        ))}
      </LayoutContent>
    </Layout>
  );
}
