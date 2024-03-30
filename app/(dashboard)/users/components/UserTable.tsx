'use client';

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Select,
  Skeleton,
  Text,
} from '@/components/chakra';
import { useAuth, useMemo, useSWR, useState } from '@/hooks';
import { ArrowBackIcon, ArrowForwardIcon } from '@/icons';
import { VirtualTable } from '@/components/client';
import { ColumnDef } from '@tanstack/react-table';
import { queryStringify } from '@/lib/parsers';
import { formatRelative } from '@/lib/utils';
import { ROW_HEIGHT } from '@/lib/constants';
import { User } from '@/types';

const rowsPerPageOptions = [20, 50, 100];

export const UserTable = () => {
  const { isAdmin } = useAuth();
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);

  const [index, setIndex] = useState(0);

  const queryString = queryStringify({
    skip: index * rowsPerPage,
    take: rowsPerPage,
    orderBy: [{ createdAt: 'desc' }],
  });

  const { data: userData, isLoading } = useSWR<User[]>(
    isAdmin ? `/api/users?${queryString}` : null
  );

  const userTableColumns: ColumnDef<User>[] = useMemo(
    () => [
      {
        header: '#',
        size: 10,
        cell({ row }) {
          return row.index + 1;
        },
      },
      {
        header: 'Name',
        cell({ row }) {
          const displayName = row.original.name ?? row.original.email;
          return <Text>{displayName}</Text>;
        },
      },
      {
        header: 'Role',
        cell(props) {
          return <Text>{props.row.original.role}</Text>;
        },
      },
      {
        header: 'Joined At',
        cell(props) {
          return <Text>{formatRelative(props.row.original.createdAt)}</Text>;
        },
      },
    ],
    []
  );

  if (isLoading) {
    return <Skeleton borderRadius="md" height={ROW_HEIGHT} />;
  }

  return (
    <Box width="100%">
      {userData && userData.length > 0 ? (
        <VirtualTable
          height={Math.min(rowsPerPage, userData.length + 1) * ROW_HEIGHT}
          data={userData}
          columns={userTableColumns}
        />
      ) : (
        <Center width="100%" height="50%">
          <Text>No users found</Text>
        </Center>
      )}
      <Flex justify="space-between" align="center" marginY={2}>
        <ButtonGroup size="sm" variant="outline">
          <Button
            isDisabled={index === 0}
            leftIcon={<ArrowBackIcon />}
            onClick={() => {
              setIndex((prev) => prev - 1);
            }}
          >
            Previous
          </Button>
          <Button
            isDisabled={!userData || userData.length === 0}
            rightIcon={<ArrowForwardIcon />}
            onClick={() => {
              setIndex((prev) => prev + 1);
            }}
          >
            Next
          </Button>
        </ButtonGroup>
        <Select
          size="sm"
          width="100px"
          borderRadius="md"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        >
          {rowsPerPageOptions.map((num) => (
            <option key={num} value={num}>
              {num} rows
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};
