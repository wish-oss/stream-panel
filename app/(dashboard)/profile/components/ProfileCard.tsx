'use client';

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@/components/chakra';
import { Session } from 'next-auth';

export type ProfileCardProps = {
  data: Session['user'];
};

export const ProfileCard = ({ data }: ProfileCardProps) => {
  return (
    <Card maxW="md">
      <CardHeader>
        <Heading size="md">{data.name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Email
            </Heading>
            <Text pt="2" fontSize="sm">
              {data.email}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Role
            </Heading>
            <Text pt="2" fontSize="sm">
              {data.role}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
