import BasePages from '@/components/shared/base-pages.js';
import { Icons } from '@/components/ui/icons';
import { notificationTypeMapping } from '@/constants/data';
import __helpers from '@/helpers';
import { cn } from '@/lib/utils';
import { useGetNotifications } from '@/queries/notification.query';
import { Link } from 'react-router-dom';

export default function NotificationPage() {
  const { data: notifications } = useGetNotifications(1, 10);

  return (
    <>
      <BasePages
        className=""
        pageHead="Thông báo | S-Contract"
        breadcrumbs={[
          { title: 'Trang chủ', link: '/' },
          { title: 'Thông báo', link: '/notification' }
        ]}
      >
        <div className="mt-4 flex flex-col gap-8 rounded-md bg-white p-6 shadow-md">
          <div className="flex flex-col gap-2.5">
            <h3>Tất cả thông báo</h3>
            <hr />
            {notifications?.listObjects.length === 0 && (
              <div className="text-center text-sm font-normal">
                Không có thông báo
              </div>
            )}
            {notifications?.listObjects?.map((item, index) => {
              const [day, month, year] = item.createdDate.split('/');
              const dateObj = new Date(`${year}-${month}-${day}T00:00:00Z`);
              const type = notificationTypeMapping[item.type] || item.type;

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
                        <div className="text-sm font-normal">{type}</div>
                        <div className="line-clamp-2 max-w-[800px] text-[13px] font-light">
                          {item.content.trim()}.
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] font-normal text-gray-500">
                      {__helpers.timeAgo(dateObj.getTime() / 1000)}
                    </div>
                  </div>
                </Link>
              );
            })}
            <hr />
          </div>
        </div>
      </BasePages>
    </>
  );
}
