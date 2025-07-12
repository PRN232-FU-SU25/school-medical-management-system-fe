import BaseRequest from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';

export const useGetOverviewData = () => {
  return useQuery({
    queryKey: ['get_summary_data'],
    queryFn: async () => {
      return BaseRequest.Get(`/get-summary-data-in-month`);
    }
  });
};
