'use client';

import { Text, TextProps } from '@/components/chakra';

export const GradientText = (props: TextProps) => {
  return (
    <Text
      bgGradient="linear(to-l, var(--chakra-colors-purple-500), var(--chakra-colors-brand-500))"
      bgClip="text"
      as="span"
      {...props}
    />
  );
};
