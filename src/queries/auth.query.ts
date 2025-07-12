import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * 1. export thường
 * 2. export default
 *
 */

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`login`, model);
    }
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['get_profile'],
    queryFn: async () => {
      return BaseRequest.Get(`/get-personal-profile`);
    },
    retry: 1
  });
};

export const useEditProile = () => {
  return useMutation({
    mutationKey: ['edit_proile'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Put(`/edit-personal-profile`, model);
    }
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/register`, model);
    }
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['forgot_password'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/forgot-password`, model);
    }
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ['reset_password'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/reset-password`, model);
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/logout`, model);
    }
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationKey: ['refresh_token'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/renew-token`, model);
    }
  });
};
