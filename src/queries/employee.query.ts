import BaseRequest from '@/config/axios.config';
// import { PagingModel } from '@/constants/data';
import { useMutation, useQuery } from '@tanstack/react-query';

// const SUB_URL = ``;

export const useGetEmployeeById = (id: number) => {
  return useQuery({
    queryKey: ['get_data_employee_by_id', id],
    queryFn: async () => {
      return await BaseRequest.Get(`get-profile-by-userId/${id}`);
    }
  });
};

export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await BaseRequest.DeleteWithoutCatch(`delete-employee/${id}`);
    }
  });
};

export const useDeleteManager = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await BaseRequest.DeleteWithoutCatch(`delete-manager/${id}`);
    }
  });
};
export const useUploadAvatarEmployee = (fileName: string | undefined) => {
  return useMutation({
    mutationKey: ['upload_image'],
    mutationFn: async (model: any) => {
      return BaseRequest.PostWithImage(
        `upload-customize-photo?CustomFileName=${fileName}`,
        model
      );
    }
  });
};
export const useGetDropdownDepartment = () => {
  return useQuery({
    queryKey: ['get_data_department'],
    queryFn: async () => {
      return await BaseRequest.Get(`get-dropdown-department`);
    },
    staleTime: 3600000
  });
};
export const useGetDataEmployee = () => {
  return useMutation({
    mutationKey: ['get_data_employee'],
    mutationFn: async (model: {
      pageIndex: number;
      pageSize: number;
      keyword: string;
    }) => {
      return await BaseRequest.Post('get-all-employee-profiles', model);
    }
  });
};

export const useGetDataManager = () => {
  return useMutation({
    mutationKey: ['get_data_manager'],
    mutationFn: async (model: {
      pageIndex: number;
      pageSize: number;
      keyword: string;
    }) => {
      return await BaseRequest.Post('get-all-manager-profiles', model);
    }
  });
};

export const useCreateEmployee = () => {
  return useMutation({
    mutationKey: ['create_employee'],
    mutationFn: async (model: any) => {
      return BaseRequest.PostWithoutCatch(`sign-up-account`, model);
    }
  });
};
export const useUpdateEmployee = () => {
  return useMutation({
    mutationKey: ['update_employee'],
    mutationFn: async (model: any) => {
      return BaseRequest.PutWithoutCatch(`edit-profile-by-userId`, model);
    }
  });
};

export const useGetDropdownEmployee = () => {
  const model = {
    pageIndex: 1,
    pageSize: 100
  };
  return useQuery({
    queryKey: ['get_data_employee'],
    queryFn: async () => {
      const res = await BaseRequest.Post('get-all-employee-profiles', model);
      return res?.listObjects?.map((employee) => ({
        label: employee.fullName || `Nhân viên ${employee.id}`,
        value: employee.id.toString()
      }));
    }
  });
};

export const useGetEmployeeByDepartmentId = (id: any) => {
  const model = {
    pageIndex: 1,
    pageSize: 100,
    departmentId: id
  };
  return useQuery({
    queryKey: ['get_data_employee'],
    queryFn: async () => {
      const employee = await BaseRequest.Post(
        'get-all-employee-profiles',
        model
      );
      const manager = await BaseRequest.Post('get-all-manager-profiles', model);

      return manager?.listObjects.concat(employee?.listObjects);
    }
  });
};
