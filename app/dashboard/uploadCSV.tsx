"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { DataTable } from "./FilesTable/FileTable"; // Adjust path as necessary
import { UploadedFile } from "./FilesTable/column"; // Adjust path as necessary

const UploadComponent = () => {
  const [data, setData] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]); // Store selected file IDs

  useEffect(() => {
    const fetchFiles = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch("http://localhost:5000/api/file/getUserFiles", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          // Log the raw response and check if it's ok
          console.log("Response status:", response.status);
          
          // Check if response is OK
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          
          // Parse the JSON response
          const fileData: UploadedFile[] = await response.json();
      
          // Log the file data before setting the state
          console.log("File data received:", fileData);
          
          // Set the data state
          setData(fileData);
        } catch (error) {
          console.error("Error fetching files:", error);
        } finally {
          setLoading(false);
        }
      };

    fetchFiles();
  }, []);

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  // Log selectedFiles whenever it changes
  useEffect(() => {
    console.log("Selected files updated:", selectedFiles);
  }, [selectedFiles]);


  const handleSelectFile = (fileId: string) => {
    setSelectedFiles((prevSelectedFiles) => {
      const isSelected = prevSelectedFiles.includes(fileId);
      const newSelectedFiles = isSelected
        ? prevSelectedFiles.filter((id) => id !== fileId) // Deselect if already selected
        : [...prevSelectedFiles, fileId]; // Add to selected files

      // Log the updated array of selected files
      console.log("Updated selected files:", newSelectedFiles);
      return newSelectedFiles;
    });
  };

  const handleSendEmails = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/file/sendEmailsToAws", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fileIds: selectedFiles }),
    });

    if (response.ok) {
      alert("Emails sent successfully!");
      setSelectedFiles([]); // Clear selection after sending
    } else {
      alert("Error sending emails. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      accessorKey: "fileName", // Accessor key for the file name
      header: "File Name",
    },
    {
      accessorKey: "fileId", // Accessor key for the file ID
      header: "Select",
      cell: ({ row }) => (
        <Button onClick={() => handleSelectFile(row.original.fileID)}>
          {selectedFiles.includes(row.original.fileID) ? "Deselect" : "Select"}
        </Button>
      ),
    },
  ];

  return (
    <Card className="w-full md:w-[50%] ">
      <CardHeader>
        <CardTitle>Files</CardTitle>
        <CardDescription>
          Choose file with emails to whom you want to send bulk emails.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
      <CardFooter className="justify-between border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1" onClick={handleSendEmails}>
          <PlusCircle className="h-3.5 w-3.5" />
          Send Emails
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadComponent;
