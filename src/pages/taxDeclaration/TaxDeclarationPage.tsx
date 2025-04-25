import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload } from "lucide-react";
import TaxDeclarationMenu from "./components/TaxDeclarationMenu";
import { useState } from "react";

export interface Artwork {
  artist: string;
  art: string;
}

// Add this helper function before your component
const generateRows = (count: number) => {
  const baseRows = [
    {
      taxType: "IQP-PIT-QUART PREPAY",
      status: "pending",
    },
    {
      taxType: "PAYE",
      status: "approved",
    },
    {
      taxType: "VAT-VALUE ADDED TAX",
      status: "rejected",
    },
    {
      taxType: "GAMING TAX",
      status: "pending",
    },
    {
      taxType: "WOP ON GOODS (15%)",
      status: "approved",
    },
  ];

  return Array.from({ length: count }, (_, index) => {
    const baseRow = baseRows[index % baseRows.length];
    const month = new Date(2023, index % 12, 1).toLocaleString("default", {
      month: "long",
    });

    return {
      slNo: index + 1,
      documentNo: `${43919934 + index}`,
      taxType: baseRow.taxType,
      taxPeriod: `01-${month}-2023 to 30-${month}-2023`,
      dueDate: `${15 + (index % 15)}-${month}-2023`,
      paymentDate: `${15 + (index % 15)}-${month}-2023`,
      decade: "NA",
      month: month,
      year: "2023",
      returnType: "Original",
      status: baseRow.status,
    };
  });
};

const TaxDeclarationPage = () => {
  const [open, setOpen] = useState(false);
  const headers = [
    { key: "slNo", display: "SL No." },
    { key: "documentNo", display: "Document No." },
    { key: "taxType", display: "Tax Type Description" },
    { key: "taxPeriod", display: "Tax Period" },
    { key: "dueDate", display: "Due Date" },
    { key: "paymentDate", display: "Payment DueDate" },
    { key: "decade", display: "Decade" },
    { key: "month", display: "Month" },
    { key: "year", display: "Year" },
    { key: "returnType", display: "Return Type" },
    { key: "status", display: "Status" },
  ];

  const rows = generateRows(60);

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">Tax Declaration</h1>
        </div>
        <div className="flex-1 flex items-center justify-center gap-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tax declarations..."
              className="pl-10 h-10  rounded-lg shadow-none text-sm text-gray-600 
              placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary 
              hover:border-gray-300 transition-colors"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="cursor-pointer text-white"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4 " />
            Enter Declaration
          </Button>
          <Button className="cursor-pointer text-white">
            <Upload className="h-4 w-4 " />
            Upload Annexures
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <DataTable headers={headers} rows={rows} />
        <TaxDeclarationMenu open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default TaxDeclarationPage;
