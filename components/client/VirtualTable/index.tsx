import { TableVirtuoso, type TableComponents } from 'react-virtuoso';
import { forwardRef, useState, type CSSProperties } from 'react';
import {
  getFilteredRowModel,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  flexRender,
  type ColumnFiltersState,
  type SortingState,
  type CellContext,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table';
import {
  Box,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@/components/chakra';
import { useAtom, useColorModeValue } from '@/hooks';
import { globalFilterAtom } from '@/atoms';
import { ROW_HEIGHT } from '@/lib/constants';

const defaultComponents: TableComponents = {
  Table: (props) => (
    <TableContainer>
      <Table style={{ width: '100%', tableLayout: 'fixed' }} {...props} />
    </TableContainer>
  ),
  TableRow: ({ context, ...rest }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cursor = (context as any).clickable ? 'pointer' : 'default';
    const background = useColorModeValue('gray.50', 'whiteAlpha.50');
    return <Tr _hover={{ cursor, background }} {...rest} />;
  },
  TableHead: forwardRef((props, ref) => <Thead {...props} ref={ref} />),
  TableBody: forwardRef((props, ref) => <Tbody {...props} ref={ref} />),
  TableFoot: forwardRef((props, ref) => <Tfoot {...props} ref={ref} />),
};

type RowClickParams<TData extends RowData> = {
  item: TData;
  context: CellContext<TData, unknown>;
};

export type VirtualTableProps<TData extends RowData, TValue = unknown> = {
  href?: string;
  columns: ColumnDef<TData, TValue>[];
  components?: TableComponents;
  data: TData[];
  height?: CSSProperties['height'];
  loadMore?: (index: number) => void;
  isLoading?: boolean;
  onRowClick?: (p: RowClickParams<TData>) => void;
};

export const VirtualTable = <TData extends RowData, TValue = unknown>({
  columns,
  components = {},
  data,
  height,
  loadMore,
  isLoading,
  onRowClick,
}: VirtualTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useAtom(globalFilterAtom);

  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.100');

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { getRowModel, getHeaderGroups, getFooterGroups } = table;

  const { rows } = getRowModel();

  const headerGroups = getHeaderGroups();

  const headerRenderer = () =>
    headerGroups.map((headerGroup) => (
      <Tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          // const { filterable } = header.column.columnDef.meta ?? ({} as any);
          const size = header.getSize();

          return (
            <Th
              key={header.id}
              colSpan={header.colSpan}
              borderColor={borderColor}
              style={{ width: size, height: ROW_HEIGHT }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Th>
          );
        })}
      </Tr>
    ));

  const footerGroups = getFooterGroups();

  const footerRenderer = () =>
    isLoading
      ? footerGroups.map((footerGroup) => (
          <Tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <Th key={header.id} colSpan={header.colSpan} style={{ height: ROW_HEIGHT }}>
                <Skeleton width="70%" height={5} />
              </Th>
            ))}
          </Tr>
        ))
      : undefined;

  const rowRenderer = (index: number) => {
    const row = rows[index];
    const cells = row.getVisibleCells();

    return cells.map((cell) => {
      const context = cell.getContext();
      const item = context.row.original;

      return (
        <Td
          key={cell.id}
          borderColor={borderColor}
          onClick={() => onRowClick?.({ item, context })}
        >
          <Box noOfLines={1} maxWidth="100%">
            {flexRender(cell.column.columnDef.cell, context)}
          </Box>
        </Td>
      );
    });
  };

  const bgColor = useColorModeValue('white', 'gray.700');

  const wrapperStyles: CSSProperties = {
    borderColor,
    height: height ?? '100%',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
  };

  const TableComponents = {
    ...defaultComponents,
    ...components,
  };
  return (
    <Box flexGrow="1" borderRadius="md" bg={bgColor}>
      <TableVirtuoso
        style={wrapperStyles}
        context={{ clickable: !!onRowClick }}
        totalCount={rows.length}
        components={TableComponents}
        endReached={loadMore}
        fixedHeaderContent={headerRenderer}
        fixedFooterContent={footerRenderer}
        itemContent={rowRenderer}
        defaultItemHeight={ROW_HEIGHT}
        fixedItemHeight={ROW_HEIGHT}
      />
    </Box>
  );
};
