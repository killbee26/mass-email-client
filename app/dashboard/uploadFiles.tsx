import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import CustomFileUploadDialog from '@/components/ui/custom/CustomFileUploadDialog';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Ensure you have this installed
import 'react-toastify/dist/ReactToastify.css';

function UploadFiles() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const handleUploadSuccess = (file: File) => {
    setUploadedFiles(prev => [...prev, file]);
    toast.success(`Successfully uploaded ${file.name}!`);
  };

  const handleUploadError = (error: string) => {
    toast.error(`Error uploading file: ${error}`);
  };

  return (
    <div className='flex justify-center'>
      <Card className='w-full md:max-w-[50%]'>
        <CardHeader>
          <CardTitle>Upload Email CSV</CardTitle>
          <CardDescription>Choose CSV files to upload</CardDescription>
          
        </CardHeader>
        <CardContent>
        <div>
            <CustomFileUploadDialog
              onFileUploadSuccess={handleUploadSuccess} // Pass success callback
              onFileUploadError={handleUploadError} // Pass error callback
            />
          </div>
        {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index} className="text-gray-600">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
        </CardContent>

      </Card>
      <ToastContainer /> {/* Add the toast container here */}
      {/* Optional: Display uploaded files */}
      
    </div>
  );
}

export default UploadFiles;
