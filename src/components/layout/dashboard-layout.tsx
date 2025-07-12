import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Icons } from '@/components/ui/icons';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  roles?: string[];
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Tổng quan',
    href: '/dashboard',
    icon: 'dashboard'
  },
  {
    title: 'Hồ sơ sức khỏe',
    href: '/dashboard/student-records',
    icon: 'users',
    roles: ['Admin', 'MedicalStaff', 'Teacher', 'Parent']
  },
  {
    title: 'Sự kiện y tế',
    href: '/dashboard/medical-events',
    icon: 'activity',
    roles: ['Admin', 'MedicalStaff']
  },
  {
    title: 'Quản lý thuốc',
    href: '/dashboard/medications',
    icon: 'pill',
    roles: ['Admin', 'MedicalStaff'],
    children: [
      {
        title: 'Danh sách thuốc',
        href: '/dashboard/medications',
        icon: 'list'
      },
      {
        title: 'Yêu cầu thuốc',
        href: '/dashboard/medications/requests',
        icon: 'clipboardList'
      }
    ]
  },
  {
    title: 'Tiêm chủng',
    href: '/dashboard/vaccinations',
    icon: 'syringe',
    roles: ['Admin', 'MedicalStaff'],
    children: [
      {
        title: 'Danh sách tiêm chủng',
        href: '/dashboard/vaccinations',
        icon: 'list'
      },
      {
        title: 'Tạo chiến dịch',
        href: '/dashboard/vaccinations/campaign',
        icon: 'calendar',
        roles: ['Admin', 'MedicalStaff']
      }
    ]
  },
  {
    title: 'Kiểm tra sức khỏe',
    href: '/dashboard/health-checkups',
    icon: 'stethoscope',
    roles: ['Admin', 'MedicalStaff'],
    children: [
      {
        title: 'Danh sách kiểm tra',
        href: '/dashboard/health-checkups',
        icon: 'list'
      },
      {
        title: 'Tạo đợt kiểm tra',
        href: '/dashboard/health-checkups/campaign',
        icon: 'calendar',
        roles: ['Admin', 'MedicalStaff']
      }
    ]
  },
  {
    title: 'Kho vật tư y tế',
    href: '/dashboard/inventory',
    icon: 'package',
    roles: ['Admin', 'MedicalStaff']
  }
];

export default function DashboardLayout({
  children
}: {
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    // Xử lý đăng xuất
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2 md:hidden"
                >
                  <Icons.menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 pr-0">
                <MobileNav items={navItems} setOpen={setOpen} />
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center gap-2">
              <Icons.medical className="h-6 w-6 text-blue-600" />
              <span className="hidden font-bold sm:inline-block">
                Quản lý Y tế Học đường
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Icons.bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
                <span className="sr-only">Thông báo</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/images/avatar.png"
                      alt={auth?.fullName || 'User'}
                    />
                    <AvatarFallback>
                      {auth?.fullName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {auth?.fullName || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {auth?.email || 'user@example.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile">
                    <Icons.user className="mr-2 h-4 w-4" />
                    <span>Hồ sơ cá nhân</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/notifications">
                    <Icons.bell className="mr-2 h-4 w-4" />
                    <span>Thông báo</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <Icons.logout className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r bg-background md:block">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-2 p-4">
              <DesktopNav items={navItems} />
            </div>
          </ScrollArea>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-gray-50 pb-12">
          <div className="container py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
}

function DesktopNav({ items }: NavProps) {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  return (
    <div className="flex flex-col gap-1">
      {items.map((item, index) => {
        // Kiểm tra quyền truy cập
        if (item.roles && (!role || !item.roles.includes(role))) {
          return null;
        }

        const isActive =
          location.pathname === item.href ||
          (item.children &&
            item.children.some((child) => location.pathname === child.href));

        const Icon = Icons[item.icon];

        return (
          <div key={index}>
            {item.children ? (
              <details className="group" open={isActive}>
                <summary
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-accent text-accent-foreground'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{item.title}</span>
                  </div>
                  <Icons.chevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child, childIndex) => {
                    // Kiểm tra quyền truy cập cho child item
                    if (child.roles && (!role || !child.roles.includes(role))) {
                      return null;
                    }

                    const isChildActive = location.pathname === child.href;
                    const ChildIcon = Icons[child.icon];

                    return (
                      <Link
                        key={childIndex}
                        to={child.href}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                          isChildActive && 'bg-accent text-accent-foreground'
                        )}
                      >
                        {ChildIcon && <ChildIcon className="h-4 w-4" />}
                        <span>{child.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </details>
            ) : (
              <Link
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground'
                )}
              >
                {Icon && <Icon className="h-5 w-5" />}
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MobileNav({ items, setOpen }: NavProps) {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4">
        <Link
          to="/"
          className="flex items-center gap-2 pb-4"
          onClick={() => setOpen?.(false)}
        >
          <Icons.medical className="h-6 w-6 text-blue-600" />
          <span className="font-bold">Quản lý Y tế Học đường</span>
        </Link>
        <div className="flex flex-col gap-1">
          {items.map((item, index) => {
            // Kiểm tra quyền truy cập
            if (item.roles && (!role || !item.roles.includes(role))) {
              return null;
            }

            const isActive =
              location.pathname === item.href ||
              (item.children &&
                item.children.some(
                  (child) => location.pathname === child.href
                ));

            const Icon = Icons[item.icon];

            return (
              <div key={index}>
                {item.children ? (
                  <details className="group" open={isActive}>
                    <summary
                      className={cn(
                        'flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        isActive && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                      </div>
                      <Icons.chevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child, childIndex) => {
                        // Kiểm tra quyền truy cập cho child item
                        if (
                          child.roles &&
                          (!role || !child.roles.includes(role))
                        ) {
                          return null;
                        }

                        const isChildActive = location.pathname === child.href;
                        const ChildIcon = Icons[child.icon];

                        return (
                          <Link
                            key={childIndex}
                            to={child.href}
                            className={cn(
                              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                              isChildActive &&
                                'bg-accent text-accent-foreground'
                            )}
                            onClick={() => setOpen?.(false)}
                          >
                            {ChildIcon && <ChildIcon className="h-4 w-4" />}
                            <span>{child.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      isActive && 'bg-accent text-accent-foreground'
                    )}
                    onClick={() => setOpen?.(false)}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
