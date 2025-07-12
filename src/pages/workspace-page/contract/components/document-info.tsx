import { useSearchParams } from 'react-router-dom';
import DocumentsTable from './document-table';
import { useId } from '@/routes/hooks/use-id';
import { useGetAllDocumentByContract } from '@/queries/document.query';
import { useRefetch } from '@/providers/refetch-provider';
import { useEffect } from 'react';

type Props = {};

export default function DocumentInfo({}: Props) {
  const id = useId();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const keyword = searchParams.get('search') || null;
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading, refetch } = useGetAllDocumentByContract(
    id,
    page,
    pageLimit,
    keyword
  );
  const documents = data?.listObjects;
  const totalDocument = data?.paging?.totalRecord;
  const pageCount = Math.ceil(totalDocument / pageLimit);

  useEffect(() => {
    refetch();
  }, [page, pageLimit, keyword]);

  const { setRefetch } = useRefetch();

  useEffect(() => {
    if (refetch) {
      setRefetch(() => refetch);
    }
  }, [refetch, setRefetch]);

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <DocumentsTable
        document={documents}
        page={page}
        totalDocument={totalDocument}
        pageCount={pageCount}
      />
    </div>
  );
}
