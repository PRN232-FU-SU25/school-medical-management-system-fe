import { useMutation, useQuery } from '@tanstack/react-query';
import BaseRequest from '@/config/axios.config';

interface Blog {
  nurseId: number;
  title: string;
  content: string;
  thumbnailUrl?: string;
  tags?: string;
  publishAt?: Date;
}

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () => BaseRequest.Get('/api/v1/blogs')
  });
};

export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => BaseRequest.Get(`/api/v1/blogs/${id}`)
  });
};

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: (blog: Blog) => BaseRequest.Post('/api/v1/blogs', blog)
  });
};

export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: ({ id, blog }: { id: string; blog: Blog }) =>
      BaseRequest.Put(`/api/v1/blogs/${id}`, blog)
  });
};

export const useDeleteBlog = () => {
  return useMutation({
    mutationFn: (id: string) => BaseRequest.Delete(`/api/v1/blogs/${id}`)
  });
};

export const useDeleteBlogPermanent = () => {
  return useMutation({
    mutationFn: (id: string) => BaseRequest.Delete(`/api/v1/blogs/${id}/force`)
  });
};
