// pages/dashboard.tsx
'use client';
import DashNavbar from '@/components/ui/DashNavbar';
import ChartComponent from '@/components/ui/ChartComponent';
import CsvUploadContent from './FilesTable/csvUploadContent';
import AnalyticsContent from './analyticsContent';
import UploadFiles from './uploadFiles'
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect,useState } from 'react';
import axios from 'axios';
import useAuthCheck from '../services/authCheck';
import UploadComponent from './uploadCSV';





const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Analytics");
  const [data, setData] = useState(null);
 
 

  const isAuthenticated = useAuthCheck();


  // Show loading indicator while data is being fetched
  if (!isAuthenticated) {

    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <h2 className="text-2xl">Loading...</h2> {/* You can replace this with a spinner or loading animation */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-black">
      <DashNavbar />
      <div className="p-6">
        <h2 className="text-4xl font-bold mb-6">Dashboard</h2>
        <Tabs defaultValue="Analytics" className="w-full">
          <TabsList className='bg-accent '>
            <TabsTrigger 
              value="Analytics" 
              className={`${
                selectedTab === "Analytics" ? "bg-accent-foreground text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("Analytics")}
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="csv_history" 
              className={`${
                selectedTab === "csv_history" ? "bg-accent-foreground text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("csv_history")}
            >
              CSV's
            </TabsTrigger>
            <TabsTrigger 
              value="sendEmails" 
              className={`${
                selectedTab === "Send Emails" ? "bg-accent-foreground text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("Send Emails")}
            >
              Send Emails
            </TabsTrigger>
            <TabsTrigger 
              value="uploadcsv" 
              className={`${
                selectedTab === "uploadcsv" ? "bg-accent-foreground text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("uploadcsv")}
            >
              Upload CSV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Analytics" className='mt-8 w-full h-full'>
            <AnalyticsContent />
          </TabsContent>
          <TabsContent value="csv_history" className='mt-8 w-full h-full justify-center'>
          
            <CsvUploadContent />
          
          </TabsContent>
          <TabsContent value="sendEmails" className='mt-8 w-full h-full justify-center'>
          
            <UploadComponent />
          
          </TabsContent>
          <TabsContent value="uploadcsv" className='mt-8 w-full h-full justify-center'>
          
           <UploadFiles />
          
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;