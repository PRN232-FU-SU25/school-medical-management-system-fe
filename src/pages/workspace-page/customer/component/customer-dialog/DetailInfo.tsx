import DataTable from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { headersContractExcel } from '@/constants/data';
import { columns as contractColumns } from '@/pages/workspace-page/contract/components/contract-table/columns';
import { exportToExcel } from '@/pages/workspace-page/report/helpers';
import { useGetAllContract } from '@/queries/contract.query';
type Props = {
  customerId: string;
};

export default function DetailInfo({ customerId }: Props) {
  const { data: contracts, isLoading: contractLoading } = useGetAllContract(
    1,
    100,
    null,
    customerId
  );

  const generateReportFileName = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    return `bao-cao-hop-dong-cua-khach-hang-${customerId}_${date}.xlsx`;
  };

  if (contractLoading) {
    return <>Đang tải...</>;
  }

  return (
    <>
      <Tabs defaultValue="contract">
        <TabsList>
          <TabsTrigger value="contract">Hợp đồng</TabsTrigger>
        </TabsList>

        <TabsContent value="contract">
          <DataTable
            columns={contractColumns}
            data={contracts?.listObjects}
            pageCount={1}
          />
          <Button
            className="mt-4 w-full text-base font-normal"
            size={'lg'}
            onClick={() => {
              exportToExcel(
                contracts?.listObjects,
                generateReportFileName(),
                headersContractExcel
              );
            }}
          >
            Xuất báo cáo
          </Button>
        </TabsContent>
      </Tabs>
    </>
  );
}
