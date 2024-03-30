import { Box, Code, IconButton, Stack, StackProps } from '@/components/chakra';
import { CheckCircleIcon, CopyIcon } from '@/icons';
import { useClipboard } from '@/hooks';

export type CopyableProps = {
  children?: React.ReactNode;
  value: string;
  wrapperProps?: StackProps;
};

export const Copyable = ({ children, value, wrapperProps }: CopyableProps) => {
  const { onCopy, hasCopied } = useClipboard(value);

  return (
    <Stack direction="row" align="center" {...wrapperProps}>
      <Box>
        <Code padding={3} fontSize="xs" borderRadius="md">
          {children ?? value}
        </Code>
      </Box>

      <IconButton
        aria-label="Copy"
        colorScheme={hasCopied ? 'blue' : 'green'}
        icon={hasCopied ? <CheckCircleIcon /> : <CopyIcon />}
        onClick={onCopy}
      />
    </Stack>
  );
};
