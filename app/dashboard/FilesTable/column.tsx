import { ColumnDef } from "@tanstack/react-table"
import { info } from "console";

// Define the shape of your data
export type UploadedFile = {
  fileName: string;
  createdAt: string; // or Date, depending on your implementation
  fileURL: string;
  fileID: string
}

// Define your columns
export const fileColumns: ColumnDef<UploadedFile>[] = [
  {
    accessorKey: "fileName",
    header: () => <div className="ml-2">File Name</div>,
    cell: (info) => <div className="ml-2 font-medium">{info.getValue() as String}</div>
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="">Uploaded At</div>,
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "fileURL",
    header: "Download",
    cell: (info) => (
      <a href={info.getValue() as string | undefined} download>
        <button className="px-3 py-2 bg-primary font-bold text-muted rounded">
          Download
        </button>
      </a>
    ),
  },
];
