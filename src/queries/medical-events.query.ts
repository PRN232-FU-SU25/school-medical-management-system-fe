import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface MedicalEventRequest {
  studentId: number;
  eventType: number;
  description?: string;
  handledBy?: number;
  date: Date;
}

export interface Student {
  studentId: number;
  fullName: string;
  dob: string;
  gender: string;
  className: string;
  parentId: number;
}

export interface MedicalEventResponse {
  medicalEventId: number;
  studentId: number;
  studentFullName: string;
  eventType: string;
  description?: string;
  handledBy: number;
  nurseFullName: string;
  date: string;
  createAt: string;
  student: Student;
}

export const useGetMedicalEvents = (
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['medical_events', pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/medical-events?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    }
  });
};

export const useGetMedicalEventById = (id: number) => {
  return useQuery({
    queryKey: ['medical_event', id],
    queryFn: async () => {
      const response = await BaseRequest.Get(`/api/v1/medical-events/${id}`);
      return response;
    },
    enabled: !!id
  });
};

export const useGetMedicalEventsByStudent = (
  studentId: number,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['medical_events_by_student', studentId, pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/medical-events/by-student/${studentId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    },
    enabled: !!studentId
  });
};

export const useGetMedicalEventsBySchoolNurse = (
  nurseId: number,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['medical_events_by_nurse', nurseId, pageNumber, pageSize],
    queryFn: async () => {
      const response = await BaseRequest.Get(
        `/api/v1/medical-events/by-school-nurse/${nurseId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response;
    },
    enabled: !!nurseId
  });
};

export const useCreateMedicalEvent = () => {
  return useMutation({
    mutationKey: ['create_medical_event'],
    mutationFn: async (model: MedicalEventRequest) => {
      return await BaseRequest.Post(`/api/v1/medical-events`, model);
    }
  });
};

export const useUpdateMedicalEvent = () => {
  return useMutation({
    mutationKey: ['update_medical_event'],
    mutationFn: async ({
      id,
      model
    }: {
      id: number;
      model: MedicalEventRequest;
    }) => {
      return await BaseRequest.Put(`/api/v1/medical-events/${id}`, model);
    }
  });
};
