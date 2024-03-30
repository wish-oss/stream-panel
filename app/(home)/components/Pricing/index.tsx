'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Switch,
  Text,
  VStack,
} from '@/components/chakra';
import { useState, useColorModeValue } from '@/hooks';
import { GradientText } from '@/components/client';
import { CheckIcon } from '@/icons';

export type PricingBoxProps = {
  pro?: boolean;
  ctaText?: string;
  name: string;
  price: string;
  isBilledAnnually?: boolean;
  features: string[];
};

export const PricingBox = ({
  ctaText,
  features,
  isBilledAnnually,
  name,
  price,
  pro,
}: PricingBoxProps) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const proBgColor = useColorModeValue('brand.50', 'brand.700');

  return (
    <Box
      p={8}
      bg={pro ? proBgColor : bgColor}
      borderColor={pro ? 'brand.300' : undefined}
      borderWidth={pro ? '2px' : undefined}
      borderRadius="lg"
    >
      <VStack spacing={3} align="flex-start">
        <Text fontWeight={600} casing="uppercase" fontSize="sm">
          {name}
        </Text>
        <Box w="full">
          <Text as="span" fontSize="5xl" fontWeight="bold">
            {price}
          </Text>
          {isBilledAnnually !== undefined && (
            <Text as="span" fontSize="sm" fontWeight="bold">
              {isBilledAnnually ? '/year' : '/month'}
            </Text>
          )}
        </Box>

        <Text>Unlock key features and higher usage limits</Text>

        <Button size="lg" colorScheme="brand">
          {ctaText ?? 'Free 14-day trial →'}
        </Button>

        <VStack pt={4} spacing={4} align="flex-start">
          <List spacing={3}>
            {features.map((feature, index) => (
              <ListItem key={`feature-${index}`}>
                <HStack align="flex-start" spacing={1}>
                  <ListIcon as={CheckIcon} color="brand.500" boxSize={2} mt={2} />
                  <Text>{feature}</Text>
                </HStack>
              </ListItem>
            ))}
          </List>
        </VStack>
      </VStack>
    </Box>
  );
};

export const PricingSection = () => {
  const [isAnnually, setAnnually] = useState(true);

  return (
    <Container py={20} maxW="container.lg" id="pricing">
      <VStack spacing={6} align="center">
        <Heading as="h2" size="xl" textAlign="center" maxW="container.md">
          Supercharge your development process with{' '}
          <GradientText>enterprise-level</GradientText> capabilities
        </Heading>

        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="billed-annually" mb="0">
            Billed Annually (Save up to 20%)
          </FormLabel>
          <Switch
            id="billed-annually"
            colorScheme="purple"
            isChecked={isAnnually}
            onChange={(e) => setAnnually(e.target.checked)}
          />
        </FormControl>

        <SimpleGrid columns={[1, null, 3]} spacing={6}>
          <PricingBox
            name="Starter"
            price={isAnnually ? '$9' : '$12'}
            isBilledAnnually={isAnnually}
            features={[
              'Up to 3 team members',
              'Up to 10 sites',
              'Intuitive, fast and privacy-friendly dashboard',
            ]}
          />

          <PricingBox
            pro
            name="Creator"
            price={isAnnually ? '$59' : '$62'}
            isBilledAnnually={isAnnually}
            features={[
              'Everything in Starter',
              'Up to 10 team members',
              'Up to 50 sites',
              'Lorem ipsum plan dono',
              'Something else longer so it will make two lines',
            ]}
          />

          <PricingBox
            name="Enterprise"
            price="Custom"
            ctaText="Contact Us"
            features={[
              'Everything in Creator',
              'Unlimited team members',
              'Unlimited sites',
              'Technical onboarding',
            ]}
          />
        </SimpleGrid>
      </VStack>
    </Container>
  );
};