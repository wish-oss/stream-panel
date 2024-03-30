'use client';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Link,
  Skeleton,
  Stack,
  Text,
} from '@/components/chakra';
import { useAuth, useColorModeValue, useParams, useSWR } from '@/hooks';
import { IInspectedProject, IService } from 'easypanel.js';
import { ExternalLinkIcon } from '@/icons';
import { Project } from '@/types';

const getDomain = (s: IService) => {
  const primaryDomain = s.domains?.[0];

  if (!primaryDomain) {
    throw new Error('No primary domain found');
  }

  return `https://${primaryDomain.host}`;
};

export type QuickLinksProps = {
  data: Project;
  baseUrl?: string;
  easypanelUrl?: string;
};

// We will continue to work on this soon
export const QuickLinks = ({ easypanelUrl }: QuickLinksProps) => {
  const { id: projectId }: { id: string } = useParams();

  const { isAdmin } = useAuth();

  const footerBorder = useColorModeValue('gray.200', 'gray.600');

  const { data, isLoading } = useSWR<{
    project: Project;
    easypanelProject: IInspectedProject;
  }>(`/api/projects/${projectId}`);

  if (!data || isLoading) {
    return <Skeleton h="100px" />;
  }

  const { project, easypanelProject } = data;

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md">Quick Links</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6} minW="240px">
            <Stack direction="row" spacing={3}>
              {isAdmin && easypanelUrl && (
                <Button
                  rightIcon={<ExternalLinkIcon />}
                  colorScheme="green"
                  target="_blank"
                  as={Link}
                  href={`${easypanelUrl}/projects/${project.id}`}
                  variant="outline"
                >
                  Go to EasyPanel project
                </Button>
              )}

              {easypanelProject &&
                easypanelProject.services
                  .map((s) => (
                    <Button
                      key={s.name}
                      rightIcon={<ExternalLinkIcon />}
                      href={getDomain(s)}
                      colorScheme="blue"
                      variant="outline"
                      target="_blank"
                      as={Link}
                    >
                      Launch {s.name}
                    </Button>
                  ))}
            </Stack>
          </Stack>
        </CardBody>

        <Divider color={footerBorder} />

        <CardFooter>
          <Flex width="100%" direction="row" justify="start" align="center">
            <Text fontSize="sm" color="gray">
              For now we support only GitHub
            </Text>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};
