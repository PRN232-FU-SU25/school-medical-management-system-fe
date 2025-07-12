import BasePages from '@/components/shared/base-pages.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfo from './components/basic-info';
import AppendixInfo from './components/appendix-info';
import DocumentInfo from './components/document-info';
import ServiceInfo from './components/service-info';
import AuditTrailInfo from './components/audit-trail';
import { useId } from '@/routes/hooks/use-id';
import { useGetContract } from '@/queries/contract.query';
import { useEffect } from 'react';
import { useRefetch } from '@/providers/refetch-provider';
import AssignContract from './components/assign-contract';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function ContractDetailPage() {
  const id = useId();
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const { data: contract, isPending, refetch } = useGetContract(id);
  const { setRefetch } = useRefetch();

  useEffect(() => {
    if (refetch) {
      setRefetch(() => refetch);
    }
  }, [refetch, setRefetch]);

  if (isPending) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <>
      <BasePages
        className=""
        pageHead={`${contract?.title} | S-Contract`}
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          {
            title: `${contract?.title}`,
            link: `/contract/${id}`
          }
        ]}
      >
        <div className="mt-4 flex flex-col gap-8 rounded-md bg-white p-6 shadow-md">
          <Tabs defaultValue="basic-info">
            <TabsList>
              <TabsTrigger value="basic-info">Thông tin chính</TabsTrigger>
              <TabsTrigger value="appendix-info">Phụ lục hợp đồng</TabsTrigger>
              <TabsTrigger value="document-info">Tài liệu đính kèm</TabsTrigger>
              <TabsTrigger value="service-info">Dịch vụ</TabsTrigger>
              <TabsTrigger value="audit-trail-info">
                Lịch sử thay đổi
              </TabsTrigger>
              <TabsTrigger
                value="assign-contract"
                disabled={role === 'Employee'}
              >
                Phân công hợp đồng
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info">
              <BasicInfo mode="view" contract={contract} />
            </TabsContent>
            <TabsContent value="appendix-info">
              <AppendixInfo />
            </TabsContent>
            <TabsContent value="document-info">
              <DocumentInfo />
            </TabsContent>
            <TabsContent value="service-info">
              <ServiceInfo />
            </TabsContent>
            <TabsContent value="audit-trail-info">
              <AuditTrailInfo />
            </TabsContent>
            <TabsContent value="assign-contract">
              <AssignContract />
            </TabsContent>
          </Tabs>
        </div>
      </BasePages>
    </>
  );
}
