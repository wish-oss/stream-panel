import { Account, NextAuthOptions, Session, getServerSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { AdapterUser } from 'next-auth/adapters';
import { Organization, UserRole } from '@/types';
import { render } from '@react-email/render';
import { prisma } from '@/lib/prisma';
import { fetcher } from '@/lib/utils';
import { cookies } from 'next/headers';

import MagicLinkTemplate from './emails/MagicLink';
import { sendEmail } from './nodemailer';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (input) => {
      if (!input.email) throw new Error('Email is required when sign up');

      const numOfUsers = await prisma.user.count();

      return (await prisma.user.create({
        data: {
          ...input,
          role: numOfUsers === 0 ? UserRole.ADMIN : UserRole.USER,
        },
      })) as AdapterUser;
    },
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,

      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    EmailProvider({
      maxAge: 60 * 30,
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM ?? 'noreply@sieutoc.website',
      async sendVerificationRequest({ identifier, url }) {
        const magicTemplate = MagicLinkTemplate({
          confirmUrl: url,
          baseUrl: process.env.NEXTAUTH_URL,
        });

        await sendEmail({
          to: identifier,
          subject: 'Login to StreamPanel ⚡',
          html: render(magicTemplate),
          text: render(magicTemplate, { plainText: true }),
        });
      },
    }),
  ],

  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: '/login', // Error code passed in query string as ?error=
  },

  session: { strategy: 'jwt' },

  callbacks: {
    signIn: async ({ profile, account, email }) => {
      if (profile && account && account.provider === 'github') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orgs = await fetcher<Organization[]>((profile as any).organizations_url);

        if (process.env.GITHUB_ORG) {
          // Allow only people inside the organization
          return orgs.some((org) => org.login === process.env.GITHUB_ORG);
        }

        return true;
      }

      if (account && account.provider === 'email') {
        const cookieStore = cookies();
        cookieStore.set('verificationRequest', `${!!email}`);

        // TODO: Make the check for org domain
        return true;
      }

      if (account && account.provider === 'google') {
        return true;
      }

      return false;
    },

    jwt: async ({ token, user, account }) => {
      if (account) {
        token.account = account;
      }

      if (user) {
        token.user = user;
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (token && token.user && token.account) {
        session.account = token.account as Account;

        session.user = {
          ...session.user,
          id: token.sub as string, // we can be sure sub is inside token
          username: (token.user as AdapterUser).username ?? 'no-username',
          role: (token.user as AdapterUser).role ?? UserRole.USER,
        };
      }

      return session;
    },
  },
};

export async function getSession() {
  const session = (await getServerSession(authOptions)) as Session;

  const isAdmin = session?.user?.role === UserRole.ADMIN;

  return {
    session,
    isAdmin,
  };
}
