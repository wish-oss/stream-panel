import { Flex, Heading, Skeleton, Wrap, WrapItem } from '@/components/chakra';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { Suspense } from 'react';

import { UserTable } from './components';
import { UserRole } from '@/types';

const visibleRules = {
  [UserRole.ADMIN]: true,
  [UserRole.USER]: false,
};

export default async function UserPageView() {
  const { session } = await getSession();

  if (session && !visibleRules[session.user.role]) {
    redirect('/projects');
  }

  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex
        width="100%"
        height="48px"
        direction="row"
        justify="space-between"
        align="center"
        gap={6}
      >
        <Heading as="h1" size="lg">
          Users
        </Heading>
      </Flex>
      <Suspense
        fallback={
          <Wrap spacing={6}>
            {Array.from({ length: 3 }).map((_, i) => (
              <WrapItem key={i}>
                <Skeleton height="40px" borderRadius="md" />
              </WrapItem>
            ))}
          </Wrap>
        }
      >
        <UserTable />
      </Suspense>
    </Flex>
  );
}
