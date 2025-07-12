import BaseRequest from '@/config/axios.config';
import { ContractDocumentGetListDTO } from '@/constants/data';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateUpdateDocument = () => {
  return useMutation({
    mutationKey: ['create_update_document'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/create-update-contract-document`, model);
    }
  });
};

export const useGetAllDocumentByContract = (
  id: string | undefined,
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    ...ContractDocumentGetListDTO,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword
  };

  return useQuery({
    queryKey: ['get_all_document', id],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-contract-documents-by-contract/${id}`,
        model
      );
    }
  });
};

export const useGetDocument = (contractId: number, documentId: number) => {
  return useQuery({
    queryKey: ['get_document', documentId],
    queryFn: async () => {
      return BaseRequest.Get(
        `/get-contract-document/${contractId}/${documentId}`
      );
    }
  });
};

export const useDeleteDocument = () => {
  return useMutation({
    mutationKey: ['delete_document'],
    mutationFn: async (model: any) => {
      return BaseRequest.Delete(
        `/delete-contract-document/${model.contractId}/${model.documentId}`
      );
    }
  });
};
