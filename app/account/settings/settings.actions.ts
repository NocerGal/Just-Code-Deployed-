'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const updateUserDatas = async (
  updatedName: string,
  updateImageUrl: string,
  userId?: string
) => {
  prisma.user.update({
    where: { id: userId },
    data: {
      name: updatedName,
      image: updateImageUrl,
    },
  });

  redirect('/account/settings');
};
