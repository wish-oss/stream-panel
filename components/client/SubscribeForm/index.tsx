'use client';

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@/components/chakra';
import { useColorModeValue, useState, useToast } from '@/hooks';
import { HttpMethod, SubscribeResponse } from '@/types';
import { NextLink } from '@/components/client';
import { fetcher } from '@/lib/utils';

export type SubscribeFormProps = {
  heading?: string;
  lists: number[];
};

export const SubscribeForm = ({
  heading = 'Subscribe for updates',
  lists,
}: SubscribeFormProps) => {
  const inputBgColor = useColorModeValue('gray.100', 'gray.800');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleSubscribe = async () => {
    const response = await fetcher<SubscribeResponse>('/api/mailinglist/subscribers', {
      method: HttpMethod.POST,
      body: JSON.stringify({
        name: name ? name : 'subscriber',
        status: 'enabled',
        lists,
        email,
      }),
    });

    if (response.data) {
      toast({ description: 'Successfully subscribed! Please check your mailbox' });
    } else {
      toast({ description: 'Something wrong, please contact support', status: 'error' });
    }
  };

  return (
    <SimpleGrid
      minChildWidth="300px"
      alignItems="center"
      maxW="container.lg"
      spacingX={10}
      spacingY={10}
      my={8}
    >
      <Stack spacing={0}>
        <Heading as="h3" fontSize="3xl" fontWeight="bold">
          {heading}
        </Heading>
        <Text fontSize="sm">
          By subscribing, you agree with our{' '}
          <Button as={NextLink} size="sm" variant="link" href="/">
            Terms
          </Button>{' '}
          and{' '}
          <Button as={NextLink} size="sm" variant="link" href="/">
            Privacy Policy.
          </Button>
        </Text>
      </Stack>
      {name && (
        <FormControl as={Stack} direction="row">
          <FormLabel>Name</FormLabel>
          <Input
            onChange={(e) => setName(e.target.value)}
            focusBorderColor="brand.500"
            bgColor={inputBgColor}
            value={name}
            name="name"
            size="lg"
          />
        </FormControl>
      )}
      <FormControl as={Stack} direction="row">
        <FormLabel hidden>Subscribe</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          focusBorderColor="brand.500"
          bgColor={inputBgColor}
          value={email}
          type="email"
          size="lg"
        />
        <Button colorScheme="brand" size="lg" onClick={handleSubscribe}>
          Subscribe
        </Button>
      </FormControl>
    </SimpleGrid>
  );
};
