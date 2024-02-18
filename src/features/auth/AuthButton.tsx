import { getAuthSession } from '@/lib/auth';
import React from 'react';
import { LogginButton } from './LogginButton';
import LoggedInButton from './LoggedInButton';

type AuthButton = {};

export default async function AuthButton(props: AuthButton) {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    return <LogginButton />;
  }
  return <LoggedInButton user={user} />;
}
