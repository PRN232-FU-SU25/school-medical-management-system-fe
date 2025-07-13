import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface MedicationItemRequest {
  medicineName: string;
  dosage: string;
  instructions?: string;
  timeOfDay?: string;
}

export interface ParentMedicationRequestRequest {
  parentId: number;
  studentId: number;
  startDate: Date;
  endDate: Date;
  medicationItems: MedicationItemRequest[];
}

export interface MedicationItemResponse {
  medicineName: string;
  dosage: string;
  instructions?: string;
  timeOfDay?: string;
}

export interface ParentMedicationRequestResponse {
  parentMedicationRequestId: number;
  parentId: number;
  studentId: number;
  startDate: string;
  endDate: string;
  attachmentUrl?: string;
  status: string;
  createdAt: string;
  medicationItems: MedicationItemResponse[];
}

export const useGetMedicationRequests = (
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['medication_requests', pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/medication-requests?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    }
  });
};

export const useGetMedicationRequestById = (id: number) => {
  return useQuery({
    queryKey: ['medication_request', id],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/medication-requests/${id}`
      );
      return response;
    },
    enabled: !!id
  });
};

export const useGetMedicationRequestsByParent = (
  parentId: number,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['medication_requests_by_parent', parentId, pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/medication-requests/by-parent/${parentId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    },
    enabled: !!parentId
  });
};

export const useGetMedicationRequestsByStudent = (
  studentId: number,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: [
      'medication_requests_by_student',
      studentId,
      pageNumber,
      pageSize
    ],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/medication-requests/by-student/${studentId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    },
    enabled: !!studentId
  });
};

export const useCreateMedicationRequest = () => {
  return useMutation({
    mutationKey: ['create_medication_request'],
    mutationFn: async (model: ParentMedicationRequestRequest) => {
      return await BaseRequest.Post('/api/v1/medication-requests', model);
    }
  });
};

export const useUpdateMedicationRequestStatus = () => {
  return useMutation({
    mutationKey: ['update_medication_request_status'],
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await BaseRequest.Patch(
        `/api/v1/medication-requests/${id}/status`,
        { status }
      );
    }
  });
};

export const useDeleteMedicationRequest = () => {
  return useMutation({
    mutationKey: ['delete_medication_request'],
    mutationFn: async (id: number) => {
      return await BaseRequest.Delete(`/api/v1/medication-requests/${id}`);
    }
  });
};
