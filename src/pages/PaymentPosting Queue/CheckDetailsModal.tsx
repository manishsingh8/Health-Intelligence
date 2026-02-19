import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Logo from "@/assets/icons/rp-logo-icon.svg";
import { openRemitPdfByTransactionNo } from "@/utils/remitFile";
import { useMemo, useState } from "react";

type CheckDetailRow = {
  patientName?: string;
  chart?: string;
  visit?: string;
  dos?: string;
  paymentAmount?: string | number;
  insBalance?: string | number;
  remarks?: string;
  postedScenario?: string;
  status?: string;
  transactionNo?: string;
  [key: string]: unknown;
};

interface CheckDetailsModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: { details?: unknown } | null;
  loading: boolean;
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const normalizeRows = (details: unknown): CheckDetailRow[] => {
  if (isRecord(details) && Array.isArray(details.data)) {
    return details.data.filter(isRecord) as CheckDetailRow[];
  }
  if (Array.isArray(details)) {
    return details.filter(isRecord) as CheckDetailRow[];
  }
  if (isRecord(details)) return [details as CheckDetailRow];
  return [];
};

const CheckDetailsModal = ({
  open,
  setOpen,
  modalData,
  loading,
}: CheckDetailsModalProps) => {
  const [isRemitFileDownloading, setIsRemitFileDownloading] = useState(false);

  const rows = useMemo(() => normalizeRows(modalData?.details), [modalData]);

  const row = rows?.[0] ?? null;
  const transactionNo = row?.transactionNo;

  const handleTransactionClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    if (isRemitFileDownloading) return;

    setIsRemitFileDownloading(true);
    try {
      await openRemitPdfByTransactionNo(transactionNo);
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
          2xl:max-w-[60vw]
          max-h-[90vh]
          flex
          flex-col
        "
      >
        <DialogHeader>
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="justify-self-start">
              <DialogTitle className="text-md">Check Details</DialogTitle>
            </div>

            <div className="justify-self-center text-sm font-semibold">
              ERA:{" "}
              <a
                href="#"
                onClick={handleTransactionClick}
                className={`text-[#0090FF] hover:underline ${
                  isRemitFileDownloading ? "pointer-events-none opacity-60" : ""
                }`}
              >
                {isRemitFileDownloading ? (
                  <span className="inline-flex items-center gap-2 text-gray-500">
                    <img
                      src={Logo}
                      className="w-4 h-4 animate-spin"
                      alt="logo"
                    />
                  </span>
                ) : (
                  (transactionNo ?? "-")
                )}
              </a>
            </div>

            <div className="justify-self-end" />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-xl text-muted-foreground">
              <span className="flex items-center gap-2 text-gray-500">
                Loading...
                <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
              </span>
            </div>
          ) : !row ? (
            <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
              No record found
            </div>
          ) : (
            <div className="border border-[#E6ECF0] rounded-[10px] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#DDE9F7] text-[#0A0A0A]">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Patient Name</th>
                    <th className="px-3 py-2 font-semibold">Chart #</th>
                    <th className="px-3 py-2 font-semibold">Visit #</th>
                    <th className="px-3 py-2 font-semibold">DOS</th>
                    <th className="px-3 py-2 font-semibold">Payment Amount</th>
                    <th className="px-3 py-2 font-semibold">Ins Balance</th>
                    <th className="px-3 py-2 font-semibold">Remarks</th>
                    <th className="px-3 py-2 font-semibold">
                      Posting Scenario
                    </th>
                    <th className="px-3 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-t border-[#E6ECF0]">
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.patientName ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.chart ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.visit ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.dos ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.paymentAmount ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.insBalance ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.remarks ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.postedScenario ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-[#4B5563]">
                      {row?.status ?? "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckDetailsModal;
