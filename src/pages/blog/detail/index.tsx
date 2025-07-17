import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useGetBlogById } from '@/queries/blog.query';
import { Skeleton } from '@/components/ui/skeleton';
export default function BlogDetailPage() {
  const { id } = useParams();

  const { data: blogPost, isLoading } = useGetBlogById(id || '');

  return (
    <>
      <div className="container mx-auto space-y-8 py-8">
        {isLoading ? (
          <Skeleton className="h-[500px] w-full" />
        ) : (
          <>
            {/* Hero Section */}
            <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
              <img
                src={blogPost.thumbnailUrl}
                alt={blogPost.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <Badge variant="secondary" className="mb-4">
                  {blogPost.tags}
                </Badge>
                <h1 className="mb-4 text-4xl font-bold leading-tight">
                  {blogPost.title}
                </h1>
                <div className="flex items-center gap-4">
                  <Avatar className="border-2 border-white">
                    <AvatarImage src="/images/avatars/doctor.jpg" />
                    <AvatarFallback>BS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{blogPost.nurseName}</p>
                    <p className="text-sm text-gray-200">
                      {blogPost.publishAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <Card className="border-none bg-inherit shadow-none">
              <CardContent className="p-0">
                <div className="mb-8 flex flex-wrap gap-2">
                  {blogPost.tags.split(', ').map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div
                  className={cn(
                    'prose prose-lg max-w-none',
                    'prose-headings:font-bold prose-headings:text-gray-900',
                    'prose-p:text-gray-700',
                    'prose-lead:text-xl prose-lead:text-gray-600',
                    'prose-img:rounded-lg',
                    'prose-a:text-blue-600 hover:prose-a:text-blue-800'
                  )}
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />

                {/* Actions */}
                <div className="mt-12 flex items-center justify-between border-t pt-8">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="lg" className="gap-2">
                      <Icons.check className="h-5 w-5" />
                      <span>Thích</span>
                    </Button>
                    <Button variant="outline" size="lg" className="gap-2">
                      <Icons.arrowRight className="h-5 w-5" />
                      <span>Chia sẻ</span>
                    </Button>
                  </div>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Icons.post className="h-5 w-5" />
                    <span>In bài viết</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
