import BaseRequest from '@/config/axios.config';
import { RootState } from '@/redux/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export const useCreateUpdateCustomer = () => {
  return useMutation({
    mutationKey: ['create_update_customer'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/create-update-customer`, model);
    }
  });
};

export const useGetAllCustomerByRole = (
  pageIndex: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    pageIndex: pageIndex,
    pageSize: pageLimit,
    keyword: keyword
  };
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  return useQuery({
    queryKey: ['get_all_customer'],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-customers-by-${role?.toLowerCase()}`,
        model
      );
    }
  });
};

export const useGetAllCustomerByAdmin = (
  pageIndex: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    pageIndex: pageIndex,
    pageSize: pageLimit,
    keyword: keyword
  };

  return useQuery({
    queryKey: ['get_all_customer'],
    queryFn: async () => {
      return BaseRequest.Post(`/get-customers-by-admin`, model);
    }
  });
};

export const useDeleteCustomer = () => {
  return useMutation({
    mutationKey: ['delete_customer'],
    mutationFn: async (id: any) => {
      return BaseRequest.Delete(`/delete-customer/${id}`);
    }
  });
};

export const useAssignCustomerDepartment = () => {
  return useMutation({
    mutationKey: ['assign_customer_department'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(
        `/create-update-customer-department-assign`,
        model
      );
    }
  });
};

export const useGetDepartmentByCustomerId = (id: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const model = {
    pageIndex: 1,
    pageSize: 100,
    customerId: id
  };

  return useQuery({
    queryKey: ['get_customer_department'],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-customer-department-assigns-by-${role?.toLowerCase()}`,
        model
      );
    }
  });
};

export const useGetCustomerByDepartmentId = (id: any) => {
  return useQuery({
    queryKey: ['get_customer'],
    queryFn: async () => {
      return BaseRequest.Get(`/get-dropdown-customers-by-admin/${id}`);
    }
  });
};
