import BaseRequest from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';

interface UploadCustomizePhotoModel {
  customFileName: string;
  file: File;
}

export const useUploadCustomizePhoto = () => {
  return useMutation({
    mutationKey: ['upload_customize_photo'],
    mutationFn: async (model: UploadCustomizePhotoModel) => {
      const formData = new FormData();
      formData.append('file', model.file);
      return await BaseRequest.PostWithImage(
        `/upload-customize-photo?CustomFileName=${model.customFileName}`,
        formData
      );
    }
  });
};

export const useUploadCustomizeFile = () => {
  return useMutation({
    mutationKey: ['upload_customize_file'],
    mutationFn: async (model: UploadCustomizePhotoModel) => {
      const formData = new FormData();
      formData.append('file', model.file);
      return await BaseRequest.Post(
        `/upload-file?CustomFileName=${model.customFileName}`,
        formData
      );
    }
  });
};

export const useDownloadFile = () => {
  return useMutation({
    mutationKey: ['download_file'],
    mutationFn: async (fileName: string) => {
      return BaseRequest.DownloadFile(`/download-file/${fileName}`, fileName);
    }
  });
};

export const useOpenFile = () => {
  return useMutation({
    mutationKey: ['open_file'],
    mutationFn: async (fileName: string) => {
      return BaseRequest.OpenFileInNewTab(`/download-file/${fileName}`);
    }
  });
};
