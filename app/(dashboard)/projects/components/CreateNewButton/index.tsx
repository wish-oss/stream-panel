'use client';

import { toSlugWithSuffix } from '@/lib/slugUtils';
import {
  Button,
  Code,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
} from '@/components/chakra';
import {
  useAuth,
  useDebounce,
  useDisclosure,
  useRef,
  useRouter,
  useState,
  useToast,
} from '@/hooks';
import { createEasyPanelProject } from '@/lib/actions/easypanel';
import { createProject } from '@/lib/actions/project';
import { AddIcon, EditIcon } from '@/icons';
import { templates } from '@/templates';

const initialValues = {
  name: '',
  slug: '',
  description: '',
  template: templates[0].slug,
};

export type CreateNewButtonProps = {
  isDisabled?: boolean;
};

export const CreateNewButton = ({ isDisabled }: CreateNewButtonProps) => {
  const { session } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addToast, updateToast } = useToast();

  const initialRef = useRef(null);

  const finalRef = useRef(null);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(initialValues);

  const [slugEditing, setSlugEditing] = useState(false);

  const isValid = !!data.template && !!data.name && !!data.slug;

    // Generate slug on name change
    const generateSlug = (name: string) => {
      return toSlugWithSuffix(name);
    }

    useDebounce(() => {
      const slug = toSlugWithSuffix(data.name);

      setData(prev => ({
        ...prev,
        slug
      }));
    }, 200, [data.name]);

  const handleCancel = () => {
    onClose();
    setData(initialValues);
    setSlugEditing(false);
  };

  const handleSubmit = async () => {
    try {
      if (!session || !session.user) {
        addToast({ title: 'Authentication issue', status: 'error' });

        return;
      }

      setIsLoading(true);

      addToast({ title: 'Creating your project...' });

      const newProject = await createProject(data);

      if (newProject) {
        await createEasyPanelProject(newProject);

        updateToast({ title: 'Done!' });

        router.refresh();
        router.push(`/projects/${newProject.id}`);

        onClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log('### error: ', { error });
      addToast({
        status: 'error',
        title: `Problem while creating project. ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        ref={finalRef}
        isDisabled={isDisabled}
        leftIcon={<AddIcon />}
        colorScheme="brand"
        onClick={onOpen}
      >
        Create New Project
      </Button>

      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Stack spacing={3}>
              {templates.length > 0 && (
                <FormControl isDisabled={isLoading}>
                  <FormLabel>Template</FormLabel>
                  <Select
                    placeholder="Generate from template"
                    value={data.template}
                    onChange={(e) => setData({ ...data, template: e.target.value })}
                  >
                    {templates.map(({ slug, title }) => (
                      <option key={slug} value={slug}>
                        {title}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
              <FormControl isRequired isDisabled={isLoading}>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Project name"
                  value={data.name}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
                {!slugEditing && data.slug && (
                  <FormHelperText as={Flex} align="center" gap={2}>
                    <Text>Slug:</Text>
                    <Code paddingX={2} padding={1} fontSize="small" borderRadius="sm">
                      {data.slug}
                    </Code>
                    <IconButton
                      aria-label="Edit slug"
                      size="xs"
                      icon={<EditIcon />}
                      onClick={() => setSlugEditing(true)}
                    />
                  </FormHelperText>
                )}
              </FormControl>

              {slugEditing && (
                <FormControl isDisabled={isLoading}>
                  <FormLabel>Slug</FormLabel>
                  <Input
                    isDisabled={isLoading}
                    placeholder="slug"
                    value={data.slug}
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        slug: event.target.value.toLowerCase(),
                      }))
                    }
                  />
                </FormControl>
              )}

              <FormControl isDisabled={isLoading}>
                <FormLabel>Description (Optional)</FormLabel>
                <Textarea
                  rows={3}
                  placeholder="Optional but recommended"
                  value={data.description}
                  onChange={(event) =>
                    setData((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row" spacing={3}>
              <Button onClick={handleCancel}>Cancel</Button>

              <Button
                isDisabled={!isValid || isLoading}
                loadingText="Creating..."
                colorScheme="brand"
                isLoading={isLoading}
                leftIcon={<AddIcon />}
                onClick={handleSubmit}
              >
                Create Project
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
