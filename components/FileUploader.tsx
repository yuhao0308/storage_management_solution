"use client";

import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { uploadFiles } from "@/lib/actions/file.actions";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        try {
          if (file.size > MAX_FILE_SIZE) {
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name),
            );
            return toast({
              description: "File too large. Max size is 50MB.",
              className: "error-toast",
            });
          }

          const result = await uploadFiles({ file, ownerId, accountId, path });

          if (result) {
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name),
            );
            toast({
              description: "File uploaded successfully!",
              className: "success-toast",
            });
          }
        } catch (error) {
          console.error("Upload error:", error);
          toast({
            description: "Failed to upload file. Please try again.",
            className: "error-toast",
          });
        }
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button", className)}>
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      alt="file-loader"
                      width={80}
                      height={26}
                    />
                  </div>
                </div>
                <Image
                  src="/assets/icons/remove.svg"
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
