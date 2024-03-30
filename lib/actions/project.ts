'use server';

import { EnvironmentVariables, Project } from '@/types';
import { generatePassword } from '@/lib/generators';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const getProject = async (id: string) => {
  try {
    const { session, isAdmin } = await getSession();

    const project = await prisma.project.findUnique({
      include: { users: true },
      where: {
        id,
        users: isAdmin ? {} : { some: { id: session.user.id } },
      },
    });

    return project;
  } catch (error) {
    console.error(`Error while getting project by Id`, { cause: error });
  }
};

export type CreateProjectDto = Pick<Project, 'name' | 'description' | 'slug'>;

export const createProject = async (input: CreateProjectDto) => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const environmentVariables: EnvironmentVariables = {
    production: {
      NEXTAUTH_SECRET: generatePassword(),
      POSTGRES_PASSWORD: generatePassword({ hasSpecial: false }),
    },
    preview: {
      NEXTAUTH_SECRET: generatePassword(),
      POSTGRES_PASSWORD: generatePassword({ hasSpecial: false }),
    },
  };

  const response = await prisma.project.create({
    data: {
      ...input,
      environmentVariables,
      users: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return response;
};

export type UpdateProjectDto = Partial<Project>;

export const updateProject = async (id: string, data: UpdateProjectDto) => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const { name, description, slug, customDomain, template } = data;

  const response = await prisma.project.update({
    where: { id: id, users: { some: { id: session.user.id } } },
    data: {
      name,
      description,
      slug,
      customDomain: customDomain === '' ? null : customDomain,
      template,
    },
  });

  return response;
};

export const deleteProject = async (project: Project) => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized request');
  }

  const response = await prisma.project.delete({
    where: {
      id: project.id,
    },
  });

  return response;
};
