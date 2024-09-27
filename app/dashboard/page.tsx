// pages/dashboard.tsx
'use client';
import DashNavbar from '@/components/ui/DashNavbar';
import DashboardCard from '@/components/ui/DashboardCard';
import ChartComponent from '@/components/ui/ChartComponent';
import AnalyticsContent from './analyticsContent';
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect,useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Analytics");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/protected', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    fetchData();
  }, [router]);

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <h2 className="text-2xl">Loading...</h2> {/* You can replace this with a spinner or loading animation */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DashNavbar />
      <div className="p-6">
        <h2 className="text-4xl font-bold mb-6">User Dashboard</h2>
        <Tabs defaultValue="Analytics" className="w-full">
          <TabsList className='bg-gray-900 '>
            <TabsTrigger 
              value="Analytics" 
              className={`${
                selectedTab === "Analytics" ? "bg-black text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("Analytics")}
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="csv_history" 
              className={`${
                selectedTab === "csv_history" ? "bg-black text-white" : "bg-transparent text-gray-400"
              } border-b-2 border-transparent`} 
              onClick={() => setSelectedTab("csv_history")}
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