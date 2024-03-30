'use client';

import { IconButton } from '@/components/chakra';
import { signOut } from 'next-auth/react';

import { LogoutIcon } from '@/icons';

export const LogoutButton = () => {
  return (
    <IconButton
      onClick={() => signOut()}
      icon={<LogoutIcon />}
      aria-label="Logout"
      variant="outline"
      size="sm"
    />
  );
};
