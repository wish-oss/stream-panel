'use client';

import {
  useKeyPressEvent,
  useSearchParams,
  useEffect,
  useState,
  useToast,
} from '@/hooks';
import {
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Button,
  Alert,
  Input,
  Stack,
  Box,
} from '@/components/chakra';
import { signIn } from 'next-auth/react';
import { FlashIcon } from '@/icons';

export type LoginByEmailProps = {
  isRequested: boolean;
};

export const LoginByEmail = ({ isRequested }: LoginByEmailProps) => {
  const { toast } = useToast();

  const [isFocused, setFocused] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const [email, setEmail] = useState('');

  const handleSignIn = async () => {
    if (!email) {
      toast({ description: 'Email is required', status: 'info' });
      return;
    }

    if (isLoading) return;

    const callbackUrl = searchParams?.get('callbackUrl') ?? '/';

    setLoading(true);

    await signIn('email', {
      callbackUrl,
      email,
    });
  };

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast({ description: errorMessage, status: 'error' });
  }, [error, toast]);

  useKeyPressEvent('Enter', (e) => {
    if (isFocused && email && !isLoading) {
      e.preventDefault();
      handleSignIn();
    }
  });

  return (
    <Stack gap={4} w="100%">
      {isRequested && (
        <Alert status="success" variant="subtle" borderRadius="md" pb={4}>
          <AlertIcon boxSize="20px" />
          <Box>
            <AlertTitle mt={2}>Check your email!</AlertTitle>
            <AlertDescription fontSize="sm">
              We sent an email to you with a magic link that will sign you in. You can
              close this window.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <Input
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="email@example.com"
        focusBorderColor="brand.500"
        isDisabled={isLoading}
        name="login-email"
        borderWidth="2px"
        value={email}
        size="lg"
      />

      <Button
        leftIcon={<FlashIcon />}
        isDisabled={isLoading}
        onClick={handleSignIn}
        isLoading={isLoading}
        colorScheme="brand"
        size="lg"
      >
        Login with Email
      </Button>
    </Stack>
  );
};
