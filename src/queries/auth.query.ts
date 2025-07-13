import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AccountCreationRequest {
  email: string;
  password: string;
  fullName: string;
  role: string;
}

export interface LogoutRequest {
  accessToken: string;
  refreshToken: string;
}

export interface GoogleTokenRequest {
  idToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AccountResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  status: string;
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (model: LoginRequest) => {
      return await BaseRequest.Post('api/auth/login', model);
    }
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (model: AccountCreationRequest) => {
      return await BaseRequest.Post('api/auth/register', model);
    }
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationKey: ['refresh_token'],
    mutationFn: async (refreshToken: string) => {
      return await BaseRequest.Post('api/auth/refresh-token', refreshToken);
    }
  });
};

export const useValidateToken = () => {
  return useMutation({
    mutationKey: ['validate_token'],
    mutationFn: async (token: string) => {
      return await BaseRequest.Get(`api/auth/validate-token?token=${token}`);
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async (model: LogoutRequest) => {
      return await BaseRequest.Post('api/auth/logout', model);
    }
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return await BaseRequest.Get('api/auth/profile');
    }
  });
};

export const useGetGoogleAuthUrl = () => {
  return useQuery({
    queryKey: ['google_auth_url'],
    queryFn: async () => {
      return await BaseRequest.Get('api/auth/oauth2');
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: false,
    enabled: false // Only fetch when needed
  });
};

export const useGoogleToken = () => {
  return useMutation({
    mutationKey: ['google_token'],
    mutationFn: async (model: GoogleTokenRequest) => {
      return await BaseRequest.Post('api/auth/oauth2/token', model);
    }
  });
};
