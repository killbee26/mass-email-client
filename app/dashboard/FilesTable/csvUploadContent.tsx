import { useEffect, useState } from "react";
import { DataTable } from "./FileTable"; // Adjust the path as necessary
import { fileColumns, UploadedFile } from "./column"; // Adjust the path as necessary
import { Card } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange'; // Adjust the import path as necessary
import api from "@/app/utils/api";

const CsvUploadContent = () => {
    const [data, setData] = useState<UploadedFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

    useEffect(() => {
        const fetchFiles = async () => {
          try {
            // Construct query parameters for date range
            const queryParams = new URLSearchParams();
            if (dateRange.from) queryParams.append("startDate", dateRange.from.toISOString());
            if (dateRange.to) queryParams.append("endDate", dateRange.to.toISOString());
      
            // Send GET request with query params
            const response = await api.get(`/file/userFilesWithDate?${queryParams.toString()}`);
            
            // Extract file data from response
            const fileData: UploadedFile[] = response.data;
            console.log("Fetched Data:", fileData);
      
            // Log start and end dates for reference
            const startDate = dateRange.from?.toISOString();
            const endDate = dateRange.to?.toISOString();
            console.log(`Start Date: ${startDate}, End Date: ${endDate}`);
      
            // Update state with the fetched data
            setData(fileData);
          } catch (error) {
            console.error("Error fetching files:", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchFiles();
      }, [dateRange]);
      

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="bg-background p-4 mx-auto">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <DatePickerWithRange className="w-full md:w-1/2" setDate={(range) => setDateRange(range as { from?: Date; to?: Date })} />
    </div>
    <DataTable columns={fileColumns} data={data} />
</Card>

    );
};

export default CsvUploadContent;
