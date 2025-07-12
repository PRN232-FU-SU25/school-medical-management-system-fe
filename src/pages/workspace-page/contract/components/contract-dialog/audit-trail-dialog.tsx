import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { historyActionMapping, historyCategoryMapping } from '@/constants/data';
import { PDF } from '@/constants/SVGIcon';
import __helpers from '@/helpers';
import {
  useGetContractTypeList,
  useGetCustomerList
} from '@/queries/contract.query';
import { useDownloadFile, useOpenFile } from '@/queries/file.query';

type Props = {
  auditTrail?: any;
};

export default function AuditTrailDialog({ auditTrail }: Props) {
  const { mutateAsync: download } = useDownloadFile();
  const { mutateAsync: open } = useOpenFile();
  const { data: customerList, isPending: isCustomerListPending } =
    useGetCustomerList();
  const { data: typeList, isPending: isTypeListPending } =
    useGetContractTypeList();

  const handleDownload = async (fileName: string) => {
    await download(fileName);
  };

  const handleOpenFile = async (fileName: string) => {
    await open(fileName);
  };

  const action = historyActionMapping[auditTrail.action] || auditTrail.action;
  const category =
    historyCategoryMapping[auditTrail.category] || auditTrail.category;

  const renderContractInfo = (storedData: any) => {
    return (
      <>
        <h3 className="text-lg">Tên: {storedData.title}</h3>

        <div className="flex flex-col gap-2 rounded-lg p-2">
          <div className="flex items-center gap-40">
            <div>
              <div>
                <strong>Giá trị:</strong>{' '}
                {storedData.totalAmount
                  ? __helpers.formatNumberWithDot(storedData.totalAmount) +
                    ' VNĐ'
                  : 'Chưa có'}
              </div>
              <div>
                <strong>Khách hàng:</strong>{' '}
                {
                  customerList?.find(
                    (type) => type.value == storedData?.customerId
                  )?.label
                }
              </div>
              <div>
                <strong>Loại hợp đồng:</strong>{' '}
                {
                  typeList?.find(
                    (type) => type.value == storedData?.contractTypeId
                  )?.label
                }
              </div>
            </div>
            <div>
              <div>
                <strong>Ngày ký:</strong>{' '}
                {__helpers.convertToDate(storedData.signedDate)}
              </div>
              <div>
                <strong>Ngày hiệu lực:</strong>{' '}
                {__helpers.convertToDate(storedData.effectiveDate)}
              </div>
              <div>
                <strong>Ngày hết hạn:</strong>{' '}
                {__helpers.convertToDate(storedData.expirationDate)}
              </div>
            </div>
          </div>
          <div>
            <div>
              <strong>Thông báo trước hết hạn hợp đồng:</strong>{' '}
              {storedData.contractDaysLeft} ngày
            </div>
            <div>
              <strong>Thông báo trước hết hạn phụ lục hợp đồng:</strong>{' '}
              {storedData.appendixDaysLeft} ngày
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <h4 className="text-lg">Nội dung chính: </h4>
            <p className="p-2">{storedData.keyContent}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 font-normal">
          <div className="text-lg font-medium">Hợp đồng</div>
          {storedData && storedData.contractFile && (
            <div className="w-full">
              <div className="flex w-full items-start gap-6 rounded-lg bg-secondary p-4">
                <div>
                  <PDF />
                </div>
                <div className="flex h-11 w-full flex-col justify-between">
                  <div className="w-3/4 truncate">
                    {__helpers.getFileName(storedData.contractFile)}
                  </div>
                  <div
                    className="flex cursor-pointer items-end justify-end gap-1 text-xs font-light"
                    onClick={() => handleDownload(storedData.contractFile)}
                  >
                    <div className="flex h-4 w-4 items-center justify-center">
                      <Icons.download className="size-3" />
                    </div>
                    Tải về
                  </div>
                </div>
              </div>
            </div>
          )}
          <Button
            size={'lg'}
            variant={'outlineBlue'}
            className="border-2"
            onClick={() => handleOpenFile(storedData.contractFile)}
          >
            Xem hợp đồng
          </Button>
        </div>
      </>
    );
  };

  const renderContractAppendixInfo = (storedData: any) => {
    return (
      <>
        <h3 className="text-lg">Tên: {storedData.title}</h3>

        <div className="flex flex-col gap-2 rounded-lg p-2">
          <div className="flex items-center gap-40">
            <div>
              <div>
                <strong>Ngày ký:</strong>{' '}
                {__helpers.convertToDate(storedData.signedDate)}
              </div>
              <div>
                <strong>Ngày hiệu lực:</strong>{' '}
                {__helpers.convertToDate(storedData.effectiveDate)}
              </div>
              <div>
                <strong>Ngày hết hạn:</strong>{' '}
                {__helpers.convertToDate(storedData.expirationDate)}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <h4 className="text-lg">Nội dung chính: </h4>
            <p className="p-2">{storedData.content}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 font-normal">
          <div className="text-lg font-medium">Phụ lục hợp đồng</div>
          {storedData && storedData.fileName && (
            <div className="w-full">
              <div className="flex w-full items-start gap-6 rounded-lg bg-secondary p-4">
                <div>
                  <PDF />
                </div>
                <div className="flex h-11 w-full flex-col justify-between">
                  <div className="w-3/4 truncate">
                    {__helpers.getFileName(storedData.fileName)}
                  </div>
                  <div
                    className="flex cursor-pointer items-end justify-end gap-1 text-xs font-light"
                    onClick={() => handleDownload(storedData.fileName)}
                  >
                    <div className="flex h-4 w-4 items-center justify-center">
                      <Icons.download className="size-3" />
                    </div>
                    Tải về
                  </div>
                </div>
              </div>
            </div>
          )}
          <Button
            size={'lg'}
            variant={'outlineBlue'}
            className="border-2"
            onClick={() => handleOpenFile(storedData.fileName)}
          >
            Xem phụ lục hợp đồng
          </Button>
        </div>
      </>
    );
  };

  const renderContractDocumentInfo = (storedData: any) => {
    return (
      <>
        <h3 className="text-lg">Tên: {storedData.name}</h3>

        <div className="mb-4">
          <div className="flex items-center">
            <h4 className="text-lg">Nội dung chính: </h4>
            <p className="p-2">{storedData.description}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 font-normal">
          <div className="text-lg font-medium">Tài liệu đính kèm</div>
          {storedData && storedData.fileName && (
            <div className="w-full">
              <div className="flex w-full items-start gap-6 rounded-lg bg-secondary p-4">
                <div>
                  <PDF />
                </div>
                <div className="flex h-11 w-full flex-col justify-between">
                  <div className="w-3/4 truncate">
                    {__helpers.getFileName(storedData.fileName)}
                  </div>
                  <div
                    className="flex cursor-pointer items-end justify-end gap-1 text-xs font-light"
                    onClick={() => handleDownload(storedData.fileName)}
                  >
                    <div className="flex h-4 w-4 items-center justify-center">
                      <Icons.download className="size-3" />
                    </div>
                    Tải về
                  </div>
                </div>
              </div>
            </div>
          )}
          <Button
            size={'lg'}
            variant={'outlineBlue'}
            className="border-2"
            onClick={() => handleOpenFile(storedData.fileName)}
          >
            Xem tài liệu đính kèm
          </Button>
        </div>
      </>
    );
  };

  const renderContractServiceInfo = (storedData: any) => {
    return (
      <>
        <h3 className="text-lg">Tên: {storedData.name}</h3>

        <div className="flex flex-col gap-2 rounded-lg p-2">
          <div className="flex items-center gap-40">
            <div>
              <div>
                <strong>Giá trị:</strong>{' '}
                {storedData.unitPrice
                  ? __helpers.formatNumberWithDot(storedData.unitPrice) + ' VNĐ'
                  : 'Chưa có'}
              </div>
              <div>
                <strong>Thuế:</strong>{' '}
                {storedData.tax
                  ? __helpers.formatNumberWithDot(storedData.tax) + '%'
                  : '0%'}
              </div>
              <div>
                <strong>Tổng giá trị:</strong>{' '}
                {storedData.totalPrice
                  ? __helpers.formatNumberWithDot(storedData.totalPrice) +
                    ' VNĐ'
                  : 'Chưa có'}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <h4 className="text-lg">Nội dung chính: </h4>
            <p className="p-2">{storedData.description}</p>
          </div>
        </div>
      </>
    );
  };

  const renderCategoryDetails = (category: string, storedData: any) => {
    switch (category) {
      case 'Contract':
        return renderContractInfo(storedData);
      case 'Appendix':
        return renderContractAppendixInfo(storedData);
      case 'ContractDocument':
        return renderContractDocumentInfo(storedData);
      case 'ContractService':
        return renderContractServiceInfo(storedData);
      default:
        return <p>Thông tin không có sẵn</p>;
    }
  };

  if (isCustomerListPending || isTypeListPending) {
    return <>Đang tải...</>;
  }

  return (
    <>
      <div className="bg-white">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl">
            Hành động: {action} {category}
          </h2>
          <p className="text-sm text-gray-500">
            Ngày chỉnh sửa: {auditTrail.createdDate}
          </p>
        </div>

        {renderCategoryDetails(auditTrail.category, auditTrail.storedData)}

        <div className="mt-4 text-sm text-gray-500">
          Tạo bởi: {auditTrail.createdBy}
        </div>
      </div>
    </>
  );
}
