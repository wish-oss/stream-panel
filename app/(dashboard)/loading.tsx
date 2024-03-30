import { Center, Spinner } from '@/components/chakra';

export default function Loading() {
  return (
    <Center width="100%" height="100%">
      <Spinner
        thickness="4px"
        speed="0.45s"
        emptyColor="white"
        color="blue.400"
        size="xl"
      />
    </Center>
  );
}
