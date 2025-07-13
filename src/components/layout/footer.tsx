import { Button } from '@/components/ui/button';
import { Facebook, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const quickLinks = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Tin tức', href: '/blog' },
    { title: 'Tài liệu y tế', href: '/#resources' },
    { title: 'Liên hệ', href: '#contact' }
  ];

  const resources = [
    { title: 'Hướng dẫn y tế', href: '/resources/guidelines' },
    { title: 'Biểu mẫu', href: '/resources/forms' },
    { title: 'Quy định & Chính sách', href: '/resources/policies' },
    { title: 'Thư viện tài liệu', href: '/resources/library' }
  ];

  const contacts = [
    {
      icon: <MapPin className="h-5 w-5" />,
      content: '10 Thụy Khuê, Tây Hồ, Hà Nội'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      content: '(024) 3829 3535'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      content: 'c3chuvanan@hanoiedu.vn'
    }
  ];

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-4">
              <img
                src="/images/Logo_THPT_Chu_Van_An.jpg"
                alt="Logo trường THPT Chu Văn An"
                className="h-16 w-16 rounded-lg"
              />
              <div>
                <h3 className="font-bold">Trường THPT Chu Văn An</h3>
                <p className="text-sm text-blue-200">
                  Hệ thống quản lý y tế học đường
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                asChild
                size="icon"
                variant="ghost"
                className="text-blue-200 hover:text-white"
              >
                <a
                  href="https://www.facebook.com/thptchuvanan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="icon"
                variant="ghost"
                className="text-blue-200 hover:text-white"
              >
                <a
                  href="https://www.youtube.com/@thptchuvanan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-bold">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-bold">Tài nguyên y tế</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.title}>
                  <Link
                    to={resource.href}
                    className="text-blue-200 hover:text-white"
                  >
                    {resource.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-bold">Thông tin liên hệ</h3>
            <ul className="space-y-4">
              {contacts.map((contact, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-blue-200">{contact.icon}</span>
                  <span>{contact.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-800 pt-8 text-center">
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} Trường THPT Chu Văn An. Hệ thống quản
            lý y tế học đường.
          </p>
        </div>
      </div>
    </footer>
  );
}
