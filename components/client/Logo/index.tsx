'use client';

import { NextLink, NextImage } from '@/components/client';
import { Box, BoxProps } from '@/components/chakra';
import { useColorMode } from '@/hooks';
import { forwardRef } from 'react';

export type LogoProps = BoxProps & {
  href?: string;
  revert?: boolean;
  size?: 'md' | 'sm';
};

const calculateSize = (size: LogoProps['size']) => {
  const width = 56;
  const height = 20;

  if (size === 'sm') return { width: width / 2, height: height / 2 };
  return { width, height };
};

export const Logo = forwardRef<HTMLAnchorElement, LogoProps>(
  ({ href = '/', size = 'md', ...rest }, ref) => {
    const { colorMode } = useColorMode();

    return (
      <Box {...rest}>
        <NextLink ref={ref} href={href}>
          <NextImage
            src={`/${colorMode}.svg`}
            {...calculateSize(size)}
            placeholder="empty"
            alt="StreamPanel Logo"
            priority
          />
        </NextLink>
      </Box>
    );
  }
);
