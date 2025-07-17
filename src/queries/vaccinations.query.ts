import { useMutation, useQuery } from '@tanstack/react-query';
import BaseRequest from '@/config/axios.config';

// Vaccination Consents
// yêu cầu tiêm đã được chấp thuận
export const useGetParentConsents = () => {
  return useQuery({
    queryKey: ['parent-consents'],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        '/api/v1/vaccination-consents/parent'
      );
      return response;
    }
  });
};

// yêu cầu tiêm chưa được chấp thuận
export const useGetNewParentConsents = () => {
  return useQuery({
    queryKey: ['new-parent-consents'],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        '/api/v1/vaccination-consents/parent/new'
      );
      return response;
    }
  });
};

export const useGetCampaignConsents = (
  campaignId: number,
  pageNumber = 1,
  pageSize = 10
) => {
  return useQuery({
    queryKey: ['campaign-consents', campaignId, pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/vaccination-consents/campaign/${campaignId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    }
  });
};

// đông ý tiêm chủng
export const useUpdateConsent = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await BaseRequest.Put(
        `/api/v1/vaccination-consents/${id}/consent`,
        data
      );
      return response;
    }
  });
};

// Vaccination Campaigns
export const useGetVaccinationCampaigns = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['vaccination-campaigns', pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/vaccination?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    }
  });
};

export const useGetVaccinationCampaign = (id: number) => {
  return useQuery({
    queryKey: ['vaccination-campaign', id],
    queryFn: async () => {
      const response = await BaseRequest.Get(`/api/v1/vaccination/${id}`);
      return response;
    },
    enabled: !!id
  });
};

export const useCreateVaccinationCampaign = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await BaseRequest.Post('/api/v1/vaccination', data);
      return response;
    }
  });
};

export const useUpdateVaccinationCampaign = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await BaseRequest.Put(`/api/v1/vaccination/${id}`, data);
      return response;
    }
  });
};

export const useDeleteVaccinationCampaign = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await BaseRequest.Delete(`/api/v1/vaccination/${id}`);
      return response;
    }
  });
};

export const useGenerateVaccinationSchedule = () => {
  return useMutation({
    mutationFn: async (data: { campaignId: number; scheduleDate: Date }) => {
      const response = await BaseRequest.Post(
        '/api/v1/vaccination/generate-schedule',
        data
      );
      return response;
    }
  });
};

// Vaccination Records
export const useCreateVaccinationRecord = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await BaseRequest.Post(
        '/api/v1/vaccination-records',
        data
      );
      return response;
    }
  });
};

export const useGetStudentVaccinationRecords = (studentId: number) => {
  return useQuery({
    queryKey: ['student-vaccination-records', studentId],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/vaccination-records/by-student/${studentId}`
      );
      return response;
    },
    enabled: !!studentId
  });
};

export const useGetCampaignVaccinationRecords = (
  campaignId: number,
  pageNumber = 1,
  pageSize = 10
) => {
  return useQuery({
    queryKey: [
      'campaign-vaccination-records',
      campaignId,
      pageNumber,
      pageSize
    ],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/vaccination-records/by-campaign?campaignId=${campaignId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    },
    enabled: !!campaignId
  });
};

// Vaccination Schedules
export const useGetCampaignVaccinationSchedules = (
  campaignId: number,
  pageNumber = 1,
  pageSize = 10
) => {
  return useQuery({
    queryKey: [
      'campaign-vaccination-schedules',
      campaignId,
      pageNumber,
      pageSize
    ],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/vaccination-schedules/campaign/${campaignId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    },
    enabled: !!campaignId
  });
};

export const useGetStudentVaccinationSchedules = (studentId: number) => {
  return useQuery({
    queryKey: ['student-vaccination-schedules', studentId],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/vaccination-schedules/student/${studentId}`
      );
      return response;
    },
    enabled: !!studentId
  });
};

export const useGetParentVaccinationSchedules = () => {
  return useQuery({
    queryKey: ['parent-vaccination-schedules'],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        '/api/v1/vaccination-schedules/parent'
      );
      return response;
    }
  });
};

// Post-Vaccination Observations
export const useCreateObservation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await BaseRequest.Post('/api/v1/observations', data);
      return response;
    }
  });
};

export const useGetRecordObservations = (recordId: number) => {
  return useQuery({
    queryKey: ['record-observations', recordId],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/observations/by-record/${recordId}`
      );
      return response;
    },
    enabled: !!recordId
  });
};

export const useGetCampaignObservations = (
  campaignId: number,
  pageNumber = 1,
  pageSize = 10
) => {
  return useQuery({
    queryKey: ['campaign-observations', campaignId, pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/observations/campaign/${campaignId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    },
    enabled: !!campaignId
  });
};

export const useGetVaccinationRecordByCampaignAndStudent = () => {
  return useMutation({
    mutationFn: async (data: { campaignId: number; studentId: number }) => {
      const response = await BaseRequest.Get(
        `/api/v1/vaccination-records/by-campaign-student?campaignId=${data.campaignId}&studentId=${data.studentId}`
      );
      return response;
    }
  });
};
