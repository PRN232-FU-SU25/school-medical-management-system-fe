import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBlogs } from '@/queries/blog.query';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function BlogPage() {
  const { data: blogs, isLoading } = useGetBlogs();

  return (
    <>
      <Helmet>
        <title>Tin tức & Hoạt động y tế | THPT Chu Văn An</title>
      </Helmet>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-900">
              Tin tức & Hoạt động y tế
            </h2>
            <p className="mt-2 text-gray-600">
              Cập nhật thông tin mới nhất về các hoạt động y tế của trường THPT
              Chu Văn An
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              blogs?.items?.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.thumbnailUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {post.publishAt
                          ? new Date(post.publishAt).toLocaleDateString(
                              'vi-VN',
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              }
                            )
                          : 'Không có ngày'}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-blue-600">
                        <Tag className="h-4 w-4" />
                        {post.tags}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-blue-600">
                      <Link to={`/blog/${post.blogId}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.description ?? 'Không có mô tả'}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild variant="ghost" className="ml-auto">
                      <Link to={`/blog/${post.blogId}`}>
                        Đọc tiếp
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
