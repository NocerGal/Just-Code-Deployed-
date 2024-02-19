// import { env } from '@/lib/env';
// import { PrismaClient } from '@prisma/client';
// import NextAuth, { NextAuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';

// const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//   theme: {
//     logo: '/images/logo-text.png',
//   },
//   providers: [
//     GithubProvider({
//       clientId: env.AUTH_GITHUB_ID,
//       clientSecret: env.AUTH_GITHUB_SECRET,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   callbacks: {
//     session({ session, user }) {
//       session.user.id = user.id;
//       session.user.image = user.image;
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);

import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
// import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  theme: {
    logo: '/images/logo-text.png',
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_ID,
    //   clientSecret: env.GOOGLE_SECRET,
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.image = user.image;
      return session;
    },
  },
};

export default NextAuth(authOptions);
