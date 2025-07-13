import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface HealthRecordRequest {
  studentId: number;
  allergies: string;
  chronicDiseases: string;
  bloodType: string;
  height: number;
  weight: number;
  visionLeft: number;
  visionRight: number;
  note: string;
  status: string;
}

export interface HealthRecordResponse {
  id: number;
  studentId: number;
  studentName: string;
  class: string;
  dateOfBirth: string;
  gender: string;
  allergies: string;
  chronicDiseases: string;
  bloodType: string;
  height: number;
  weight: number;
  visionLeft: number;
  visionRight: number;
  note: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const useGetHealthRecords = (
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['health_records', pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/health-records?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    }
  });
};

export const useGetHealthRecordByStudent = (studentId: number) => {
  return useQuery({
    queryKey: ['health_record', studentId],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/health-records/by-student/${studentId}`
      );
      return response;
    },
    enabled: !!studentId
  });
};

export const useUpsertHealthRecord = () => {
  return useMutation({
    mutationKey: ['upsert_health_record'],
    mutationFn: async (model: HealthRecordRequest) => {
      return await BaseRequest.Post(`/api/v1/health-records`, model);
    }
  });
};

export const useUpdateHealthRecord = () => {
  return useMutation({
    mutationKey: ['update_health_record'],
    mutationFn: async ({
      id,
      model
    }: {
      id: number;
      model: HealthRecordRequest;
    }) => {
      return await BaseRequest.Put(`/api/v1/health-records/${id}`, model);
    }
  });
};
