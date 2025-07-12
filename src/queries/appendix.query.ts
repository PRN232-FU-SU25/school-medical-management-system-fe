import BaseRequest from '@/config/axios.config';
import { ContractAppendixGetListDTO } from '@/constants/data';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateUpdateAppendix = () => {
  return useMutation({
    mutationKey: ['create_update_appendix'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/create-update-contract-appendix`, model);
    }
  });
};

export const useGetAllAppendixByContract = (
  id: string | undefined,
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    ...ContractAppendixGetListDTO,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword
  };

  return useQuery({
    queryKey: ['get_all_appendix', id],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-contract-appendices-by-contract/${id}`,
        model
      );
    }
  });
};

export const useGetAppendix = (contractId: number, appendixId: number) => {
  return useQuery({
    queryKey: ['get_appendix', appendixId],
    queryFn: async () => {
      return BaseRequest.Get(
        `/get-contract-appendix/${contractId}/${appendixId}`
      );
    }
  });
};

export const useDeleteAppendix = () => {
  return useMutation({
    mutationKey: ['delete_appendix'],
    mutationFn: async (model: any) => {
      return BaseRequest.Delete(
        `/delete-contract-appendix/${model.contractId}/${model.appendixId}`
      );
    }
  });
};
