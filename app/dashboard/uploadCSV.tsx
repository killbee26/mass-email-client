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
import { MailCompose } from "./mailCompose";
import api from "../utils/api";

const UploadComponent = () => {
  const [data, setData] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]); // Store selected file IDs
  const [emailData, setEmailData] = useState({
    sender: "",
    subject: "",
    body: "",
  }); // Store email details
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await api.get("/file/getUserFiles");
        
        // Log the response status
        console.log("Response status:", response.status);
  
        // Check if response is OK
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        
        // Set the data state with the response data
        const fileData: UploadedFile[] = response.data;
        console.log("File data received:", fileData);
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

 
  // Handle combined submission of email data and file IDs
  const handleSendEmails = async () => {
    // Ensure both email data and files are selected
    if (!emailData.sender || !emailData.subject || !emailData.body || selectedFiles.length === 0) {
      alert("Please fill in all email fields and select at least one file.");
      return;
    }
  
    try {
      const response = await api.post("/file/sendEmailsToAws", {
        sender: emailData.sender,
        subject: emailData.subject,
        body: emailData.body,
        fileIds: selectedFiles,
      });
  
      if (response.status === 200) {
        alert("Emails sent successfully!");
        setSelectedFiles([]); // Clear selection after sending
      }
    } catch (error) {
      console.error("Error sending emails:", error);
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
      cell: ({ row }: { row: any }) => (
        <Button onClick={() => handleSelectFile(row.original.fileID)}>
          {selectedFiles.includes(row.original.fileID) ? "Deselect" : "Select"}
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-row w-full">

    {/* <Card className="ml-2 w-full"> */}
    <MailCompose
      senderAddress={emailData.sender}
      defaultSubject={emailData.subject}
      defaultBody={emailData.body}
      onSend={(sender, subject, body) => {
        console.log("Email sent:", sender, subject, body)
        setEmailData({ sender, subject, body });
      }}
    />
    {/* </Card> */}
    <Card className="w-full md:max-w-[50%] ml-14">
      <CardHeader>
        <CardTitle>Files</CardTitle>
        <CardDescription>
          Choose file with emails to whom you want to send bulk emails.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} pageSize={5} />
      </CardContent>
      <CardFooter className="justify-between border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1" onClick={handleSendEmails}>
          <PlusCircle className="h-3.5 w-3.5 " />
          Send Emails
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
};

export default UploadComponent;
