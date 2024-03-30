import { Flex, Heading, Skeleton, Wrap, WrapItem } from '@/components/chakra';
import { Suspense } from 'react';

import { CreateNewButton, Projects } from './components';

export default async function ProjectsPageView() {
  return (
    <Flex width="100%" direction="column" gap={6}>
      <Flex
        justify="space-between"
        direction="row"
        align="center"
        height="48px"
        width="100%"
        gap={6}
      >
        <Heading as="h1" size="lg">
          Projects
        </Heading>

        <CreateNewButton />
      </Flex>
      <Suspense
        fallback={
          <Wrap spacing={6}>
            {Array.from({ length: 3 }).map((_, i) => (
              <WrapItem key={i}>
                <Skeleton height="40px" />
              </WrapItem>
            ))}
          </Wrap>
        }
      >
        <Projects />
      </Suspense>
    </Flex>
  );
}