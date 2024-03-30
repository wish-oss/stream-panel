'use server';

import { easypanel } from '@/lib/easypanel';
import { delayAsync } from '@/lib/utils';
import { getSession } from '@/lib/auth';
import { templates } from '@/templates';

import { Project, Service } from '@/types';

export const createEasyPanelProject = async (project: Project) => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.projects.create({ name: project.id });

  await delayAsync(500);

  const template = templates.find((t) => t.slug === project.template);

  if (template) {
    const { services } = template.generate({ projectName: project.id });

    const requests = services.map(({ type, data }) => [
      easypanel.services.create({
        ...data,
        type,
        projectName: project.id,
      }),

      delayAsync(500),
    ]);

    await Promise.all(requests.flat());
  }

  // TODO: make the deploy later, it takes too long

  return response;
};

export const getEasyPanelProject = async ({ projectName }: { projectName: string }) => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.projects.inspect({ projectName });

  return response;
};

export const deleteEasyPanelProject = async ({ name }: { name: string }) => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const foundProject = await easypanel.projects.inspect({ projectName: name });

  // We have to delete all services inside before deleting the project
  const destroyRequests = foundProject.services.map((service) => {
    return easypanel.services.destroy({
      ...service,
      serviceName: service.name,
    });
  });

  await Promise.all(destroyRequests);

  const response = await easypanel.projects.destroy({ name });

  return response;
};

// TODO: replace with your app
export const updateDomains = async (
  input: Pick<Service, 'domains'> & Pick<Project, 'id'>
) => {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await easypanel.services.updateDomains({
    domains: input.domains,
    projectName: input.id,
    serviceName: 'nextjs',
    type: 'app',
  });

  return response;
};
