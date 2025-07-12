import BaseRequest from '@/config/axios.config';
import __helpers from '@/helpers';
import { useQuery } from '@tanstack/react-query';

export const useGetNotifications = (pageIndex: number, pageLimit: number) => {
  const model = {
    pageIndex: pageIndex,
    pageSize: pageLimit,
    orderDate: 1,
    createdDate: __helpers.createHistoryCreateRange()
  };

  return useQuery({
    queryKey: ['get_notifications'],
    queryFn: async () => {
      return BaseRequest.Post(`/get-notifications-by-logged-user`, model);
    }
  });
};
