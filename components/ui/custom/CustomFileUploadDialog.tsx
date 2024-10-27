import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "../progress";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import api from "@/app/utils/api";

interface CustomFileUploadDialogProps {
    onFileUploadSuccess: (file: File) => void;
    onFileUploadError: (error: string) => void;
}

const CustomFileUploadDialog: React.FC<CustomFileUploadDialogProps> = ({
  onFileUploadSuccess,
  onFileUploadError,
}) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const maxFileSize = 5 * 1024 * 1024; // 5 MB
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [fileUploadState, setUploadState] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  
  const handleClose = () => {
    setFiles([]); // Clear files regardless
    setOpen(false);
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/file/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable && progressEvent.total) {
            const percentComplete = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress((prev) => {
              const newProgress = [...prev];
              newProgress[files.indexOf(file)] = percentComplete; // Update progress for the specific file
              return newProgress;
            });
          }
        },
      });

      console.log('File uploaded successfully:', response.data);
      return response.data; // Return successful response
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Re-throw the error to be caught in the caller function
    }
  };

  const handleConfirmUpload = async () => {
    console.log("Files selected for upload:", files);
    
    // Confirm with user before starting upload
    const confirmUpload = window.confirm("Are you sure you want to upload these files?");
    if (!confirmUpload) {
      return; // Exit if the user cancels
    }

    setUploadState(true); // Set upload state to true at the start of the upload process

    try {
      // Create an array of upload promises
      const uploadPromises = files.map(file => uploadFile(file));

      // Wait for all files to upload
      const results = await Promise.all(uploadPromises);

      // Handle successful uploads
      results.forEach((result, index) => {
        onFileUploadSuccess(files[index]); // Call success handler for each file
     // Notify success for each file
      });

      console.log("All files uploaded successfully.");
      handleClose(); // Close the upload dialog only after successful uploads

    } catch (error) {
      onFileUploadError("An error occurred during upload."); // Call error handler
      toast.error("File upload failed."); // Notify failure
    } finally {
      setUploadState(false); // Reset upload state in the finally block
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      if (file.size > maxFileSize) {
        toast.error(`${file.name} is too large. Max size is 5 MB.`);
        return;
      }
    });
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'text/csv': ['.csv'],
    },
  });

  return (
    <>
      <Button variant="default" onClick={handleOpenDialog}>
        Upload Files
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Your Files</DialogTitle>
          </DialogHeader>

          <div
            {...getRootProps()}
            className={`border border-dashed rounded-md p-4 text-center cursor-pointer 
              ${isDragActive ? "bg-gray-100" : "bg-white"}
            `}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-500">Drop the files here...</p>
            ) : (
              <p className="text-gray-500">Drag and drop files here, or click to select</p>
            )}
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-gray-700 font-semibold">Files to Upload:</h4>
              <ul>
                {files.map((file, index) => (
                  <li key={index} className="text-gray-600">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    {fileUploadState && (
                      <div className="mt-2">
                        <Progress value={uploadProgress[index] || 0} max={100} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DialogFooter>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleConfirmUpload}>
              Confirm Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomFileUploadDialog;
