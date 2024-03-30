'use client';

import OriginalNextImage, { type ImageProps } from 'next/image';
import { chakra } from '@/components/chakra';

export type NextImageProps = ImageProps;

export const NextImage = chakra<typeof OriginalNextImage, ImageProps>(OriginalNextImage, {
  shouldForwardProp: (prop) =>
    ['height', 'width', 'quality', 'src', 'alt', 'priority'].includes(prop),
});
