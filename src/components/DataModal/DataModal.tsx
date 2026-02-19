import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { formatDate, formatAmount } from "@/utils/formate";
import Logo from "@/assets/icons/rp-logo-icon.svg";
import { showToast } from "@/lib/toast";
import { openRemitPdfByTransactionNo } from "@/utils/remitFile";
import ReactMarkdown from "react-markdown";

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
  const [isRemitFileDownloading, setIsRemitFileDownloading] = useState(false);
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

  const handleRemitFileClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();

    if (isRemitFileDownloading) return;

    const transactionNo = data?.transactionNo;
    setIsRemitFileDownloading(true);
    try {
      await openRemitPdfByTransactionNo(transactionNo);
    } catch (error) {
      console.error(error);
      showToast({
        message: "Unable to download file",
        severity: "error",
      });
    } finally {
      setIsRemitFileDownloading(false);
    }
  };

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
            ERA:
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
                          modalData?.type === "Bank Deposit" ? (
                            <span>{value}</span>
                          ) : (
                            <a
                              href={
                                modalData?.type === "Remmitance" ? "#" : value
                              }
                              target={
                                modalData?.type === "Remmitance"
                                  ? undefined
                                  : "_blank"
                              }
                              rel={
                                modalData?.type === "Remmitance"
                                  ? undefined
                                  : "noopener noreferrer"
                              }
                              onClick={
                                modalData?.type === "Remmitance"
                                  ? handleRemitFileClick
                                  : undefined
                              }
                              className={
                                modalData?.type === "Remmitance"
                                  ? `text-blue-600 hover:text-blue-800 underline ${
                                      isRemitFileDownloading
                                        ? "pointer-events-none opacity-60"
                                        : ""
                                    }`
                                  : "text-blue-600 hover:text-blue-800 underline"
                              }
                            >
                              {isRemitFileDownloading &&
                              modalData?.type === "Remmitance" ? (
                                <div className="flex items-center justify-center">
                                  <span className="flex items-center gap-2 text-gray-500">
                                    <img
                                      src={Logo}
                                      className="w-5 h-6 animate-spin"
                                      alt="logo"
                                    />
                                  </span>
                                </div>
                              ) : (
                                value
                              )}
                            </a>
                          )
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

              {modalData?.type === "Remmitance" && data?.llmInsights && (
                <div className="space-y-2 w-full">
                  <label className="text-sm font-semibold text-foreground">
                    AI Insights
                  </label>
                  <div className="w-full rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground prose prose-sm max-w-none prose-headings:text-foreground prose-h2:text-base prose-h3:text-sm prose-strong:text-foreground prose-li:text-foreground prose-p:text-foreground">
                    <ReactMarkdown>{data?.llmInsights}</ReactMarkdown>
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
