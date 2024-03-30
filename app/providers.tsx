'use client';

import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@/components/chakra';
import { Provider as JotaiProvider } from 'jotai';
import { SWRConfig } from 'swr';

import { theme, toastOptions } from '@/lib/chakra';
import { swrConfigs } from '@/lib/utils';
import dynamic from 'next/dynamic';

const ColorModeScript = dynamic(
  () => import('@chakra-ui/react').then((mod) => mod.ColorModeScript),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={swrConfigs}>
      <SessionProvider>
        <JotaiProvider>
          <ChakraProvider theme={theme} toastOptions={{ defaultOptions: toastOptions }}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {children}
          </ChakraProvider>
        </JotaiProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
