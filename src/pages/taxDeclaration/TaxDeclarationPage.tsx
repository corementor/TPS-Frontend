import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload } from "lucide-react";

const TaxDeclarationPage = () => {
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

  const rows = [
    {
      slNo: 1,
      documentNo: "43919934",
      taxType: "IQP-PIT-QUART PREPAY",
      taxPeriod: "01-Apr-2023 to 30-Jun-2023",
      dueDate: "30-Jun-2023",
      paymentDate: "30-Jun-2023",
      decade: "NA",
      month: "June",
      year: "2023",
      returnType: "Original",
      status: "pending",
    },
    {
      slNo: 2,
      documentNo: "44105719",
      taxType: "PAYE",
      taxPeriod: "01-Jul-2023 to 31-Jul-2023",
      dueDate: "16-Aug-2023",
      paymentDate: "16-Aug-2023",
      decade: "NA",
      month: "July",
      year: "2023",
      returnType: "Original",
      status: "approved",
    },
    {
      slNo: 3,
      documentNo: "44379029",
      taxType: "VAT-VALUE ADDED TAX",
      taxPeriod: "01-Sep-2023 to 30-Sep-2023",
      dueDate: "16-Oct-2023",
      paymentDate: "16-Oct-2023",
      decade: "NA",
      month: "September",
      year: "2023",
      returnType: "Original",
      status: "rejected",
    },
    {
      slNo: 4,
      documentNo: "44627931",
      taxType: "GAMING TAX",
      taxPeriod: "01-Nov-2023 to 30-Nov-2023",
      dueDate: "15-Dec-2023",
      paymentDate: "15-Dec-2023",
      decade: "NA",
      month: "November",
      year: "2023",
      returnType: "Original",
      status: "pending",
    },
    {
      slNo: 5,
      documentNo: "45344428",
      taxType: "WOP ON GOODS (15%)",
      taxPeriod: "01-Jul-2023 to 31-Jul-2023",
      dueDate: "16-Aug-2023",
      paymentDate: "16-Aug-2023",
      decade: "NA",
      month: "July",
      year: "2023",
      returnType: "Original",
      status: "approved",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">Tax Declaration</h1>
          {/* <p className="mt-4 text-gray-600 text-sm">
            This is the tax declaration page. Here you can manage your
            tax-related documents and information.
          </p> */}
        </div>
        <div className="flex-1 flex items-center justify-center gap-4 ">
          <div className="relative w-96">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 w-full h-9 bg-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="cursor-pointer">
            <Plus className="h-4 w-4 " />
            Enter Declaration
          </Button>
          <Button className="cursor-pointer">
            <Upload className="h-4 w-4 " />
           Upload Annexures
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <DataTable headers={headers} rows={rows} />
      </div>
    </div>
  );
};

export default TaxDeclarationPage;
