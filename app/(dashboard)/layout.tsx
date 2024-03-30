import { Box, Flex, Skeleton } from '@/components/chakra';
import { ReactNode, Suspense } from 'react';

import { Sidebar, Profile } from './components';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Flex>
      <Sidebar>
        <Suspense fallback={<Skeleton height="24px" />}>
          <Profile />
        </Suspense>
      </Sidebar>

      <Box padding={6} width="100%" height="100vh" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}
