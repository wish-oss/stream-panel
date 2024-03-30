import { Box, Flex } from '@/components/chakra';
import { ReactNode } from 'react';

import { Navbar } from './components';

export default async function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <Flex direction="column" height="100vh">
      <Navbar />

      <Box padding={0} width="100%" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
}
