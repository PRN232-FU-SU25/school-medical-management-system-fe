// @ts-nocheck
import { Filter } from '../types';
import TextField from '@/components/shared/text-field';
import SelectField from '@/components/shared/select-field';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import DatePicker from './date-picker';
import __helpers from '@/helpers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useGetContractTypeList } from '@/queries/contract.query';

type FilterFormProps = {
  filterState: Filter;
  handleFilterChange: (
    key: keyof Filter,
    value: string | number | Date | boolean | undefined
  ) => void;
  validationErrors;
};

const placeholders: Record<string, string> = {
  title: 'Nhập tên hợp đồng...',
  contractTypeId: 'Chọn loại hợp đồng...',
  customerName: 'Nhập tên khách hàng...',
  signedDate: 'Chọn khoảng ngày ký...',
  effectiveDate: 'Chọn khoảng ngày hiệu lực...',
  expirationDate: 'Chọn khoảng ngày hết hạn...',
  priceRangeFrom: 'Tổi thiểu...',
  priceRangeTo: 'Tối đa...',
  appendixQuantity: 'Nhập số lượng phụ lục...'
};

const FilterForm = ({
  filterState,
  handleFilterChange,
  validationErrors
}: FilterFormProps) => {
  const { data: contractTypeLists, isPending } = useGetContractTypeList();

  if (isPending) return <DataTableSkeleton columnCount={1} rowCount={4} />;

  return (
    <>
      <div className="max-h-80 overflow-y-auto p-2">
        {/* Tên hợp đồng */}
        <div className="mb-4">
          <TextField
            id="keyword"
            label="Tên hợp đồng"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilterChange('title', e.target.value)
            }
            value={filterState.title || ''}
            placeholder={placeholders.title}
            maxLength={255}
          />
        </div>

        {/* Tên khách hàng */}
        <div className="mb-4">
          <TextField
            id="customerName"
            label="Khách hàng"
            onChange={(e) => handleFilterChange('customerName', e.target.value)}
            value={filterState.customerName || ''}
            placeholder={placeholders.customerName}
            maxLength={255}
          />
        </div>

        {/* Loại hợp đồng */}
        <div className="mb-4">
          <SelectField
            id="contractTypeId"
            label="Loại hợp đồng"
            onChange={(value) => handleFilterChange('contractTypeId', value)}
            options={contractTypeLists ?? []}
            value={filterState.contractTypeId?.toString() ?? ''}
            placeholder={placeholders.contractTypeId}
          />
        </div>

        {/* Số phụ lục */}
        <div className="mb-4">
          <TextField
            id="appendixCount"
            label="Số phụ lục"
            type="number"
            placeholder={placeholders.appendixQuantity}
            step={1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilterChange(
                'appendixQuantity',
                e.target.value === '' ? '' : Number(e.target.value)
              )
            }
            value={filterState.appendixQuantity}
            maxLength={3}
          />
        </div>

        {/* Giá trị hợp đồng */}
        <div className="mb-4">
          <Label>
            Giá trị hợp đồng{' '}
            <span className="text-xs text-gray-500">(VNĐ)</span>
          </Label>
          <div className="flex">
            <div className="flex items-center">
              <TextField
                id="contractValueMin"
                label=""
                placeholder={placeholders.priceRangeFrom}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange('priceRange', {
                    ...filterState.priceRange,
                    from: e.target.value !== '' ? Number(e.target.value) : ''
                  })
                }
                value={filterState.priceRange.from}
                maxLength={15}
              />
            </div>

            <div className="flex items-center">
              <TextField
                id="contractValueMax"
                label=""
                placeholder={placeholders.priceRangeTo}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange('priceRange', {
                    ...filterState.priceRange,
                    to: e.target.value !== '' ? Number(e.target.value) : ''
                  })
                }
                value={filterState.priceRange.to}
                maxLength={15}
              />
            </div>
          </div>
          {validationErrors.priceRange && (
            <div className="text-xs text-red-600">
              {validationErrors.priceRange}
            </div>
          )}
        </div>

        {/* Ngày ký */}
        <div className="mb-4">
          <DatePicker
            id="signedDate"
            label="Ngày ký (Chọn khoảng)"
            onChange={(range) =>
              handleFilterChange('signedDate', {
                from: range.from
                  ? __helpers.convertToDate(range.from, 'YYYY-MM-DD')
                  : null,
                to: range.to
                  ? __helpers.convertToDate(range.to, 'YYYY-MM-DD')
                  : null
              })
            }
            value={
              filterState.signedDate
                ? {
                    from: filterState.signedDate.from
                      ? __helpers.convertToDate(
                          filterState.signedDate.from,
                          'YYYY-MM-DD'
                        )
                      : undefined,
                    to: filterState.signedDate.to
                      ? __helpers.convertToDate(
                          filterState.signedDate.to,
                          'YYYY-MM-DD'
                        )
                      : undefined
                  }
                : undefined
            }
            placeholder={placeholders.signedDate}
          />
        </div>

        {/* Ngày hiệu lực */}
        <div className="mb-4">
          <DatePicker
            id="effectiveDate"
            label="Ngày hiệu lực (Chọn khoảng)"
            onChange={(range) =>
              handleFilterChange('effectiveDate', {
                from: range.from
                  ? __helpers.convertToDate(range.from, 'YYYY-MM-DD')
                  : null,
                to: range.to
                  ? __helpers.convertToDate(range.to, 'YYYY-MM-DD')
                  : null
              })
            }
            value={
              filterState.effectiveDate
                ? {
                    from: filterState.effectiveDate.from
                      ? __helpers.convertToDate(
                          filterState.effectiveDate.from,
                          'YYYY-MM-DD'
                        )
                      : undefined,
                    to: filterState.effectiveDate.to
                      ? __helpers.convertToDate(
                          filterState.effectiveDate.to,
                          'YYYY-MM-DD'
                        )
                      : undefined
                  }
                : undefined
            }
            placeholder={placeholders.effectiveDate}
          />
        </div>

        {/* Ngày hết hạn */}
        <div className="mb-4">
          <DatePicker
            id="expirationDate"
            label="Ngày hết hạn (Chọn khoảng)"
            onChange={(range) =>
              handleFilterChange('expirationDate', {
                from: range.from
                  ? __helpers.convertToDate(range.from, 'YYYY-MM-DD')
                  : null,
                to: range.to
                  ? __helpers.convertToDate(range.to, 'YYYY-MM-DD')
                  : null
              })
            }
            value={
              filterState.expirationDate
                ? {
                    from: filterState.expirationDate.from
                      ? __helpers.convertToDate(
                          filterState.expirationDate.from,
                          'YYYY-MM-DD'
                        )
                      : undefined,
                    to: filterState.expirationDate.to
                      ? __helpers.convertToDate(
                          filterState.expirationDate.to,
                          'YYYY-MM-DD'
                        )
                      : undefined
                  }
                : undefined
            }
            placeholder={placeholders.expirationDate}
          />
        </div>

        {/* Đã hết hạn */}
        <div className="mb-4 flex">
          <Label className="w-1/2">Đã hết hạn</Label>
          <Input
            type="checkbox"
            className="h-4 w-1/2"
            checked={!!filterState.isExpired}
            onChange={() =>
              handleFilterChange('isExpired', !filterState.isExpired)
            }
          />
        </div>
      </div>
    </>
  );
};

export default FilterForm;
