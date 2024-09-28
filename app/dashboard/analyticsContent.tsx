import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ChartComponent from '@/components/ui/ChartComponent';
import BarChartComponent from '@/components/ui/BarChartComponent';

const AnalyticsContent = () => {
  return (
    <>
      {/* Dashboard Cards */}
      <div className="flex flex-wrap gap-6 mb-6 w-full h-full">
        <Card>
          <CardHeader>
            <CardTitle>Emails Sent!!</CardTitle>
            <CardDescription>The no. of emails sent uptil now</CardDescription>
          </CardHeader>
        </Card>
        
      </div>

      {/* Chart */}
      <h3 className="text-2xl font-bold mb-4">Overview</h3>
      <div className="flex gap-4">
       
        <div className="w-[400px]">
          <BarChartComponent />
        </div>
      </div>
      
    </>
  );
};

export default AnalyticsContent;
