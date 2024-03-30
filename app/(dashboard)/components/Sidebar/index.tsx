'use client';

import {
  useSelectedLayoutSegments,
  useColorModeValue,
  useParams,
  useAuth,
  useMemo,
} from '@/hooks';
import { ArrowBackIcon, DashboardIcon, GlobeIcon, UsersIcon } from '@/icons';
import { Box, Button, Flex, Stack, Skeleton } from '@/components/chakra';
import { ColorModeSwitcher, NextLink, GradientText } from '@/components/client';
import { ReactNode, UserRole } from '@/types';

export type NavbarProps = {
  children: ReactNode;
};

export const Sidebar = ({ children }: NavbarProps) => {
  const { session } = useAuth();
  const { id } = useParams() as { id?: string };

  const segments = useSelectedLayoutSegments();

  const tabs = useMemo(() => {
    if (segments[0] === 'projects' && id) {
      return [
        {
          name: 'Back to All Projects',
          href: '/projects',
          icon: <ArrowBackIcon boxSize={4} />,
          isActive: false,
          visible: {
            [UserRole.ADMIN]: true,
            [UserRole.USER]: true,
          },
        },
        {
          name: 'General',
          href: `/projects/${id}`,
          icon: <DashboardIcon boxSize={4} />,
          isActive: !segments[2],
          visible: {
            [UserRole.ADMIN]: true,
            [UserRole.USER]: true,
          },
        },
      ];
    }

    return [
      {
        name: 'Projects',
        href: '/projects',
        icon: <GlobeIcon boxSize={4} />,
        isActive: segments[0] === 'projects',
        visible: {
          [UserRole.ADMIN]: true,
          [UserRole.USER]: true,
        },
      },
      {
        name: 'Users',
        href: '/users',
        icon: <UsersIcon boxSize={4} />,
        isActive: segments[0] === 'users',
        visible: {
          [UserRole.ADMIN]: true,
          [UserRole.USER]: false,
        },
      },
    ];
  }, [segments, id]);

  const backgroundColor = useColorModeValue('white', 'black');

  return (
    <Flex
      width={{ sm: '240px', lg: '420px' }}
      background={backgroundColor}
      justify="space-between"
      direction="column"
      height="100vh"
      padding={4}
    >
      <Box>
        <Flex direction="row" justify="space-between" align="end">
          <NextLink href="/">
            <span style={{ fontSize: '25px', fontWeight: 'bold' }}><GradientText>Stream Panel</GradientText></span>
          </NextLink>

          <ColorModeSwitcher size="sm" />
        </Flex>

        <Stack marginTop={6} spacing={1}>
          {session ? (
            tabs
              .filter(({ visible }) => visible[session?.user.role])
              .map(({ name, href, icon, isActive }) => (
                <Button
                  key={name}
                  colorScheme={isActive ? 'brand' : 'gray'}
                  variant={isActive ? 'outline' : 'ghost'}
                  justifyContent="start"
                  leftIcon={icon}
                  as={NextLink}
                  width="100%"
                  href={href}
                >
                  {name}
                </Button>
              ))
          ) : (
            <>
              <Skeleton h="40px" />
              <Skeleton h="40px" />
            </>
          )}
        </Stack>
      </Box>

      <Box>{children}</Box>
    </Flex>
  );
};
