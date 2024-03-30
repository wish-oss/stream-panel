import { Flex, Heading, Text } from '@/components/chakra';
import { NextImage } from '@/components/client';

export default function NotFoundProject() {
  return (
    <Flex>
      <Heading as="h1">404</Heading>
      <NextImage
        alt="missing"
        src="https://illustrations.popsy.co/gray/falling.svg"
        width={400}
        height={400}
        className="dark:hidden"
      />
      <NextImage
        alt="missing"
        src="https://illustrations.popsy.co/white/falling.svg"
        width={400}
        height={400}
        className="hidden dark:block"
      />
      <Text>Project does not exist, or you do not have permission to view it</Text>
    </Flex>
  );
}
