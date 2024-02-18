'use client';

import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { useMutation } from '@tanstack/react-query';
import { LogIn, LogOut } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';

export const LogoutButton = () => {
  const mutation = useMutation({
    mutationFn: async () => signOut(),
  });
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? (
        <Loader className="mr-2" size={12} />
      ) : (
        <LogOut className="mr-2" size={12} />
      )}
      Logout
    </Button>
  );
};
