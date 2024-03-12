/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { PaginationButton } from '@/pagination/PaginationButton';
import { Typography } from '@/components/ui/Typography';
import { getAdminCourse } from './admin-course.query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Badge } from '@/components/ui/badge';
import { getRequiredAuthSession } from '@/lib/auth';

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);

  const session = await getRequiredAuthSession();

  const course = await getAdminCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.users?.map((user) => (
                  <TableRow>
                    <TableCell>
                      <Avatar className="rounded">
                        <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                        {user.image && (
                          <AvatarImage
                            src={user.image}
                            alt={user.email ?? ''}
                          />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/users/${user.id}`}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {user.canceled ? 'Canceled' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex flex-row-reverse">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button asChild size="sm" variant="secondary">
                            <span>
                              <Menu size={16} />
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <form>
                              <button
                                formAction={async () => {
                                  'use server';
                                  const session =
                                    await getRequiredAuthSession();

                                  const courseId = params.courseId;

                                  const userId = user.id;

                                  const courseonUser =
                                    await prisma.courseOnUser.findFirst({
                                      where: {
                                        userId: userId,
                                        course: {
                                          id: courseId,
                                          creatorId: session?.user.id,
                                        },
                                      },
                                    });
                                  if (!courseonUser) return;

                                  await prisma.courseOnUser.update({
                                    where: {
                                      id: courseonUser.id,
                                    },
                                    data: {
                                      canceledAt: courseonUser.canceledAt
                                        ? null
                                        : new Date(),
                                    },
                                  });

                                  revalidatePath(`/admin.courses/${courseId}`);
                                }}
                              >
                                {user.canceled ? 'Activate' : 'Cancel'}
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <PaginationButton
              baseUrl={`/admin/courses/${course.id}`}
              page={page}
              totalPage={course._count?.users ?? 0 / 5}
            />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <Avatar className="rounded">
              <AvatarFallback>{course.name?.[0]}</AvatarFallback>
              {course.image && (
                <AvatarImage src={course.image} alt={course.name ?? ''} />
              )}
            </Avatar>
            <CardTitle>{course.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <Typography>{course._count?.users} users</Typography>
            <Typography>{course._count?.lessons} lessons</Typography>
            <Link
              href={`/admin/courses/${course.id}/edit`}
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              Edit
            </Link>
            <Link
              href={`/admin/courses/${course.id}/lessons`}
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              Edit lessons
            </Link>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
