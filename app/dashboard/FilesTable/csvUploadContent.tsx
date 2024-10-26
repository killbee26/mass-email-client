import { useEffect, useState } from "react";
import { DataTable } from "./FileTable"; // Adjust the path as necessary
import { fileColumns, UploadedFile } from "./column"; // Adjust the path as necessary
import { Card } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange'; // Adjust the import path as necessary

const CsvUploadContent = () => {
    const [data, setData] = useState<UploadedFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

    useEffect(() => {
        const fetchFiles = async () => {
            const token = localStorage.getItem("token");
            const query = new URLSearchParams();
            if (dateRange.from) query.append('startDate', dateRange.from.toISOString());
            if (dateRange.to) query.append('endDate', dateRange.to.toISOString());

            const response = await fetch(`http://localhost:5000/api/file/userFilesWithDate?${query.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fileData: UploadedFile[] = await response.json();
            console.log('Fetched Data:', fileData);
            const startDate = dateRange.from?.toISOString();
            const endDate  = dateRange.to?.toISOString();
            console.log(`Start Date: ${startDate}, End Date: ${endDate}`);

            setData(fileData);
            setLoading(false);
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
