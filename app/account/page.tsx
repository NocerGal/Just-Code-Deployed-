import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAuthSession } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { LogoutButton } from '@/features/auth/LogoutButton';

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('no session found');
  }

  return (
    <Card className="m-auto mt-4 w-full max-w-lg">
      <CardHeader className="flex flex-row gap-4 space-y-0">
        <Avatar>
          <AvatarFallback>{session.user.email?.[0]}</AvatarFallback>
          {session.user.image && (
            <AvatarImage src={session.user.image} alt="user image" />
          )}
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{session.user.email}</CardTitle>
          <CardDescription>{session.user.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          href="/account/settings"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Settings
        </Link>
        <Link
          href="/admin"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Admin
        </Link>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
