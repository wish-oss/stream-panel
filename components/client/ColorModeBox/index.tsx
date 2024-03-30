'use client';

import { Box, BoxProps } from '@/components/chakra';
import { useColorModeValue } from '@/hooks';

// Just simple Box with default background color
// to black and white based on the color mode
export const ColorModeBox = (props: BoxProps) => {
  const bg = useColorModeValue('white', 'black');

  return <Box bg={bg} {...props} />;
};
