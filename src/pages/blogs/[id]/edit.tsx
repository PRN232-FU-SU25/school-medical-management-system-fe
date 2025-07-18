import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useGetBlogById, useUpdateBlog } from '@/queries/blog.query';
import { useUploadFile } from '@/queries/file.query';
import { Skeleton } from '@/components/ui/skeleton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    thumbnailUrl: '',
    publishAt: ''
  });

  // Quill editor modules and formats
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean']
      ]
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'color',
    'background',
    'align',
    'link',
    'image'
  ];

  const { data: blog, isLoading } = useGetBlogById(id || '');
  const updateBlog = useUpdateBlog();
  const uploadFile = useUploadFile();

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        tags: blog.tags || '',
        thumbnailUrl: blog.thumbnailUrl || '',
        publishAt: blog.publishAt
          ? new Date(blog.publishAt).toISOString().slice(0, 16)
          : ''
      });
    }
  }, [blog]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      const response = await uploadFile.mutateAsync(file);
      setFormData((prev) => ({ ...prev, thumbnailUrl: response.url }));
      toast({
        title: 'Thành công',
        description: 'Đã tải lên ảnh thành công',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải lên ảnh. Vui lòng thử lại',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateBlog.mutateAsync({
        id,
        blog: {
          ...formData,
          nurseId: auth.userInfo?.accountId,
          publishAt: formData.publishAt
            ? new Date(formData.publishAt)
            : undefined
        }
      });

      toast({
        title: 'Thành công',
        description: 'Đã cập nhật bài viết thành công',
        variant: 'default'
      });

      navigate('/dashboard/blogs');
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: error instanceof Error ? error.message : 'Đã xảy ra lỗi',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="border-none shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-[200px]" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-32" />
            <Skeleton className="h-10 w-[300px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-teal-50 to-cyan-50 pb-4">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => navigate('/dashboard/blogs')}
            >
              <Icons.chevronLeft className="h-4 w-4" />
              <span className="sr-only">Quay lại</span>
            </Button>
            <CardTitle className="text-teal-900">
              Chỉnh sửa bài viết: {blog?.title}
            </CardTitle>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700"
              disabled={updateBlog.isPending}
            >
              {updateBlog.isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Lưu thay đổi
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Nhập tiêu đề bài viết..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <div className="min-h-[300px] rounded-md border">
                <ReactQuill
                  value={formData.content}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, content }))
                  }
                  modules={modules}
                  formats={formats}
                  placeholder="Nhập nội dung bài viết..."
                  className="h-[250px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Thẻ</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="Nhập các thẻ, phân cách bằng dấu phẩy..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Ảnh đại diện</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="max-w-[300px]"
                />
                {isUploading && (
                  <Icons.spinner className="h-4 w-4 animate-spin text-teal-600" />
                )}
              </div>
              {formData.thumbnailUrl && (
                <img
                  src={formData.thumbnailUrl}
                  alt="Ảnh xem trước"
                  className="mt-2 h-32 w-32 rounded-lg object-cover"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishAt">Ngày xuất bản</Label>
              <Input
                id="publishAt"
                type="datetime-local"
                value={formData.publishAt}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    publishAt: e.target.value
                  }))
                }
                className="max-w-[300px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
