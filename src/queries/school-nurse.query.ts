import BaseRequest from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';

export interface SchoolNurseResponse {
  schoolNurseId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export const useGetSchoolNurses = (
  pageNumber: number = 1,
  pageSize: number = 50
) => {
  return useQuery({
    queryKey: ['school_nurses', pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/school-nurses?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    }
  });
};

export const useGetSchoolNurseById = (id: number) => {
  return useQuery({
    queryKey: ['school_nurse', id],
    queryFn: async () => {
      const response = await BaseRequest.Get(`/api/school-nurses/${id}`);
      return response;
    },
    enabled: !!id
  });
};
