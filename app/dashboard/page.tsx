// pages/dashboard.tsx
'use client';
import DashNavbar from '@/components/ui/DashNavbar';
import DashboardCard from '@/components/ui/DashboardCard';
import ChartComponent from '@/components/ui/ChartComponent';
import AnalyticsContent from './analyticsContent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Analytics");

  return (
    <div className="min-h-screen bg-black text-white">
      <DashNavbar/>
      <div className="p-6">
        <h2 className="text-4xl font-bold mb-6">Dashboard</h2>
        <Tabs defaultValue="Analytics" className="w-full">
          <TabsList className='bg-gray-900 '>
            <TabsTrigger 
              value="Analytics" 
              className={`${
                selectedTab === "Analytics" ? "bg-black text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("Analytics") }
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="csv_history" 
              className={`${
                selectedTab === "password" ? "bg-black text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("password")}
            >
              CSV's
            </TabsTrigger>
            <TabsTrigger 
              value="Upload CSV" 
              className={`${
                selectedTab === "Upload CSV" ? "bg-black text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("Upload CSV")}
            >
              Upload CSV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Analytics" className='mt-8 w-full h-full'>
            <AnalyticsContent />
          </TabsContent>
          <TabsContent value="csv_history">Change .</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
