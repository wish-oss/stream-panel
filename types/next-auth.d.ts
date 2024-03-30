import NextAuth, { DefaultSession, Account } from 'next-auth';
import { User as PrismaUser, UserRole } from '@prisma/client';

declare module 'next-auth/adapters' {
  interface AdapterUser extends PrismaUser {}
}

declare module 'next-auth/core/types' {
  interface Session {
    account: Account;

    user: DefaultSession['user'] & {
      id: string;
      username: string;
      role: UserRole;
    };
  }
}
