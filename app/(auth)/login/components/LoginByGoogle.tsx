'use client';

import { useState, useEffect, useSearchParams, useToast } from '@/hooks';
import { Button, Stack, Text } from '@/components/chakra';
import { signIn } from 'next-auth/react';
import { GoogleLogo } from '@/icons';

export type LoginByGoogleProps = {
  org?: string;
};

export const LoginByGoogle = ({ org }: LoginByGoogleProps) => {
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast({ description: errorMessage, status: 'error' });
  }, [error, toast]);

  const getCallbackUrl = () => {
    const callbackUrl = searchParams?.get('callbackUrl');

    if (typeof callbackUrl === 'string') {
      return callbackUrl;
    }

    return '/';
  };

  return (
    <Stack gap={1} textAlign="center" w="100%">
      <Button
        size="lg"
        colorScheme="brand"
        isLoading={isLoading}
        isDisabled={isLoading}
        leftIcon={<GoogleLogo />}
        loadingText="Login with Google"
        onClick={() => {
          setLoading(true);
          signIn('google', {
            redirect: true,
            callbackUrl: getCallbackUrl(),
          });
        }}
      >
        Login with Google
      </Button>

      {org && (
        <Text fontSize="small" color="gray">
          Only for members of @{org} at this time.
        </Text>
      )}
    </Stack>
  );
};
