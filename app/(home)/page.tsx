import { Box } from '@/components/chakra';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { HeroSection } from './components';

export default async function HomePage() {
  const { session } = await getSession();

  if (session) {
    redirect('/projects');
  }

  return (
    <Box maxW="full">
      <HeroSection />
    </Box>
  );
}

