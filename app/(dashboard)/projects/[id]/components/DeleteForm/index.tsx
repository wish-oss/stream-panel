'use client';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  Skeleton,
  Stack,
  Text,
} from '@/components/chakra';
import {
  useColorModeValue,
  useDisclosure,
  useRef,
  useRouter,
  useState,
  useToast,
} from '@/hooks';
import { deleteEasyPanelProject } from '@/lib/actions/easypanel';
import { deleteProject } from '@/lib/actions/project';
import { DeleteIcon } from '@/icons';
import { Project } from '@/types';

export type DeleteFormProps = {
  data: Project;
};

export const DeleteForm = ({ data }: DeleteFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addToast, updateToast } = useToast();
  const cancelRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [confirmName, setConfirmName] = useState('');

  const id = data?.id ?? '';

  const handleCancel = () => {
    setConfirmName('');
    onClose();
  };

  const handleDelete = async () => {
    try {
      // if (!session || !session.user) {
      //   toast({ title: 'Authentication issue', status: 'error' });

      //   return;
      // }
      if (!data) return;

      setIsLoading(true);

      addToast({ title: 'Start deleting...' });

      const deletedProject = await deleteProject(data);

      updateToast({ title: '...deleting EasyPanel project too' });

      await deleteEasyPanelProject({ name: data.id });

      updateToast({ title: 'Finally, deleted project!' });

      setIsLoading(false);

      onClose();

      if (deletedProject) {
        router.push('/projects');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      addToast({
        status: 'error',
        title: `Error while deleting project. ${error.message}`,
      });
    }
  };

  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
  const dangerColor = useColorModeValue('red.600', 'red.400');

  if (!id) {
    return <Skeleton height="40px" />;
  }

  return (
    <>
      <Card direction="column" width="100%">
        <CardHeader>
          <Heading size="md" color={dangerColor}>
            Delete Project
          </Heading>
        </CardHeader>

        <CardBody pt="0" borderBottomColor={borderColor} borderBottomWidth="1px">
          <Stack spacing={6} maxW="480px" minW="240px">
            <Text>
              The project will be permanently deleted, including its deployments, GitHub
              repo and domains. This action is irreversible and can not be undone.
            </Text>
          </Stack>
        </CardBody>

        <CardFooter>
          <Flex width="100%" direction="row" justify="end">
            <Button
              colorScheme="red"
              variant="outline"
              isDisabled={isLoading}
              isLoading={isLoading}
              leftIcon={<DeleteIcon />}
              onClick={onOpen}
            >
              Delete
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Are you sure?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
              <FormLabel>
                Confirm by typing project name:{' '}
                <Text as="span" fontWeight="bold">
                  {data?.name}
                </Text>
              </FormLabel>
              <Input
                placeholder="Project name"
                value={confirmName ?? ''}
                onChange={(event) => setConfirmName(event.target.value)}
              />
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Stack direction="row" spacing={3}>
              <Button ref={cancelRef} isDisabled={isLoading} onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                isDisabled={confirmName !== data?.name || isLoading}
                colorScheme="red"
                onClick={handleDelete}
              >
                Yes, delete it
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};