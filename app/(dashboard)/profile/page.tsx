import { Flex, Heading } from '@/components/chakra';
import { getSession } from '@/lib/auth';

import { ProfileCard } from './components';

export default async function ProfileSettingsPage() {
  const { session } = await getSession();

  if (!session) {
    return null;
  }

  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex height="48px" align="center">
        <Heading as="h1" size="lg">
          Profile Settings
        </Heading>
      </Flex>

      <ProfileCard data={session.user} />
    </Flex>
  );
}
