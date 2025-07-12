import { Icons } from '@/components/ui/icons';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { notificationTypeMapping, userPopoverItems } from '@/constants/data';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from '@/routes/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth.slice';
import helper from '@/helpers/index';
import { RootState } from '@/redux/store';
import { useLogout } from '@/queries/auth.query';
import { useGetNotifications } from '@/queries/notification.query';
interface DashboardNavProps {}

export default function HeaderNav({}: DashboardNavProps) {
  const accessToken = helper.cookie_get('AT');
  const refreshToken = helper.cookie_get('RT');
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { mutateAsync: logoutAccount } = useLogout();
  const { data: notifications } = useGetNotifications(1, 3);

  const handleLogout = async () => {
    await logoutAccount({
      accessToken: accessToken,
      refreshToken: refreshToken
    });
    helper.cookie_delete('RT');
    helper.cookie_delete('AT');
    router.push('/login');
    dispatch(logout());
  };

  return (
    <nav className="w-full bg-primary">
      <div className="">
        <div className="flex items-center justify-between py-4 pr-16 text-white">
          <div className="flex items-center gap-20">
            <h1 className="w-[262px] text-center text-2xl font-medium 2xl:w-[300px]">
              S-Contract
            </h1>
          </div>

          <div className="flex items-center justify-end">
            <div className="flex items-center gap-5">
              {/* <div className="relative">
                <Input
                  className="h-10 w-80 bg-secondary pl-9 text-base font-normal text-gray-800 placeholder:font-light placeholder:text-gray-300"
                  placeholder="Tìm kiếm nhanh"
                />
                <Icons.search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-800" />
              </div> */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:bg-sky-900">
                    <Icons.bell />
                    {notifications?.listObjects.length > 0 && (
                      <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-red-500 text-center text-[9px]"></div>
                    )}
                  </div>
                </PopoverTrigger>

                <PopoverContent className="mr-32 mt-2 w-[640px] rounded-md border-none bg-white px-4 py-2.5 text-gray-800">
                  <div className="flex flex-col gap-2.5">
                    <h3>Thông báo</h3>
                    <hr />
                    {notifications?.listObjects.length === 0 && (
                      <div className="text-center text-sm font-normal">
                        Không có thông báo
                      </div>
                    )}
                    {notifications?.listObjects?.map((item, index) => {
                      const [day, month, year] = item.createdDate.split('/');
                      const dateObj = new Date(
                        `${year}-${month}-${day}T00:00:00Z`
                      );
                      const type =
                        notificationTypeMapping[item.type] || item.type;

                      return (
                        <Link
                          key={index}
                          to={'/notification'}
                          className={cn(
                            'block rounded border border-secondary bg-secondary px-4 py-2 transition-all duration-150 hover:bg-slate-50',
                            !item.isRead ? 'border-sky-600' : ''
                          )}
                        >
                          <div className="flex items-end justify-between">
                            <div className="flex items-center gap-2.5">
                              <Icons.info className="size-10 stroke-[1.5px]" />
                              <div className="flex flex-col gap-1.5">
                                <div className="text-sm font-normal">
                                  {type}
                                </div>
                                <div className="line-clamp-2 max-w-[400px] text-[13px] font-light">
                                  {item.content.trim()}.
                                </div>
                              </div>
                            </div>
                            <div className="text-[11px] font-normal text-gray-500">
                              {helper.timeAgo(dateObj.getTime() / 1000)}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <hr />
                    <Link to={'/notification'}>
                      <div className="text-center text-sm font-normal underline transition-colors duration-150 hover:text-primary">
                        Xem tất cả
                      </div>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="-m-1.5 cursor-pointer p-1.5 transition-all duration-200 hover:brightness-75">
                      <Avatar className="h-10 w-10 border">
                        <AvatarFallback className="flex w-full items-center justify-center bg-gray-800 text-2xl font-light text-white">
                          {auth.userInfo?.firstName.at(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </PopoverTrigger>

                  <PopoverContent className="mr-16 w-[180px] rounded-md border-none bg-white p-2 text-gray-800">
                    <div className="flex flex-col gap-0.5">
                      {userPopoverItems.map((item, index) => {
                        const Icon = Icons[item.icon || 'arrowRight'];
                        const isLastItem =
                          index === userPopoverItems.length - 1;
                        const isActive = path === item.href;

                        if (isLastItem) {
                          return (
                            <div
                              key={index}
                              onClick={handleLogout}
                              className={cn(
                                'block cursor-pointer rounded-md px-3.5 py-2.5 text-sm text-red-500 transition-all duration-150 hover:bg-slate-100'
                              )}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <div className="flex w-5 justify-center">
                                  <Icon className="size-5 stroke-[2px]" />
                                </div>
                                <div>{item.title.trim()}</div>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={index}
                            to={item.href}
                            className={cn(
                              'block rounded-md px-3.5 py-2.5 text-sm transition-all duration-150',
                              isActive ? 'bg-slate-100' : 'hover:bg-slate-100'
                            )}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <div className="flex w-5 justify-center">
                                <Icon className="size-5 stroke-[2px]" />
                              </div>
                              <div>{item.title.trim()}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
