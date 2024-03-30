import { ColorModeBox } from '@/components/client';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Login | StreamPanel Platform',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ColorModeBox pt={5} pb={10} h="100vh">
      {children}
    </ColorModeBox>
  );
}
