'use client';

import { toSlugWithSuffix } from '@/lib/slugUtils';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from '@/components/chakra';
import { useAuth, useColorModeValue, useDebounce, useState } from '@/hooks';
import { updateProject } from '@/lib/actions/project';
import { isEqual } from '@/lib/utils';
import { RepeatIcon, SaveIcon } from '@/icons';
import { Project } from '@/types';

export type GeneralSettingsFormProps = {
  data: Project;
};

export const GeneralSettingsForm = ({ data }: GeneralSettingsFormProps) => {
  const { update } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const initialData = {
    name: data.name ?? '',
    slug: data.slug ?? '',
    description: data.description ?? '',
  };

  const [formValues, setFormValues] = useState(initialData);

  const id = data.id ?? '';

  // Generate slug on name change
  const generateSlug = (name: string) => {
    return toSlugWithSuffix(name);
  }

  useDebounce(() => {
    const slug = toSlugWithSuffix(formValues.name);

    setFormValues(prev => ({
      ...prev,
      slug
    }));
  }, 200, [formValues.name]);

  const handleSave = async () => {
    if (!id) return;

    setIsLoading(true);

    const res = await updateProject(id, formValues);

    if (res) {
      update();
    }

    setIsLoading(false);
  };

  const hasChanged = !isEqual(formValues, initialData);

  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

  return (
    <Card direction="column" width="100%">
      <CardHeader>
        <Heading size="md">General Settings</Heading>
      </CardHeader>
      <CardBody pt="0" borderBottomColor={borderColor} borderBottomWidth="1px">
        <Stack spacing={6} maxW="480px" minW="240px">
          <FormControl isDisabled={isLoading}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Project name"
              value={formValues.name ?? ''}
              onChange={(event) =>
                setFormValues(() => ({ ...formValues, name: event.target.value }))
              }
            />
          </FormControl>

          <FormControl isDisabled={isLoading}>
            <FormLabel>Slug</FormLabel>
            <Input
              placeholder="Slug"
              value={formValues.slug ?? ''}
              onChange={(event) =>
                setFormValues(() => ({ ...formValues, slug: event.target.value }))
              }
            />
          </FormControl>

          <FormControl isDisabled={isLoading}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Project description"
              rows={3}
              value={formValues.description ?? ''}
              onChange={(event) =>
                setFormValues(() => ({ ...formValues, description: event.target.value }))
              }
            />
          </FormControl>
        </Stack>
      </CardBody>

      <CardFooter>
        <Flex width="100%" direction="row" justify="space-between" align="center">
          <Text fontSize="sm" color="gray">
            The info here only used for management, the real data might be different.
          </Text>

          <Stack direction="row">
            {hasChanged && (
              <Button
                aria-label="Reset"
                leftIcon={<RepeatIcon />}
                onClick={() => setFormValues(initialData)}
              >
                Reset
              </Button>
            )}
            <Button
              colorScheme={hasChanged ? 'green' : 'gray'}
              isDisabled={!hasChanged || isLoading}
              isLoading={isLoading}
              leftIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </Flex>
      </CardFooter>
    </Card>
  );
};
