import { getProject } from '@/lib/actions/project';
import { Stack } from '@/components/chakra';

// in order to use this variable, this page need to be server component
import { BASE_URL, EASYPANEL_URL } from '@/lib/constants';

import {
  DeleteForm,
  GeneralSettingsForm,
  QuickLinks,
} from './components';

export type SingleProjectPageProps = {
  params: {
    id: string;
  };
};

export default async function SingleProjectPage({ params }: SingleProjectPageProps) {
  const project = await getProject(params.id);

  if (!project) {
    return null;
  }

  return (
    <Stack width="100%" spacing={6}>
      {project && (
        <QuickLinks baseUrl={BASE_URL} easypanelUrl={EASYPANEL_URL} data={project} />
      )}

      {project && <GeneralSettingsForm data={project} />}

      {project && <DeleteForm data={project} />}
    </Stack>
  );
}
