import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, string, z } from "zod";

const formSchema = object({
  type: string({
    required_error: "Please select a declaration type",
  }),
  year: string({
    required_error: "Please select a year",
  }),
  taxType: string({
    required_error: "Please select a tax type",
  }),
});

interface TaxDeclarationMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit?: (data: z.infer<typeof formSchema>) => Promise<void>;
}

const TaxDeclarationMenu = ({
  open,
  setOpen,
  onSubmit,
}: TaxDeclarationMenuProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "original",
      year: "2025",
      taxType: "vat",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit?.(values);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div
        className={`${open ? "fixed inset-0 z-50  backdrop-blur-xs" : ""}`}
      />
      <AlertDialogContent className="sm:max-w-[450px] ">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">
              New Tax Declaration
            </span>
            <XCircle
              onClick={() => setOpen(false)}
              className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
            />
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="mx-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Declaration Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-10">
                          {" "}
                          {/* Added full width and height */}
                          <SelectValue placeholder="Select declaration type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="original">Original</SelectItem>
                        <SelectItem value="amended">Amended</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tax Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-10">
                          {" "}
                          {/* Added full width and height */}
                          <SelectValue placeholder="Select tax year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[2025, 2024, 2023, 2022].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tax Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-10">
                          {" "}
                          {/* Added full width and height */}
                          <SelectValue placeholder="Select tax type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="vat">VAT</SelectItem>
                        <SelectItem value="income">Income Tax</SelectItem>
                        <SelectItem value="corporate">Corporate Tax</SelectItem>
                        <SelectItem value="payroll">Payroll Tax</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaxDeclarationMenu;
