import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface HealthRecordRequest {
  studentId: number;
  allergies?: string;
  chronicDiseases?: string;
  pastTreatments?: string;
  vision?: string;
  hearing?: string;
  vaccinations?: string;
}

export interface Student {
  studentId: number;
  fullName: string;
  dob: string;
  gender: string;
  className: string;
  parentId: number;
}

export interface HealthRecord {
  healthRecordId: number;
  studentId: number;
  allergies: string;
  chronicDiseases: string;
  pastTreatments: string;
  vision: string;
  hearing: string;
  vaccinations: string;
  createdAt: string;
  updatedAt: string;
  student: Student;
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

export const useGetHealthRecordById = (id: number) => {
  return useQuery({
    queryKey: ['health_record', id],
    queryFn: async () => {
      const response = await BaseRequest.Get(`/api/v1/health-records/${id}`);
      return response;
    },
    enabled: !!id
  });
};

export const useGetHealthRecordByStudent = (studentId: number) => {
  return useQuery({
    queryKey: ['health_record_by_student', studentId],
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
