import BaseRequest from '@/config/axios.config';
import { HistoryGetListDTO } from '@/constants/data';
import __helpers from '@/helpers';
import { useQuery } from '@tanstack/react-query';

export const useGetAllContractHistory = (
  contractId: string | undefined,
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    ...HistoryGetListDTO,
    contractId: contractId,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword,
    createdDate: __helpers.createHistoryCreateRange()
  };

  return useQuery({
    queryKey: ['get_all_contract_history'],
    queryFn: async () => {
      return BaseRequest.Post(`/get-contract-histories`, model);
    }
  });
};

export const useGetAllContractAppendixHistory = (
  contractId: string | undefined,
  contractAppendixId: string | undefined,
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    ...HistoryGetListDTO,
    contractId: contractId,
    contractAppendixId: contractAppendixId,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword,
    createdDate: __helpers.createHistoryCreateRange()
  };

  return useQuery({
    queryKey: ['get_all_contract_appendix_history'],
    queryFn: async () => {
      return BaseRequest.Post(`/get-contract-appendix-histories`, model);
    }
  });
};

export const useGetAllContractDocumentHistory = (
  contractId: string | undefined,
  contractDocumentId: string | undefined,
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    ...HistoryGetListDTO,
    contractId: contractId,
    contractDocumentId: contractDocumentId,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword,
    createdDate: __helpers.createHistoryCreateRange()
  };

  return useQuery({
    queryKey: ['get_all_contract_document_history'],
    queryFn: async () => {
      return BaseRequest.Post(`/get-contract-document-histories`, model);
    }
  });
};

export const useGetAllContractServiceHistory = (
  contractId: string | undefined,
  contractServiceId: string | undefined,
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    ...HistoryGetListDTO,
    contractId: contractId,
    contractServiceId: contractServiceId,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword,
    createdDate: __helpers.createHistoryCreateRange()
  };

  return useQuery({
    queryKey: ['get_all_contract_service_history'],
    queryFn: async () => {
      return BaseRequest.Post(`/get-contract-service-histories`, model);
    }
  });
};
