import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Edit,
  MoreVerticalIcon,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";

interface TableHeader {
  key: string;
  display: string;
}

interface TableProps {
  headers: TableHeader[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Record<string, any>[];
  width?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit?: (row: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (row: any) => void;
}

const DataTable: FC<TableProps> = ({
  headers = [],
  rows = [],
  width = "400px",
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = rows.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCellContent = (header: TableHeader, row: any) => {
    const value = row[header.key];

    switch (header.key) {
      case "status":
        return (
          <span
            className={`px-3 py-1 rounded-full ${
              value?.toLowerCase() === "active"
                ? "bg-green-100 text-green-800"
                : value?.toLowerCase() === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {value}
          </span>
        );
      case "amount":
        return (
          <span className="px-3 py-1 rounded-full bg-gray-100">
            {typeof value === "number" ? value.toFixed(2) : value}
          </span>
        );
      default:
        return value;
    }
  };

  return (
    <div className="space-y-4 ">
      <ScrollArea className={`w-[${width}] rounded-md border bg-white shadow-sm overflow-hidden`}>
   
        <Table className="min-w-full align-middle">
          <TableHeader className="bg-gray-100">
            <TableRow className="border-b border-gray-200 bg-gray-50">
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.display}
                </TableHead>
              ))}
              <TableHead className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={headers.length + 1}
                  className="h-32 text-center text-gray-500 bg-gray-50/50"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-medium">No results found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {headers.map((header, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100"
                    >
                      {renderCellContent(header, row)}
                    </TableCell>
                  ))}
                  <TableCell className="px-4 py-3 text-right border-b border-gray-100">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors"
                        >
                          <MoreVerticalIcon className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-40 shadow-lg"
                      >
                        {onEdit && (
                          <DropdownMenuItem
                            onClick={() => onEdit(row)}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem
                            onClick={() => onDelete(row)}
                            className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>


      <div className="flex items-center justify-between px-2 px-4 py-0 border-gray-200 ">
        <div className="flex items-center gap-3">
          <Label htmlFor="per-page" className="text-sm text-gray-500 font-medium"> Rows per page</Label>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(0);
            }}
          >
            <SelectTrigger className="h-8 w-[70px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 50].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="h-8 w-8 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500 font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
             className="h-8 w-8 p-0"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
            className="h-8 w-8 p-0"
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
