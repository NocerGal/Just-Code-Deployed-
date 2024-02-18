import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';

import Loader from '@/components/ui/loader';

export default async function CoursePage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Loader size={32} className="animate-spin" />
      </LayoutContent>
    </Layout>
  );
}
