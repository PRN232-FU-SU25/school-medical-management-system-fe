import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface MedicalSupplyRequest {
  name: string;
  expiryDate?: Date;
  instructions?: string;
  quantityAvailable: number;
  description?: string;
  startedDate?: Date;
  type: string;
  unit?: string;
  status?: string;
}

export interface MedicalSupplyResponse {
  medicalSupplyId: number;
  name: string;
  expiryDate?: string;
  instructions?: string;
  quantityAvailable: number;
  description?: string;
  startedDate?: string;
  type: string;
  unit?: string;
  status?: string;
}

export const useGetMedicalSupplies = (
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['medical_supplies', pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/medical-supplies?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    }
  });
};

export const useGetMedicalSupplyById = (id: number) => {
  return useQuery({
    queryKey: ['medical_supply', id],
    queryFn: async () => {
      const response = await BaseRequest.Get(`/api/v1/medical-supplies/${id}`);
      return response;
    },
    enabled: !!id
  });
};

export const useCreateMedicalSupply = () => {
  return useMutation({
    mutationKey: ['create_medical_supply'],
    mutationFn: async (model: MedicalSupplyRequest) => {
      return await BaseRequest.Post('/api/v1/medical-supplies', model);
    }
  });
};

export const useUpdateMedicalSupply = () => {
  return useMutation({
    mutationKey: ['update_medical_supply'],
    mutationFn: async ({
      id,
      model
    }: {
      id: number;
      model: MedicalSupplyRequest;
    }) => {
      return await BaseRequest.Put(`/api/v1/medical-supplies/${id}`, model);
    }
  });
};

export const useDeleteMedicalSupply = () => {
  return useMutation({
    mutationKey: ['delete_medical_supply'],
    mutationFn: async (id: number) => {
      return await BaseRequest.Delete(`/api/v1/medical-supplies/${id}`);
    }
  });
};
