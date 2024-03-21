'use client';

import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';

type SignInButtonProps = ButtonProps & {
  callbackUrl: string;
  children?: ReactNode;
};

export const SignInButton = ({
  callbackUrl,
  children,
  ...buttonProps
}: SignInButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button onClick={() => signIn()} {...buttonProps} disabled={pending}>
      {children}
    </Button>
  );
};
