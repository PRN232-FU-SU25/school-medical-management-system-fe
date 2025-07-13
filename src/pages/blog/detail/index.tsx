import { useParams } from 'react-router-dom';
import BasePages from '@/components/shared/base-pages';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function BlogDetailPage() {
  const { id } = useParams();

  // Mock data for demonstration
  const blogPost = {
    id: 1,
    title: 'Phòng ngừa bệnh mùa hè trong trường học',
    category: 'Y tế học đường',
    date: '15/06/2023',
    author: 'BS. Nguyễn Văn A',
    content: `
      <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

      <h2>1. Các biện pháp phòng ngừa cơ bản</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <h2>2. Chế độ dinh dưỡng và nghỉ ngơi</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

      <h2>3. Theo dõi và phát hiện sớm</h2>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `,
    image: '/images/student-checkup.jpg',
    tags: ['Sức khỏe', 'Mùa hè', 'Phòng bệnh', 'Trường học']
  };

  return (
    <>
      <div className="container mx-auto space-y-8 py-8">
        {/* Hero Section */}
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <Badge variant="secondary" className="mb-4">
              {blogPost.category}
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
                <p className="font-medium">{blogPost.author}</p>
                <p className="text-sm text-gray-200">{blogPost.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <Card className="border-none bg-inherit shadow-none">
          <CardContent className="p-0">
            <div className="mb-8 flex flex-wrap gap-2">
              {blogPost.tags.map((tag, index) => (
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
      </div>
    </>
  );
}
