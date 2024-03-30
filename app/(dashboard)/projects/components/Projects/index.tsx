'use client';

import { Flex, Heading, Skeleton, Text, Wrap, WrapItem } from '@/components/chakra';
import { NextImage } from '@/components/client';
import { Project } from '@/types';
import { useSWR } from '@/hooks';

import { ProjectCard } from './ProjectCard';

export const Projects = () => {
  const { data: projects, isLoading } = useSWR<Project[]>('/api/projects');

  if (isLoading || !projects) {
    return <Skeleton height={10} width="300px" />;
  }

  return projects.length > 0 ? (
    <Wrap spacing={6}>
      {projects.map((project) => (
        <WrapItem key={project.id}>
          <ProjectCard data={project} />
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <Flex direction="column" alignItems="center">
      <Heading as="h1" size="3xl" color="gray">
        No Projects Yet
      </Heading>

      <NextImage priority alt="missing" src="/web-design.svg" width={400} height={400} />

      <Text className="text-lg text-stone-500">
        You do not have any projects yet. Create one to get started.
      </Text>
    </Flex>
  );
};
