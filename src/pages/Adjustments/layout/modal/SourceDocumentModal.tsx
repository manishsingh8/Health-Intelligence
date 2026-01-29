import { useState } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { Button } from "@/components/ui/Button";
import { Eye } from "lucide-react";

export const SourceDocumentModal = ({ onClose }: { onClose: () => void }) => {
  const [view, setView] = useState<"parsed" | "raw">("parsed");

  return (
    <ModalWrapper title="Source Document: tx-1" onClose={onClose}>
      {/* Toggle */}
      <div className="flex items-center gap-4 mb-3 text-sm">
        <button
          onClick={() => setView("parsed")}
          className={`flex items-center gap-1 font-medium ${
            view === "parsed" ? "text-[#249563]" : "text-muted-foreground"
          }`}
        >
          <Eye className="h-4 w-4" />
          Parsed
        </button>

        <button
          onClick={() => setView("raw")}
          className={`flex items-center gap-1 font-medium ${
            view === "raw" ? "text-[#249563]" : "text-muted-foreground"
          }`}
        >
          &lt;&gt; Raw
        </button>
      </div>

      {/* Content */}
      <div className="h-80 overflow-auto border rounded p-3 text-sm bg-muted/30">
        {view === "parsed" ? (
          <>
            <p className="font-medium mb-2">EDI 837 Claim Data</p>
            <p>Payer: Unknown Payer</p>
            <p>Payee: General Hospital</p>
          </>
        ) : (
          <pre className="whitespace-pre-wrap text-xs">
            {`ISA*00*          *00*          *ZZ*SENDERID       *ZZ*RECEIVERID     *200101*1253*^*00501*000000905*0*T*:~
GS*HC*SENDER*RECEIVER*20200101*1253*1*X*005010X222A1~
ST*837*0001*005010X222A1~`}
          </pre>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 text-right">
        <Button onClick={onClose} variant="outline" data-testid="button-edit">
          Close
        </Button>
      </div>
    </ModalWrapper>
  );
};
