"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FaImage } from "react-icons/fa";

interface Props {
  onImageUploaded: (src: string) => void;
}

const ImageUpload: React.FC<Props> = ({ onImageUploaded }) => {
  const onUpload = (result: any) => {
    onImageUploaded(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      uploadPreset="easyhome"
      onUpload={onUpload}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              flex
              justify-center
              p-20
              w-full
              border-2
              border-dashed
              border-neutral-300
              text-green-800
              hover:opacity-70
            "
          >
            <FaImage size={36} />
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
