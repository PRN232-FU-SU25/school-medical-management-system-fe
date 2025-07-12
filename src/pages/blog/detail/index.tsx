import { useParams } from 'react-router-dom';
import BasePages from '@/components/shared/base-pages';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

      <h2>1. Các biện pháp phòng ngừa cơ bản</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <h2>2. Chế độ dinh dưỡng và nghỉ ngơi</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

      <h2>3. Theo dõi và phát hiện sớm</h2>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `,
    image: '/images/blog/summer-health.jpg',
    tags: ['Sức khỏe', 'Mùa hè', 'Phòng bệnh', 'Trường học']
  };

  return (
    <BasePages
      pageHead={`${blogPost.title} | Hệ thống quản lý y tế học đường`}
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Blog', link: '/blog' },
        { title: blogPost.title, link: `/blog/${id}` }
      ]}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="mb-4">
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="h-[400px] w-full rounded-lg object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/images/avatars/doctor.jpg" />
                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{blogPost.author}</p>
                  <p className="text-sm text-gray-500">{blogPost.date}</p>
                </div>
              </div>
              <h1 className="text-3xl font-bold">{blogPost.title}</h1>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, index) => (
                  <Button key={index} variant="outline" size="sm">
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="gap-2">
                  <Icons.check className="h-4 w-4" />
                  <span>Thích</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Icons.arrowRight className="h-4 w-4" />
                  <span>Chia sẻ</span>
                </Button>
              </div>
              <Button variant="outline" className="gap-2">
                <Icons.post className="h-4 w-4" />
                <span>In bài viết</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BasePages>
  );
}
