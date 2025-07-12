import BaseRequest from '@/config/axios.config';
import { ContractGetListDTO } from '@/constants/data';
import __helpers from '@/helpers';
import { RootState } from '@/redux/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

export const useGetAllContract = (
  offset: number,
  pageLimit: number,
  keyword: string | null,
  customerId: string | null
) => {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const model = {
    ...ContractGetListDTO,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword,
    customerId: customerId
  };

  return useQuery({
    queryKey: ['get_all_contract'],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-contracts-by-${role?.toLowerCase()}`,
        model
      );
    }
  });
};

export const useGetAllContractOfEmployee = (id: any) => {
  return useQuery({
    queryKey: ['get_all_contract'],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-contracts-of-employee/${id}`,
        ContractGetListDTO
      );
    }
  });
};

export const useGetAllContractOverview = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  return useMutation({
    mutationKey: ['get_all_contract'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(
        `/get-contracts-by-${role?.toLowerCase()}`,
        model
      );
    }
  });
};

export const useGetAllExpiredContract = (
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const model = {
    ...ContractGetListDTO,
    isExpired: true,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword
  };

  return useQuery({
    queryKey: ['get_all_expired_contract'],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-contracts-by-${role?.toLowerCase()}`,
        model
      );
    }
  });
};

export const useGetAllNearlyExpiredContract = (
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const model = {
    ...ContractGetListDTO,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword,
    expirationDate: __helpers.createExpirationRange()
  };

  return useQuery({
    queryKey: ['get_all_nearly_expired_contract'],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-contracts-by-${role?.toLowerCase()}`,
        model
      );
    }
  });
};

export const useGetContract = (id: string | undefined) => {
  return useQuery({
    queryKey: ['get_contract', id],
    queryFn: async () => {
      return BaseRequest.Get(`/get-contract-by-id/${id}`);
    }
  });
};

export const useCreateContract = () => {
  return useMutation({
    mutationKey: ['create_contract'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`create-contract`, model);
    }
  });
};

export const useUpdateContract = () => {
  return useMutation({
    mutationKey: ['update_contract'],
    mutationFn: async (model: any) => {
      return BaseRequest.Put(`update-contract`, model);
    }
  });
};

export const useGetCustomerList = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;
  const model = {
    pageIndex: 1,
    pageSize: 100
  };

  return useQuery({
    queryKey: ['get_customer_list'],
    queryFn: async () => {
      var customerList =
        role !== 'Admin'
          ? await BaseRequest.Get(
              `/get-dropdown-customers-by-manager-or-employee`
            )
          : await BaseRequest.Post(`/get-customers-by-admin`, model);

      if (customerList?.listObjects) customerList = customerList?.listObjects;
      return customerList.map((company) => ({
        label: company.companyName || `Công ty ${company.id}`,
        value: company.id.toString()
      }));
    }
  });
};

export const useGetContractTypeList = () => {
  return useQuery({
    queryKey: ['get_contract_type_list'],
    queryFn: async () => {
      const typeList = await BaseRequest.Get(
        `/get-dropdown-list-contract-types`
      );
      return typeList.map((type) => ({
        label: type.name || `Loại ${type.id}`,
        value: type.id.toString()
      }));
    }
  });
};

export const useCreateUpdateContractType = () => {
  return useMutation({
    mutationKey: ['create_update_contract_type'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/create-update-contract-type`, model);
    }
  });
};

export const useGetContractType = (id: string | undefined) => {
  return useQuery({
    queryKey: ['get_contract_type', id],
    queryFn: async () => {
      return BaseRequest.Get(`/get-contract-type-by-id/${id}`);
    }
  });
};

export const useGetAllContractType = (
  offset: number,
  pageLimit: number,
  keyword: string | null
) => {
  const model = {
    ...ContractGetListDTO,
    pageIndex: offset,
    pageSize: pageLimit,
    keyword: keyword
  };

  return useQuery({
    queryKey: ['get_all_contract_type'],
    queryFn: async () => {
      return BaseRequest.Post(`/get-all-contract-types`, model);
    }
  });
};

type ContractFilter = {
  pageIndex: number;
  pageSize: number;
  contractTypeId?: number;
  customerName?: string;
  title?: string;
  appendixQuantity?: number;
  isExpired?: boolean;
  signedDate?: { from: string; to: string };
  effectiveDate?: { from: string; to: string };
  expirationDate?: { from: string; to: string };
  priceRange?: { from: number; to: number };
};

export const useGetContractByRole = (filter?: ContractFilter) => {
  const auth = useSelector((state: RootState) => state.auth);
  const role = auth.role;

  return useQuery({
    queryKey: ['get_contract_by_role'],
    queryFn: async () => {
      return BaseRequest.Post(
        `/get-contracts-by-${role?.toLowerCase()}`,
        filter
      );
    }
  });
};

export const useDeleteContract = () => {
  return useMutation({
    mutationKey: ['delete_contract'],
    mutationFn: async (id: any) => {
      return BaseRequest.Delete(`/delete-contract/${id}`);
    }
  });
};

export const useDeleteContractType = () => {
  return useMutation({
    mutationKey: ['delete_contract_type'],
    mutationFn: async (id: any) => {
      return BaseRequest.Delete(`/delete-contract-type/${id}`);
    }
  });
};

export const useAssignToDepartment = () => {
  return useMutation({
    mutationKey: ['assign_department'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/assign-contract-to-department`, model);
    }
  });
};

export const useAssignToEmployee = () => {
  return useMutation({
    mutationKey: ['assign_employee'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/assign-contract-to-employee`, model);
    }
  });
};
