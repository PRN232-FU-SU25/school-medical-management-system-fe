import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBlogById } from '@/queries/blog.query';

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: blog, isLoading } = useGetBlogById(id || '');

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-[300px]" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!blog) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => navigate('/dashboard/blogs')}
            >
              <Icons.chevronLeft className="h-4 w-4" />
              <span className="sr-only">Quay lại</span>
            </Button>
            <CardTitle className="text-teal-900">
              Không tìm thấy bài viết
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-500">
            Bài viết không tồn tại hoặc đã bị xóa.{' '}
            <Link
              to="/dashboard/blogs"
              className="text-teal-600 hover:underline"
            >
              Quay lại danh sách
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
            onClick={() => navigate('/dashboard/blogs')}
          >
            <Icons.chevronLeft className="h-4 w-4" />
            <span className="sr-only">Quay lại</span>
          </Button>
          <CardTitle className="text-teal-900">{blog.title}</CardTitle>
        </div>

        <Button
          variant="outline"
          className="border-teal-600 text-teal-600 hover:bg-teal-50"
          asChild
        >
          <Link to={`/dashboard/blogs/${id}/edit`}>
            <Icons.pencil className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {blog.thumbnailUrl && (
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="aspect-video w-full rounded-lg object-cover"
            />
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {blog.tags?.split(',').map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              {blog.publishAt ? (
                <>
                  <Icons.calendar className="mr-1 inline-block h-4 w-4" />
                  Xuất bản:{' '}
                  {new Date(blog.publishAt).toLocaleDateString('vi-VN')}
                </>
              ) : (
                <Badge variant="outline">Chưa xuất bản</Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Icons.user className="mr-1 inline-block h-4 w-4" />
              Tác giả: {blog.nurseFullName}
            </div>
          </div>

          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content.replace(/\n/g, '<br />')
              }}
            />
          </div>

          <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-500">
            <div>
              Cập nhật lần cuối:{' '}
              {blog.updatedAt
                ? new Date(blog.updatedAt).toLocaleDateString('vi-VN')
                : 'Chưa cập nhật'}
            </div>
            <div>ID: {blog.blogId}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
