import { useMutation, useQuery } from '@tanstack/react-query';
import BaseRequest from '@/config/axios.config';

interface User {
  fullName: string;
  avatar?: string;
  phone?: string;
  address?: string;
  dob?: Date | string;
  otherInfo?: string;
  role: string;
}

interface SchoolNurse {
  specialization?: string;
  note?: string;
  email: string;
  password: string;
  fullName: string;
}

export const useGetUsers = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['users', pageNumber, pageSize],
    queryFn: () =>
      BaseRequest.Get(
        `/api/accounts?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => BaseRequest.Get(`/api/accounts/${id}`)
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: User }) =>
      BaseRequest.Put(`/api/accounts/${id}`, user)
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: string) => BaseRequest.Delete(`/api/accounts/${id}`)
  });
};

export const useGetSchoolNurses = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['school-nurses', pageNumber, pageSize],
    queryFn: () =>
      BaseRequest.Get(
        `/api/school-nurses?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
  });
};

export const useGetSchoolNurseById = (id: string) => {
  return useQuery({
    queryKey: ['school-nurse', id],
    queryFn: () => BaseRequest.Get(`/api/school-nurses/${id}`)
  });
};

export const useCreateSchoolNurse = () => {
  return useMutation({
    mutationFn: (schoolNurse: SchoolNurse) =>
      BaseRequest.Post('/api/school-nurses', schoolNurse)
  });
};

export const useImportParentAccounts = () => {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return BaseRequest.Post('/api/parents/import', formData);
    }
  });
};
