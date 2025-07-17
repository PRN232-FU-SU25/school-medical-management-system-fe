import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetFileById = (id: string) => {
  return useQuery({
    queryKey: ['file', id],
    queryFn: () => BaseRequest.Get(`/api/files/${id}`)
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return BaseRequest.Post('/api/files', formData);
    }
  });
};

export const useDownloadFile = (id: string) => {
  return useQuery({
    queryKey: ['file', id],
    queryFn: () => BaseRequest.Get(`/api/files/download/${id}`)
  });
};

export const useDeleteFile = (id: string) => {
  return useMutation({
    mutationFn: () => BaseRequest.Delete(`/api/files/${id}`)
  });
};
