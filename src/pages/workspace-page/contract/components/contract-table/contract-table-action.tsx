import TableSearchInput from '@/components/shared/table-search-input';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/routes/hooks';

export default function ContractTableActions() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Button
          className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white"
          onClick={() => router.push(`/contract/new`)}
          size={'lg'}
        >
          Tạo hợp đồng
        </Button>
      </div>
      <div className="flex flex-1 justify-end">
        <TableSearchInput placeholder="Tìm kiếm hợp đồng" />
      </div>
    </div>
  );
}
