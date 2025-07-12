import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  useGetDataEmployee,
  useGetDataManager
} from '@/queries/employee.query';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';
interface DataTableProps<TData, TValue> {
  columns: any;
  data: TData[];
  pageSizeOptions?: number[];
  pageCount: number;
  showAdd?: boolean;
  heightTable?: string;
  displayDataRole?: string;
  isChange: boolean;
  setIsChange: any;
}

export default function EmployeeDataTable<TData, TValue>({
  columns,
  data: initialData,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showAdd = true,
  heightTable = '80dvh',
  displayDataRole,
  isChange,
  setIsChange
}: DataTableProps<TData, TValue>) {
  const {
    mutateAsync: getAllEmployeeData,
    isPending: isPendingGetDataEmployee
  } = useGetDataEmployee();
  const { mutateAsync: getAllManagerData, isPending: isPendingGetDataManager } =
    useGetDataManager();

  const [tableData, setTableData] = useState<TData[]>(initialData ?? []);
  const [totalPages, setTotalPages] = useState(pageCount ?? 1);

  const [searchParams, setSearchParams] = useSearchParams();

  const display = displayDataRole ?? 'manager';

  const page = isChange ? '1' : (searchParams?.get('page') ?? '1');
  const pageAsNumber = Number(page);
  const searchInput = searchParams?.get('search') ?? '';
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams?.get('limit') ?? '10';
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: fallbackPage - 1,
    pageSize: fallbackPerPage
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearchInput !== searchInput) {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [debouncedSearchInput, searchInput]);

  useEffect(() => {
    const fetchData = async () => {
      const searchObject = {
        pageIndex: pageAsNumber,
        pageSize: Number.parseInt(per_page),
        keyword: debouncedSearchInput.trim()
      };
      let response;

      if (display === 'manager') {
        response = await getAllManagerData(searchObject);
      } else if (display === 'employee') {
        response = await getAllEmployeeData(searchObject);
      }
      if (response) {
        setTableData(response.listObjects);
        setTotalPages(response.paging.totalPages || 1);
        setIsChange(false);
      }
    };

    fetchData();
  }, [
    debouncedSearchInput,
    pageAsNumber,
    per_page,
    display,
    getAllEmployeeData,
    getAllManagerData
  ]);
  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: isChange ? '1' : (pageIndex + 1).toString(),
      limit: pageSize.toString(),
      display: display
    });
  }, [pageIndex, pageSize, searchParams, display]);
  useEffect(() => {
    if (isChange) {
      setPagination({ pageIndex: 0, pageSize: fallbackPerPage });
    }
  }, [isChange, fallbackPerPage]);
  const table = useReactTable({
    data: tableData ?? initialData,
    columns,
    pageCount: totalPages ?? pageCount,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: { pageIndex, pageSize },
      sorting
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting
  });

  return (
    <>
      <ScrollArea
        className={`h-[calc(${heightTable}-220px)] md:h-[calc(${heightTable}-80px)]`}
      >
        <Table className="relative text-xs 2xl:text-sm">
          <TableHeader className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === 'asc'
                            ? 'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                          : undefined
                      }
                      className={cn(
                        'text-center uppercase text-gray-800',
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽'
                      }[header.column.getIsSorted() as string] ?? null}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPendingGetDataEmployee || isPendingGetDataManager ? (
              // Hiển thị hàng Skeleton khi đang tải dữ liệu
              Array.from({ length: perPageAsNumber }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell
                    colSpan={columns.length}
                    className="h-4 text-center"
                  >
                    <Skeleton className=" h-24 w-full bg-gray-300" />
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có kết quả
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-xs text-muted-foreground 2xl:text-sm">
            {/* {table.getFilteredSelectedRowModel().rows.length} trên{' '}
            {table.getFilteredRowModel().rows.length} hàng được chọn. */}
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-xs font-medium 2xl:text-sm">
                Hiển thị
              </p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value: string) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[150px] items-center justify-center text-xs font-medium 2xl:text-sm">
            Trang {isChange ? 1 : table.getState().pagination.pageIndex + 1}{' '}
            trên {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 border-2 p-0 hover:border-primary hover:text-primary lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 border-2 p-0 hover:border-primary hover:text-primary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 border-2 p-0 hover:border-primary hover:text-primary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 border-2 p-0 hover:border-primary hover:text-primary lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
