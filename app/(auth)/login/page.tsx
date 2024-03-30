import { Divider, Heading, Stack } from '@/components/chakra';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextLink, ColorModeSwitcher, GradientText } from '@/components/client';

import { LoginByEmail, LoginByGithub, LoginByGoogle } from './components';

const hasGithubProvider = !!process.env.GITHUB_ID && !!process.env.GITHUB_SECRET;
const hasEmailProvider = !!process.env.SMTP_USER && !!process.env.SMTP_PASSWORD;
const hasGoogleProvider = !!process.env.GOOGLE_CLIENT_ID && !! process.env.GOOGLE_CLIENT_SECRET;

export default async function LoginPage() {
  const { session } = await getSession();

  if (session) {
    redirect('/projects');
  }

  const cookieStore = cookies();
  const requestCookie = cookieStore.get('verificationRequest');
  const isRequested = !!requestCookie && requestCookie.value === 'true';

  return (
    <Stack
      gap={4}
      maxWidth="sm"
      marginX="auto"
      marginTop="10vh"
      align="center"
      justify="center"
    >
      <ColorModeSwitcher />
      <NextLink href="/">
        <span style={{ fontSize: '40px', fontWeight: 'bold' }}><GradientText>Stream Panel</GradientText></span>
      </NextLink>

      <Heading as="h1" size="lg">
        Login
      </Heading>

      {hasEmailProvider && (
        <>
          <Divider />
          <LoginByEmail isRequested={isRequested} />
        </>
      )}

      {hasGithubProvider && (
        <>
          <Divider />
          <LoginByGithub org={process.env.GITHUB_ORG} />
        </>
      )}

      {hasGoogleProvider && (
        <>
          <Divider />
          <LoginByGoogle />
        </>
      )}
    </Stack>
  );
}
