import { Typography } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BookCheck, Presentation, User2 } from 'lucide-react';

export type QuickStatsProps = {};

export const QuickStats = async (props: QuickStatsProps) => {
  const session = await getRequiredAuthSession();

  const users = await prisma.user.count({
    where: {
      ownedCourses: {
        some: {
          course: {
            creatorId: session.user.id,
          },
        },
      },
    },
  });

  const lessons = await prisma.lesson.count({
    where: {
      course: {
        creatorId: session.user.id,
      },
    },
  });

  const courses = await prisma.course.count({
    where: {
      creatorId: session.user.id,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick stats</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography className="flex items-center">
          <User2 className="mr-2 inline" size={16} />
          {users} user
        </Typography>
        <Typography className="flex items-center">
          <BookCheck className="mr-2 inline" size={16} />
          {lessons} lessons
        </Typography>
        <Typography className="flex items-center">
          <Presentation className="mr-2 inline" size={16} />
          {courses} courses
        </Typography>
      </CardContent>
    </Card>
  );
};
