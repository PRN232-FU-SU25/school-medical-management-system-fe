import BaseRequest from '@/config/axios.config';
import { ContractServiceGetListDTO } from '@/constants/data';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateUpdateService = () => {
  return useMutation({
    mutationKey: ['create_update_service'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/create-update-contract-service`, model);
    }
  });
};

export const useGetAllServiceByContract = (
  id: string | undefined,
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    ...ContractServiceGetListDTO,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword
  };

  return useQuery({
    queryKey: ['get_all_service', id],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-contract-services-by-contract/${id}`,
        model
      );
    }
  });
};

export const useGetService = (contractId: number, ServiceId: number) => {
  return useQuery({
    queryKey: ['get_service', ServiceId],
    queryFn: async () => {
      return BaseRequest.Get(
        `/get-contract-service/${contractId}/${ServiceId}`
      );
    }
  });
};

export const useDeleteService = () => {
  return useMutation({
    mutationKey: ['delete_service'],
    mutationFn: async (model: any) => {
      return BaseRequest.Delete(
        `/delete-contract-service/${model.contractId}/${model.serviceId}`
      );
    }
  });
};
