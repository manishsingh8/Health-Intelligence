import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate, formatAmount } from "@/utils/formate";
import Logo from "@/assets/icons/rp-logo-icon.svg";

const formatValue = (key: string, value: any) => {
  if (value === null || value === undefined) return "-";
  const lowerKey = key.toLowerCase();
  if (lowerKey.includes("date")) {
    return formatDate(value);
  }
  if (lowerKey.includes("amount") || lowerKey.includes("paid")) {
    return formatAmount(value);
  }
  return value;
};
interface DataModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: any;
  columns: any;
  loading: boolean;
  link?: string;
}

const DataModal = ({
  open,
  setOpen,
  modalData,
  columns,
  loading,
  link,
}: DataModalProps) => {
  console.log(modalData, "mdata");
  const rawDetails = modalData?.details;

  const extractedData = Array.isArray(rawDetails?.data)
    ? rawDetails.data
    : Array.isArray(rawDetails)
      ? rawDetails
      : rawDetails
        ? [rawDetails]
        : [];

  const data = extractedData[0] ?? null;
  const isEmptyData = extractedData.length === 0;

  const descriptionColumn = columns.find((c: any) => c.key === "description");
  const otherColumns = columns.filter((c: any) => c.key !== "description");
  console.log(modalData, "modalData");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          w-full
          max-w-[95vw]
          sm:max-w-[90vw]
          md:max-w-[80vw]
          lg:max-w-[75vw]
          xl:max-w-[65vw]
          2xl:max-w-[50vw]
          max-h-[90vh]
          flex
          flex-col
        "
      >
        <DialogHeader>
          <DialogTitle className="text-md">
            {modalData?.type
              ? `${modalData.type
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str: string) => str.toUpperCase())} Details`
              : "Details"}
          </DialogTitle>
        </DialogHeader>
        {link ? (
          <div className="flex items-center justify-center text-md font-semibold">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              {link}
            </a>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto space-y-6">
          {loading && (
            <div className="flex items-center justify-center h-40 text-xl text-muted-foreground">
              <span className="flex items-center gap-2 text-gray-500">
                Loading...
                <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
              </span>
            </div>
          )}

          {!loading && isEmptyData && (
            <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
              No record found
            </div>
          )}
          {!loading && !isEmptyData && data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherColumns.map((column: any) => {
                  const value = data[column.key];
                  return (
                    <div key={column.key} className="space-y-2">
                      <label className="text-xs font-medium text-foreground">
                        {column.label}
                      </label>
                      <div className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground break-words">
                        {column.key === "fileName" && value ? (
                          <a
                            href={
                              modalData?.type === "Remmitance"
                                ? `https://api.revpulseapp.com/claim-service/api/varianceQueue/downloadRemitFile?transactionNo=${data?.transactionNo}`
                                : value
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {value}
                          </a>
                        ) : (
                          formatValue(column.key, value)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {descriptionColumn && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">
                    {descriptionColumn.label}
                  </label>
                  <div className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground whitespace-pre-wrap">
                    {data.description || "-"}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataModal;
