import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';

import { CoursePlaceholder } from './CoursePlaceHolder';

export default async function CoursePage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <CoursePlaceholder />
      </LayoutContent>
    </Layout>
  );
}
