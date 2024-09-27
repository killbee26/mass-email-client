import React from 'react';
import DashboardCard from '@/components/ui/DashboardCard';
import ChartComponent from '@/components/ui/ChartComponent';
import BarChartComponent from '@/components/ui/BarChartComponent';

const AnalyticsContent = () => {
  return (
    <>
      {/* Dashboard Cards */}
      <div className="flex flex-wrap gap-6 mb-6 w-full h-full">
        <DashboardCard title="Total Revenue" value="$45,231.89" description="+20.1% from last month" />
        <DashboardCard title="Subscriptions" value="+2350" description="+180.1% from last month" />
        <DashboardCard title="Sales" value="+12,234" description="+19% from last month" />
        <DashboardCard title="Active Now" value="+573" description="+201 since last hour" />
      </div>

      {/* Chart */}
      <h3 className="text-2xl font-bold mb-4">Overview</h3>
      <div className="flex gap-4">
        <div className="bg-gray-900 p-6 rounded-lg w-[500px]">
          <ChartComponent />
        </div>
        <div className="w-[400px]">
          <BarChartComponent />
        </div>
      </div>
      
    </>
  );
};

export default AnalyticsContent;
