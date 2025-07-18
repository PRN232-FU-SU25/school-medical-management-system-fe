import { sidebarNavItems, userPopoverItems } from '@/constants/data';
import { Icons } from '../ui/icons';
import { Link } from 'react-router-dom';
import { usePathname, useRouter } from '@/routes/hooks';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useSidebar } from '@/hooks/use-sidebar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth.slice';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';
import { RootState } from '@/redux/store';
import helpers from '@/helpers';
import { useLogout } from '@/queries/auth.query';

export default function Sidebar() {
  const accessToken = helpers.cookie_get('AT');
  const refreshToken = helpers.cookie_get('RT');

  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const { isMinimized, toggle } = useSidebar();
  const [openItems, setOpenItems] = useState({});
  const [hasInteracted, setHasInteracted] = useState(false);
  const { mutateAsync: logoutAccount } = useLogout();
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  const handleLogout = async () => {
    await logoutAccount({
      accessToken: accessToken || '',
      refreshToken: refreshToken || ''
    });
    helpers.cookie_delete('RT');
    helpers.cookie_delete('AT');
    router.push('/login');
    dispatch(logout());
  };

  const toggleItem = (index) => {
    setHasInteracted(true);
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <div
        className={cn(
          'flex flex-col gap-4 border-r border-gray-300 bg-secondary py-4 text-sm transition-all duration-300 ease-in-out 2xl:gap-6 2xl:py-6 2xl:text-base',
          isMinimized
            ? 'w-[68px] px-2.5'
            : 'w-[262px] px-4 2xl:w-[300px] 2xl:px-6'
        )}
      >
        <div
          className={cn('flex items-center gap-6', isMinimized ? 'px-3' : '')}
        >
          <div className="flex w-6 justify-center">
            <Icons.alignJustify onClick={toggle} className="cursor-pointer" />
          </div>
          {!isMinimized && (
            <div className="truncate text-base 2xl:text-lg">Trang chủ</div>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          {sidebarNavItems.map((item, index) => {
            const Icon = Icons[item.icon || 'arrowRight'];
            const isActive = path === item.href;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isOpen = openItems[index] || false;
            if (!role || !item.access?.includes(role)) return;
            return !hasSubItems ? (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        'block rounded-md text-gray-700 transition-all duration-150',
                        isActive
                          ? 'bg-primary font-normal text-white'
                          : 'hover:bg-white hover:text-primary',
                        isMinimized ? 'px-3.5 py-3' : 'px-4 py-3'
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="flex w-5 justify-center">
                          <Icon className="size-5 stroke-[2px]" />
                        </div>
                        {!isMinimized && <div>{item.title.trim()}</div>}
                      </div>
                    </Link>
                  </TooltipTrigger>
                  {isMinimized && (
                    <TooltipContent
                      side="right"
                      sideOffset={8}
                      className="rounded-sm bg-white text-primary"
                    >
                      {item.title.trim()}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div key={index} className="block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => toggleItem(index)}
                        className={cn(
                          'block cursor-pointer rounded-md text-gray-700 transition-all duration-150',
                          isActive
                            ? 'bg-primary font-normal text-white'
                            : 'hover:bg-white hover:text-primary',
                          isMinimized ? 'px-3.5 py-3' : 'px-4 py-3'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate">
                            <div className="flex w-5 justify-center">
                              <Icon className="size-5 stroke-[2px]" />
                            </div>
                            {!isMinimized && <div>{item.title.trim()}</div>}
                          </div>
                          {!isMinimized && (
                            <Icons.chevronRight
                              className={cn(
                                'size-5 transition-transform',
                                isOpen ? 'rotate-90' : ''
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    {isMinimized && (
                      <TooltipContent
                        side="right"
                        sideOffset={8}
                        className="rounded-sm bg-white text-primary"
                      >
                        {item.title.trim()}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
                <div
                  className={cn(
                    'max-h-0 overflow-hidden',
                    isOpen
                      ? 'animate-slide-down'
                      : hasInteracted
                        ? 'animate-slide-up'
                        : '',
                    isMinimized ? '' : 'pl-2'
                  )}
                >
                  {item.subItems?.map((subItem, subIndex) => {
                    const SubIcon = Icons[subItem.icon || 'arrowRight'];
                    const isSubActive = path === subItem.href;
                    return (
                      <TooltipProvider key={subIndex}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={subItem.href}
                              className={cn(
                                'block rounded-md text-gray-700 transition-all duration-150',
                                isSubActive
                                  ? 'bg-primary font-normal text-white'
                                  : 'hover:bg-white hover:text-primary',
                                isMinimized ? 'px-3.5 py-3' : 'px-4 py-3'
                              )}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <div className="flex w-5 justify-center">
                                  <SubIcon className="size-5 stroke-[2px]" />
                                </div>
                                {!isMinimized && (
                                  <div className="truncate">
                                    {subItem.title.trim()}
                                  </div>
                                )}
                              </div>
                            </Link>
                          </TooltipTrigger>
                          {isMinimized && (
                            <TooltipContent
                              side="right"
                              sideOffset={8}
                              className="rounded-sm bg-white text-primary"
                            >
                              {subItem.title.trim()}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-1 flex-col justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-md transition-all duration-150 hover:bg-white',
                  isMinimized ? 'p-1' : 'p-2'
                )}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback className="flex w-full items-center justify-center bg-gray-800 text-2xl font-light text-white">
                      {auth.userInfo?.firstName.at(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!isMinimized && (
                    <div>
                      <div className="max-w-36 truncate 2xl:max-w-40">
                        {auth.userInfo?.fullName}
                      </div>
                      <div className="max-w-36 truncate text-[10px] font-normal 2xl:max-w-40 2xl:text-xs">
                        {auth.userInfo?.email}
                      </div>
                    </div>
                  )}
                </div>
                {!isMinimized && (
                  <Icons.chevronsUpDown className="size-4 2xl:size-5" />
                )}
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-[213px] rounded-md border-none bg-white p-2 text-gray-800 2xl:w-[251px]">
              <div className="flex flex-col gap-0.5">
                {userPopoverItems.map((item, index) => {
                  const Icon = Icons[item.icon || 'arrowRight'];
                  const isLastItem = index === userPopoverItems.length - 1;
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
    </>
  );
}
