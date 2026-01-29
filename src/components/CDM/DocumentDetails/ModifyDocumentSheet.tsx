import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { SplitManager } from "./SplitManager";
import { mockSplitData } from "@/constants/CDMData";

interface ModifyDocumentSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
}

export const ModifyDocumentSheet = ({
  open,
  onOpenChange,
  fileName,
}: ModifyDocumentSheetProps) => {
  const [activeTab, setActiveTab] = useState("original");
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [splits] = useState(mockSplitData);

  // Mock PDF URL - using a placeholder service or data URI if needed, used a sample online PDF for now
  // (In real app this would come from API)
  const pdfUrl = "https://pdfobject.com/pdf/sample.pdf";

  const getPdfUrl = (tab: string) => {
    // In a real app, different tabs might load different PDF URLs
    return `${pdfUrl}#page=${tab === "original" ? 1 : 1}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-none sm:max-w-none p-0 flex flex-col"
      >
        <SheetHeader className="px-6 py-4 border-b flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1">
            <SheetTitle>Document Split Review</SheetTitle>
            <p className="text-sm text-slate-500">{fileName}</p>
          </div>
          {/* Close button is automatically added by SheetContent, but we can customize if needed */}
        </SheetHeader>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0">
            {/* Toolbar */}
            <div className="px-6 py-2 border-b flex items-center justify-between bg-slate-50/50">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-auto"
              >
                <TabsList>
                  <TabsTrigger value="original">Original File</TabsTrigger>
                  {splits.map((split, index) => (
                    <TabsTrigger
                      key={split.letterId}
                      value={`split-${split.letterId}`}
                    >
                      Split File {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {!isSplitMode && (
                <Button
                  className="gap-2 bg-[#3A63D2] hover:bg-[#2E50B5]"
                  onClick={() => setIsSplitMode(true)}
                >
                  <Edit className="w-4 h-4" /> Update Split
                </Button>
              )}
            </div>

            {/* PDF Viewer Area */}
            <div className="flex-1 bg-slate-100 p-4 overflow-hidden relative">
              <iframe
                src={getPdfUrl(activeTab)}
                className="w-full h-full border rounded-lg shadow-sm bg-white"
                title="PDF Viewer"
              />
            </div>
          </div>

          {/* Split Manager Sidebar */}
          {isSplitMode && (
            <div className="w-[400px] border-l bg-white shadow-xl animate-in slide-in-from-right duration-300">
              <SplitManager
                onApply={() => {
                  // Handle apply logic
                  setIsSplitMode(false);
                  // You would update state here or call API
                }}
                onClose={() => setIsSplitMode(false)}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
