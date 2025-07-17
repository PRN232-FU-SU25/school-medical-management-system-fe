import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import __helpers from '@/helpers';
import { logout, setUserInfo, setRole, login } from '@/redux/auth.slice';
import { useGetProfile } from '@/queries/auth.query';

interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  roles?: string[];
  children?: NavItem[];
  description?: string;
}

const navItems: NavItem[] = [
  {
    title: 'Tổng quan',
    href: '/dashboard',
    icon: 'dashboard',
    roles: ['Admin', 'SchoolNurse'],
    description: 'Thống kê và báo cáo tổng quan'
  },
  {
    title: 'Hồ sơ sức khỏe',
    href: '/dashboard/student-records',
    icon: 'users',
    roles: ['Admin', 'SchoolNurse', 'Parent'],
    description: 'Quản lý hồ sơ sức khỏe học sinh'
  },
  {
    title: 'Sự kiện y tế',
    href: '/dashboard/medical-events',
    icon: 'activity',
    roles: ['Admin', 'SchoolNurse', 'Parent'],
    description: 'Quản lý các sự kiện y tế trong trường'
  },
  {
    title: 'Quản lý thuốc',
    href: '/dashboard/medications',
    icon: 'pill',
    roles: ['Admin', 'SchoolNurse'],
    description: 'Quản lý thuốc và đơn thuốc',
    children: [
      {
        title: 'Danh sách thuốc',
        href: '/dashboard/medications',
        icon: 'list',
        roles: ['Admin', 'SchoolNurse'],
        description: 'Xem và quản lý kho thuốc'
      },
      {
        title: 'Yêu cầu thuốc',
        href: '/dashboard/medications/requests',
        icon: 'clipboardList',
        roles: ['Admin', 'SchoolNurse'],
        description: 'Xử lý yêu cầu cấp phát thuốc'
      }
    ]
  },
  {
    title: 'Gửi thuốc',
    href: '/dashboard/medications/requests',
    icon: 'pill',
    roles: ['Parent'],
    description: 'Gửi thuốc cho học sinh'
  },
  {
    title: 'Tiêm chủng',
    href: '/dashboard/vaccinations',
    icon: 'syringe',
    roles: ['Admin', 'SchoolNurse', 'Parent'],
    description: 'Quản lý tiêm chủng và chiến dịch',
    children: [
      {
        title: 'Yêu cầu tiêm',
        href: '/dashboard/vaccinations/campaign/requests',
        roles: ['Parent'],
        icon: 'clipboardList',
        description: 'Xem danh sách yêu cầu tiêm'
      }
    ]
  },
  {
    title: 'Bài viết',
    href: '/dashboard/blogs',
    icon: 'book',
    roles: ['Admin', 'SchoolNurse'],
    description: 'Quản lý bài viết'
  },
  {
    title: 'Người dùng',
    href: '/dashboard/users',
    icon: 'user',
    roles: ['Admin'],
    description: 'Quản lý người dùng'
  }
  // {
  //   title: 'Kiểm tra sức khỏe',
  //   href: '/dashboard/health-checkups',
  //   icon: 'stethoscope',
  //   roles: ['Admin', 'SchoolNurse'],
  //   description: 'Quản lý kiểm tra sức khỏe định kỳ',
  //   children: [
  //     {
  //       title: 'Danh sách kiểm tra',
  //       href: '/dashboard/health-checkups',
  //       icon: 'list',
  //       roles: ['Admin', 'SchoolNurse'],
  //       description: 'Xem lịch sử kiểm tra sức khỏe'
  //     },
  //     {
  //       title: 'Tạo đợt kiểm tra',
  //       href: '/dashboard/health-checkups/campaign',
  //       icon: 'calendar',
  //       roles: ['Admin', 'SchoolNurse'],
  //       description: 'Lập kế hoạch kiểm tra sức khỏe'
  //     }
  //   ]
  // }
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
  const dispatch = useDispatch();
  const { data: profileData, isSuccess } = useGetProfile();

  useEffect(() => {
    if (isSuccess && profileData) {
      dispatch(setUserInfo(profileData));
      dispatch(setRole(profileData.role));
      dispatch(login());
    }
  }, [isSuccess, profileData, dispatch]);

  const handleLogout = () => {
    // Xử lý đăng xuất
    __helpers.cookie_delete('AT');
    __helpers.cookie_delete('RT');
    __helpers.cookie_delete('R');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-teal-50/30 to-blue-50/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 hover:bg-teal-50 md:hidden"
                >
                  <Icons.menu className="h-5 w-5" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <MobileNav items={navItems} setOpen={setOpen} />
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center gap-4">
              <img
                src="/images/Logo_THPT_Chu_Van_An.jpg"
                alt="Logo trường THPT Chu Văn An"
                className="h-16 w-16 rounded-lg"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-blue-900">
                  Trường THPT Chu Văn An
                </h1>
                <p className="text-sm text-gray-600">
                  Hệ thống quản lý y tế học đường
                </p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-teal-50"
              >
                <Icons.bell className="h-5 w-5 text-gray-600" />
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
                <span className="sr-only">Thông báo</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full hover:bg-teal-50"
                >
                  <Avatar className="h-9 w-9 border-2 border-teal-200">
                    {auth?.userInfo?.accountInfo.avatar ? (
                      <img
                        src={auth?.userInfo?.accountInfo.avatar}
                        alt={auth?.userInfo?.accountInfo.fullName || 'User'}
                        className="h-9 w-9 rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-teal-100 text-teal-900">
                        {auth?.userInfo?.accountInfo.fullName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {auth?.userInfo?.accountInfo.fullName || 'User'}
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      {auth?.userInfo?.email || 'user@example.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard/profile"
                    className="flex w-full items-center"
                  >
                    <Icons.user className="mr-2 h-4 w-4" />
                    <span>Hồ sơ cá nhân</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard/notifications"
                    className="flex w-full items-center"
                  >
                    <Icons.bell className="mr-2 h-4 w-4" />
                    <span>Thông báo</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600"
                >
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
        <aside className="hidden w-72 border-r bg-white/70 backdrop-blur-sm md:block">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-1 p-4">
              <DesktopNav items={navItems} />
            </div>
          </ScrollArea>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto">
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

        const isActive = location.pathname === item.href;
        const hasActiveChild = item.children?.some(
          (child) => location.pathname === child.href
        );

        if (!item.children) {
          return (
            <Link
              key={index}
              to={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-900'
                  : 'text-gray-700 hover:bg-teal-50 hover:text-teal-900'
              )}
            >
              {item.icon && (
                <>
                  {(() => {
                    const Icon = Icons[item.icon];
                    return (
                      <Icon
                        className={cn(
                          'h-5 w-5',
                          isActive
                            ? 'text-teal-600'
                            : 'text-gray-500 group-hover:text-teal-600'
                        )}
                      />
                    );
                  })()}
                </>
              )}
              <span>{item.title}</span>
              {/* {item.description && (
                <span className="ml-auto text-xs text-gray-500">
                  {item.description}
                </span>
              )} */}
            </Link>
          );
        }

        return (
          <div key={index} className="space-y-1">
            <Link
              to={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive || hasActiveChild
                  ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-900'
                  : 'text-gray-700 hover:bg-teal-50 hover:text-teal-900'
              )}
            >
              {item.icon && (
                <>
                  {(() => {
                    const Icon = Icons[item.icon];
                    return (
                      <Icon
                        className={cn(
                          'h-5 w-5',
                          isActive || hasActiveChild
                            ? 'text-teal-600'
                            : 'text-gray-500 group-hover:text-teal-600'
                        )}
                      />
                    );
                  })()}
                </>
              )}
              <span>{item.title}</span>
            </Link>
            {item.children.map((child, childIndex) => {
              if (child.roles && (!role || !child.roles.includes(role))) {
                return null;
              }

              const isChildActive = location.pathname === child.href;

              return (
                <Link
                  key={`${index}-${childIndex}`}
                  to={child.href}
                  className={cn(
                    'group ml-6 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isChildActive
                      ? 'bg-gradient-to-r from-teal-100/70 to-cyan-100/70 text-teal-900'
                      : 'text-gray-600 hover:bg-teal-50 hover:text-teal-900'
                  )}
                >
                  {child.icon && (
                    <>
                      {(() => {
                        const Icon = Icons[child.icon];
                        return (
                          <Icon
                            className={cn(
                              'h-4 w-4',
                              isChildActive
                                ? 'text-teal-600'
                                : 'text-gray-500 group-hover:text-teal-600'
                            )}
                          />
                        );
                      })()}
                    </>
                  )}
                  <span>{child.title}</span>
                </Link>
              );
            })}
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
    <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 border-b pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-600">
            <Icons.medical className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-teal-900">Y tế Học đường</span>
        </div>
        <div className="flex flex-col gap-1">
          {items.map((item, index) => {
            if (item.roles && (!role || !item.roles.includes(role))) {
              return null;
            }

            const isActive = location.pathname === item.href;
            const hasActiveChild = item.children?.some(
              (child) => location.pathname === child.href
            );

            if (!item.children) {
              return (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setOpen?.(false)}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-900'
                      : 'text-gray-700 hover:bg-teal-50 hover:text-teal-900'
                  )}
                >
                  {item.icon && (
                    <>
                      {(() => {
                        const Icon = Icons[item.icon];
                        return (
                          <Icon
                            className={cn(
                              'h-5 w-5',
                              isActive
                                ? 'text-teal-600'
                                : 'text-gray-500 group-hover:text-teal-600'
                            )}
                          />
                        );
                      })()}
                    </>
                  )}
                  <span>{item.title}</span>
                </Link>
              );
            }

            return (
              <div key={index} className="space-y-1">
                <Link
                  to={item.href}
                  onClick={() => setOpen?.(false)}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive || hasActiveChild
                      ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-900'
                      : 'text-gray-700 hover:bg-teal-50 hover:text-teal-900'
                  )}
                >
                  {item.icon && (
                    <>
                      {(() => {
                        const Icon = Icons[item.icon];
                        return (
                          <Icon
                            className={cn(
                              'h-5 w-5',
                              isActive || hasActiveChild
                                ? 'text-teal-600'
                                : 'text-gray-500 group-hover:text-teal-600'
                            )}
                          />
                        );
                      })()}
                    </>
                  )}
                  <span>{item.title}</span>
                </Link>
                {item.children.map((child, childIndex) => {
                  if (child.roles && (!role || !child.roles.includes(role))) {
                    return null;
                  }

                  const isChildActive = location.pathname === child.href;

                  return (
                    <Link
                      key={`${index}-${childIndex}`}
                      to={child.href}
                      onClick={() => setOpen?.(false)}
                      className={cn(
                        'group ml-6 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isChildActive
                          ? 'bg-gradient-to-r from-teal-100/70 to-cyan-100/70 text-teal-900'
                          : 'text-gray-600 hover:bg-teal-50 hover:text-teal-900'
                      )}
                    >
                      {child.icon && (
                        <>
                          {(() => {
                            const Icon = Icons[child.icon];
                            return (
                              <Icon
                                className={cn(
                                  'h-4 w-4',
                                  isChildActive
                                    ? 'text-teal-600'
                                    : 'text-gray-500 group-hover:text-teal-600'
                                )}
                              />
                            );
                          })()}
                        </>
                      )}
                      <span>{child.title}</span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
