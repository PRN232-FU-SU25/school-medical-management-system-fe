import { Icons } from './icons';

const AvatarOverlay = ({ onFileChange }) => (
  <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-white bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
    <Icons.ImageUp className="size-10" />
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={onFileChange}
    />
  </label>
);

export { AvatarOverlay };
