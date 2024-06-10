import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function FileUploader() {
  const [fileUrl, setFileUrl] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <div
        {...getRootProps()}
        className="flex flex-center flex-center bg-dark-3 rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
