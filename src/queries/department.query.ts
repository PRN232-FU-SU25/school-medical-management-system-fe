import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useDeleteDepartment = () => {
  return useMutation({
    mutationKey: ['delete_department'],
    mutationFn: async (id: any) => {
      return BaseRequest.Delete(`/delete-department/${id}`);
    }
  });
};

export const useCreateUpdateDepartment = () => {
  return useMutation({
    mutationKey: ['create_update_department'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/create-update-department`, model);
    }
  });
};

export const useGetAllDepartment = (
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword
  };

  return useQuery({
    queryKey: ['get_all_department'],
    queryFn: async () => {
      return BaseRequest.Post(`/get-all-departments`, model);
    }
  });
};

export const useGetDropdownDepartment = () => {
  return useQuery({
    queryKey: ['get_data_department'],
    queryFn: async () => {
      const typeList = await BaseRequest.Get(`get-dropdown-department`);
      return typeList.map((type) => ({
        label: type.name || `Phòng ${type.id}`,
        value: type.id.toString()
      }));
    }
  });
};
