'use client';

import {
  ButtonProps,
  Button,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Modal,
  Stack,
  Heading,
  Text,
  ModalFooter,
  ListItem,
  List,
  ListIcon,
  Badge,
  Flex,
} from '@/components/chakra';
import { CheckIcon, PremiumIcon } from '@/icons';
import { forwardRef, useState } from 'react';
import { FEATURES } from '@/lib/constants';
import { useDisclosure } from '@/hooks';

export type ProButtonProps = ButtonProps;

export const ProButton = forwardRef<HTMLButtonElement, ProButtonProps>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isYearly, setYearly] = useState(true);

  const billMode = isYearly ? 'yearly' : 'monthly';

  return (
    <>
      <Button ref={ref} leftIcon={<PremiumIcon />} onClick={onOpen} {...props} />
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={Stack} spacing={2}>
          <ModalHeader>
            <PremiumIcon /> Pika Pro
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as={Stack} spacing={6}>
            <Flex justify="space-between" align="center">
              <Heading size="md" textAlign="start">
                Billed {billMode}
                <Badge
                  py={1}
                  px={2}
                  marginLeft={2}
                  marginBottom={1}
                  fontSize="0.9em"
                  variant="outline"
                  borderRadius="lg"
                  colorScheme="green"
                  textTransform="lowercase"
                >
                  ${FEATURES['PRO'].price[billMode]}/month
                </Badge>
              </Heading>

              <Button size="xs" variant="ghost" onClick={() => setYearly(!isYearly)}>
                Switch to {isYearly ? 'monthly' : 'yearly'}
              </Button>
            </Flex>
            <List spacing={1}>
              {FEATURES['PRO'].features.map((feature, index) => (
                <ListItem key={`feature-${index}`}>
                  <Stack direction="row" align="flex-start" spacing={1}>
                    <ListIcon as={CheckIcon} color="brand.500" boxSize={2} mt={2} />
                    <Text>{feature}</Text>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </ModalBody>

          <ModalFooter as={Stack} spacing={6}>
            <Button size="lg" colorScheme="brand" onClick={onClose}>
              Upgrade to Pro (billed {billMode})
            </Button>

            <Button size="xs" variant="link" onClick={onClose}>
              Compare plans
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
