// @ts-nocheck
import BasePages from '@/components/shared/base-pages.js';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useState, useEffect } from 'react';
import { contractColumns } from './column';
import { Filter } from './types';
import {
  exportToExcel,
  getItemWithExpiration,
  setItemWithExpiration
} from './helpers';
import { headersContractExcel } from '@/constants/data';
import FilterForm from './components/FilterForm';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useSearchParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useGetContractByRole } from '@/queries/contract.query';
import DataTable from './components/ContractTable';
import { useRouter } from '@/routes/hooks';

const reportFilterKey = 'rfk';

export default function ReportPage() {
  const [searchParams] = useSearchParams();
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<Filter>(
    getItemWithExpiration(reportFilterKey) ?? {
      pageIndex: Number(searchParams.get('page')),
      pageSize: Number(searchParams.get('limit')),
      title: '',
      customerName: '',
      contractTypeId: undefined,
      priceRange: { from: '', to: '' },
      effectiveDate: { from: '', to: '' },
      expirationDate: { from: '', to: '' },
      signedDate: { from: '', to: '' },
      isExpired: false,
      appendixQuantity: ''
    }
  );
  const [validationErrors, setValidationErrors] = useState<{
    contractValue?: string;
  }>({});
  const [contractSelected, setContractSelected] = useState<number | null>(null);

  // Lọc những field khác null
  const getFilteredPayload = (
    filterState: Filter,
    searchParams: URLSearchParams
  ) => {
    return Object.fromEntries(
      Object.entries({
        ...filterState,
        pageIndex: Number(searchParams.get('page')),
        pageSize: Number(searchParams.get('limit'))
      }).filter(([key, value]) => {
        if (
          typeof value === 'object' &&
          value !== null &&
          'from' in value &&
          'to' in value
        ) {
          return value.from && value.to;
        }
        return value !== undefined && value !== '';
      })
    );
  };

  const {
    isPending,
    data: contractData,
    isError,
    refetch
  } = useGetContractByRole(getFilteredPayload(filterState, searchParams));

  // Chuyển page || limit
  useEffect(() => {
    const contractModel = {
      ...filterState,
      pageIndex: Number(searchParams.get('page')),
      pageSize: Number(searchParams.get('limit'))
    };
    refetch(getFilteredPayload(contractModel, searchParams));
  }, [searchParams, refetch, filterState]);

  // Xử lý thay đổi filter
  const handleFilterChange = (
    key: keyof Filter,
    value: string | number | Date | boolean | undefined
  ) => {
    setFilterState((prevState) => {
      const newFilterState = {
        ...prevState,
        [key]: value
      };
      const errors = validateFilter(newFilterState);
      if (Object.keys(errors).length === 0)
        setItemWithExpiration(reportFilterKey, newFilterState, 1000 * 60 * 5);
      setValidationErrors(errors);
      return newFilterState;
    });
  };

  // Validate filter
  const validateFilter = (filterState: Filter) => {
    const errors: Record<string, string> = {};
    const { priceRange } = filterState;

    if (
      priceRange &&
      priceRange.from !== '' &&
      priceRange.to !== '' &&
      Number(priceRange.from) > Number(priceRange.to)
    ) {
      errors.contractValue =
        'Giá trị tối thiểu phải nhỏ hơn hoặc bằng giá trị tối đa.';
    }

    return errors;
  };

  // Hiện các toast
  useEffect(() => {
    if (isError)
      toast({
        variant: 'destructive',
        title: 'Không thể lấy dữ liệu',
        duration: 3000
      });
  }, [isError]);

  useEffect(() => {
    if (contractSelected !== null && contractSelected !== undefined)
      router.push(`/contract/${contractSelected}`);
  }, [contractSelected, router]);

  // Tạo tên file
  const generateReportFileName = (filterState: Filter) => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const filters: string[] = [];

    if (filterState.isExpired) filters.push('HetHan');
    if (filterState.effectiveDate?.from && filterState.effectiveDate?.to) {
      filters.push(
        `NgayHieuLuc-${filterState.effectiveDate.from}-${filterState.effectiveDate.to}`
      );
    }
    if (filterState.expirationDate?.from && filterState.expirationDate?.to) {
      filters.push(
        `NgayHetHan-${filterState.expirationDate.from}-${filterState.expirationDate.to}`
      );
    }
    if (filterState.signedDate?.from && filterState.signedDate?.to) {
      filters.push(
        `NgayKy-${filterState.signedDate.from}-${filterState.signedDate.to}`
      );
    }
    if (filterState.priceRange?.from && filterState.priceRange?.to) {
      filters.push(
        `GiaTri-${filterState.priceRange.from}-${filterState.priceRange.to}`
      );
    }

    return `bao-cao-hop-dong_${date}_${filters.join('_')}.xlsx`;
  };

  if (contractData === undefined) return;

  return (
    <BasePages
      pageHead="Báo cáo | S-Contract"
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Báo cáo', link: '/report' }
      ]}
    >
      <div className="mt-2 rounded bg-white p-3 shadow-md">
        <div className="flex justify-end pr-[50px]">
          <div className="relative">
            <Button
              className="mr-3 text-white"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Icons.filter size={25} className="pr-2" />
              Lọc
            </Button>
            {isFilterOpen && (
              <div className="absolute left-1/2 top-full z-10 mt-2 w-[395px] -translate-x-1/2 transform rounded border border-gray-200 bg-white p-4 shadow-md">
                <FilterForm
                  filterState={filterState}
                  handleFilterChange={handleFilterChange}
                  validationErrors={validationErrors}
                />
              </div>
            )}
          </div>

          <Button
            className="bg-green-700 text-white"
            onClick={() => {
              exportToExcel(
                contractData.listObjects,
                generateReportFileName(filterState),
                headersContractExcel
              );
            }}
          >
            <Icons.upload size={25} className="pr-2" />
            Xuất báo cáo
          </Button>
        </div>
        <div>
          {isPending ? (
            <DataTableSkeleton columnCount={9} rowCount={10} />
          ) : (
            <DataTable
              selectContract={setContractSelected}
              contractSelected={contractSelected}
              columns={contractColumns}
              data={contractData.listObjects}
              pageCount={contractData.paging.totalPages || 1}
            />
          )}
        </div>
      </div>
    </BasePages>
  );
}
