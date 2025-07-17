import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import { Link } from 'react-router-dom';
import DataTable from '@/components/shared/data-table';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useGetBlogs, useDeleteBlog } from '@/queries/blog.query';
import * as XLSX from 'xlsx';
import __helpers from '@/helpers';

interface Blog {
  id: number;
  blogId: number;
  nurseId: number;
  title: string;
  content: string;
  thumbnailUrl?: string;
  tags?: string;
  publishAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  nurseFullName: string;
}

export default function BlogsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const role = __helpers.cookie_get('R');

  const { data: blogs, isLoading, refetch } = useGetBlogs();
  const deleteBlog = useDeleteBlog();

  const handleDelete = async () => {
    if (!selectedBlog) return;

    try {
      await deleteBlog.mutateAsync(selectedBlog.blogId.toString());
      toast({
        title: 'Thành công',
        description: 'Đã xóa bài viết thành công',
        variant: 'default'
      });
      refetch();
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
        variant: 'destructive'
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedBlog(null);
    }
  };

  const columns = [
    {
      accessorKey: 'title',
      header: 'Tiêu đề',
      cell: ({ row }: { row: { original: Blog } }) => (
        <div className="flex items-center gap-2">
          {row.original.thumbnailUrl && (
            <img
              src={row.original.thumbnailUrl}
              alt={row.original.title}
              className="h-8 w-8 rounded-md object-cover"
            />
          )}
          <div className="font-medium text-teal-900">{row.original.title}</div>
        </div>
      )
    },
    {
      accessorKey: 'tags',
      header: 'Thẻ',
      cell: ({ row }: { row: { original: Blog } }) => (
        <div className="flex gap-1">
          {row.original.tags?.split(',').map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag.trim()}
            </Badge>
          ))}
        </div>
      )
    },
    {
      accessorKey: 'publishAt',
      header: 'Ngày xuất bản',
      cell: ({ row }: { row: { original: Blog } }) => (
        <div className="text-gray-600">
          {row.original.publishAt
            ? new Date(row.original.publishAt).toLocaleDateString('vi-VN')
            : 'Chưa xuất bản'}
        </div>
      )
    },
    {
      accessorKey: 'nurseFullName',
      header: 'Tác giả',
      cell: ({ row }: { row: { original: Blog } }) => (
        <div className="text-gray-600">{row.original.nurseFullName}</div>
      )
    },
    {
      id: 'actions',
      cell: ({ row }: { row: { original: Blog } }) => {
        const blog = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
              asChild
            >
              <Link to={`/dashboard/blogs/${blog.blogId}`}>
                <Icons.eye className="h-4 w-4" />
                <span className="sr-only">Xem chi tiết</span>
              </Link>
            </Button>
            {role === 'SchoolNurse' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                asChild
              >
                <Link to={`/dashboard/blogs/${blog.blogId}/edit`}>
                  <Icons.pencil className="h-4 w-4" />
                  <span className="sr-only">Chỉnh sửa</span>
                </Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => {
                setSelectedBlog(blog);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Icons.trash className="h-4 w-4" />
              <span className="sr-only">Xóa</span>
            </Button>
          </div>
        );
      }
    }
  ];

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-2">
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-[250px]" />
              <Skeleton className="h-10 w-[150px]" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredBlogs = (blogs?.items || []).filter((blog: Blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <CardTitle className="text-teal-900">Quản lý bài viết</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
              onClick={() => {
                const excelData = filteredBlogs.map((blog: Blog) => ({
                  'Tiêu đề': blog.title,
                  Thẻ: blog.tags || '',
                  'Ngày xuất bản': blog.publishAt
                    ? new Date(blog.publishAt).toLocaleDateString('vi-VN')
                    : 'Chưa xuất bản',
                  'Cập nhật lần cuối': new Date(
                    blog.updatedAt
                  ).toLocaleDateString('vi-VN')
                }));

                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(excelData);

                const columnWidths = [
                  { wch: 40 }, // Tiêu đề
                  { wch: 20 }, // Thẻ
                  { wch: 15 }, // Ngày xuất bản
                  { wch: 15 } // Cập nhật lần cuối
                ];
                ws['!cols'] = columnWidths;

                XLSX.utils.book_append_sheet(wb, ws, 'Danh sách bài viết');
                XLSX.writeFile(
                  wb,
                  `danh-sach-bai-viet-${
                    new Date().toISOString().split('T')[0]
                  }.xlsx`
                );
              }}
            >
              <Icons.download className="mr-2 h-4 w-4" />
              Xuất Excel
            </Button>
            {role === 'SchoolNurse' && (
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link to="/dashboard/blogs/create">
                  <Icons.plus className="mr-2 h-4 w-4" />
                  Tạo bài viết mới
                </Link>
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tiêu đề..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:max-w-[300px]"
                />
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filteredBlogs}
              pageCount={Math.ceil(filteredBlogs.length / 10)}
            />
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa bài viết</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bài viết "{selectedBlog?.title}" không?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              {deleteBlog.isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Xác nhận xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
