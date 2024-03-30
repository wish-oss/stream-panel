import {
  Table,
  TableContainer,
  TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@/components/chakra';
import { Record } from '@prisma/client/runtime/library';

type ColumnDefinition = {
  header: string;
  accessorKey: string;
};

export type SimpleTableProps = {
  data: Record<string, string | number>[];
  columns: ColumnDefinition[];
  tableProps?: Partial<TableProps>;
};

export const SimpleTable = ({ data, columns, tableProps = {} }: SimpleTableProps) => {
  return (
    <TableContainer>
      <Table size="sm" {...tableProps}>
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={`${column.header}-${index}`}>{column.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rIndex) => (
            <Tr key={`${row.id}-${rIndex}`}>
              {columns.map((column, cIndex) => (
                <Td key={`${column.accessorKey}-${cIndex}`}>{row[column.accessorKey]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
