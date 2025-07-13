import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface StudentRequest {
  id?: number;
  name: string;
  class: string;
  dateOfBirth: string;
  gender: string;
}

export interface StudentResponse {
  studentId: number;
  fullName: string;
  className: string;
  dob: string;
  gender: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export const useGetStudents = (
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['students', pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/students?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    }
  });
};

export const useGetStudentById = (id: number) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const response = await BaseRequest.Get(`/api/v1/students/${id}`);
      return response;
    },
    enabled: !!id
  });
};

export const useCreateStudent = () => {
  return useMutation({
    mutationKey: ['create_student'],
    mutationFn: async (model: StudentRequest) => {
      return await BaseRequest.Post('/api/v1/students', model);
    }
  });
};

export const useUpdateStudent = () => {
  return useMutation({
    mutationKey: ['update_student'],
    mutationFn: async ({
      id,
      model
    }: {
      id: number;
      model: StudentRequest;
    }) => {
      return await BaseRequest.Put(`/api/v1/students/${id}`, model);
    }
  });
};

export const useDeleteStudent = () => {
  return useMutation({
    mutationKey: ['delete_student'],
    mutationFn: async (id: number) => {
      return await BaseRequest.Delete(`/api/v1/students/${id}`);
    }
  });
};
