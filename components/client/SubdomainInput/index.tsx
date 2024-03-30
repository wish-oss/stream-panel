'use client';

import {
  FormControl,
  FormLabel,
  InputProps,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
} from '@/components/chakra';

export type SubdomainInputProps = Partial<InputProps> & {
  label?: string;
  isOK?: boolean;
};

export const SubdomainInput = ({
  isDisabled,
  label = 'Subdomain',
  value,
  onChange,
  ...rest
}: SubdomainInputProps) => {
  return (
    <FormControl isDisabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <InputLeftAddon color="gray">
          <Text>https://</Text>
        </InputLeftAddon>
        <Input {...rest} placeholder="Your subdomain" value={value} onChange={onChange} />
        <InputRightAddon color="gray">
          <Text>.sieutoc.website</Text>
        </InputRightAddon>
      </InputGroup>
    </FormControl>
  );
};
