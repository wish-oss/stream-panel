'use client';

import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  Stack,
  ButtonGroup,
  useColorModeValue,
} from '@/components/chakra';
import { GradientText, NextLink } from '@/components/client';
import {
  ChakraLogo,
  NextLogo,
  PrismaLogo,
  TypescriptLogo,
} from '@/icons';

export const HeroSection = () => {
  const logoColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Container maxW="full">
      <Center minHeight="100vh">
        <Container as={Stack} maxW="container.lg" textAlign="center" align="center">
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            POWERED BY{' '}
            <NextLink color='teal.499' href='https://easypanel.io'><GradientText>EASYPANEL</GradientText></NextLink>
        </span>
       
          <Heading size="4xl" mb={4}>
          Unlock seamless deployment of modern apps, <GradientText>with StreamPanel</GradientText>
          </Heading>

          <Container maxW="container.md" textAlign="center">
            <Text fontSize="xl">
            Let us handle your environment, from launch to expansion.
            </Text>
          </Container>

          <ButtonGroup mt={8} spacing={3} size="lg" colorScheme="brand">
            <NextLink href="/login">
              <Button variant="solid">Get started</Button>
            </NextLink>
            <Button variant="outline">Live demo</Button>
          </ButtonGroup>
          <Stack
            direction="row"
            justify="center"
            align="center"
            spacing={12}
            marginY={8}
            color={logoColor}
          >
            <NextLogo boxSize={16} />
            <PrismaLogo boxSize={14} />
            <TypescriptLogo boxSize={16} />
            <ChakraLogo boxSize={12} />
 
          </Stack>
        </Container>
      </Center>
    </Container>
  );
};
