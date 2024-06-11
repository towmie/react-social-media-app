import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (file: File[]) => void;
  mediaUrl: string;
};

function FileUploader({ fieldChange, mediaUrl }: FileUploaderProps) {
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".svg", ".png", ".jpg"] },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex flex-center flex-center bg-dark-3 rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {fileUrl ? (
          <div>
            <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
              <img src={fileUrl} alt="file" className="file_uploader-img" />
            </div>
            <p className="file_uploader-label">
              Click or drag a photo to replace
            </p>
          </div>
        ) : (
          <div className="file_uploader-box">
            <img
              src="/assets/icons/file-upload.svg"
              alt="upload"
              className=""
              height={77}
              width={96}
            />
            <h3 className=" text-light-2 mt-6 mb-2 base-medium">Drag & Drop</h3>
            <p className="text-light-4 small-regular mb-6"> SVG, PNG, JPG</p>
            <Button className="shad-button_dark_4">Select from computer</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
