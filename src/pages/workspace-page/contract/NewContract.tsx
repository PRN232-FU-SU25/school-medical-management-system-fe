import BasePages from '@/components/shared/base-pages.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfo from './components/basic-info';
import AppendixInfo from './components/appendix-info';
import DocumentInfo from './components/document-info';
import ServiceInfo from './components/service-info';

export default function NewContractPage() {
  return (
    <>
      <BasePages
        className=""
        pageHead="Tạo hợp đồng | S-Contract"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Tạo hợp đồng', link: '/contract/new' }
        ]}
      >
        <div className="mt-4 flex flex-col gap-8 rounded-md bg-white p-6 shadow-md">
          <Tabs defaultValue="basic-info">
            <TabsList>
              <TabsTrigger value="basic-info">Thông tin chính</TabsTrigger>
              <TabsTrigger disabled value="appendix-info">
                Phụ lục hợp đồng
              </TabsTrigger>
              <TabsTrigger disabled value="document-info">
                Tài liệu đính kèm
              </TabsTrigger>
              <TabsTrigger disabled value="service-info">
                Dịch vụ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info">
              <BasicInfo mode="new" />
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
          </Tabs>
        </div>
      </BasePages>
    </>
  );
}
