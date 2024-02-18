import { prisma } from '@/lib/prisma';

export const getUserData = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },

    select: {
      name: true,
      image: true,
    },
  });
};
