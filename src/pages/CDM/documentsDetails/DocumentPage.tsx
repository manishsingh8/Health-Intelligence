import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Separator } from "@/components/ui/Separator";
import { HorizontalStepper } from "@/components/CDM/DocumentDetails/HorizontalStepper";
import { FileLevelMetaData } from "@/components/CDM/DocumentDetails/FileLevelMetaData";
import { ModifyDocumentSheet } from "@/components/CDM/DocumentDetails/ModifyDocumentSheet";
import { PatientLevelData } from "@/components/CDM/DocumentDetails/PatientLevelData";
import {
  mockFileLevelData,
  documentSteps,
} from "@/constants/CDMData";

export default function DocumentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("file-metadata");
  const [isModifySheetOpen, setIsModifySheetOpen] = useState(false);

  // In a real app, fetch data based on `id`
  const fileData = { ...mockFileLevelData, id: id || mockFileLevelData.id };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Breadcrumbs */}
      <div className="px-6 py-4 flex items-center gap-2 text-sm text-slate-500">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto hover:bg-transparent text-slate-500"
          onClick={() => navigate("/cdm")}
        >
          Correspondence Document Manager
        </Button>
        <ChevronRight className="w-4 h-4" />
        <div className="flex items-center gap-2 font-medium text-slate-900">
          <FileText className="w-4 h-4" />
          <span className="truncate max-w-[200px]">{fileData.fileName}</span>
        </div>
      </div>

      <Separator />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Header / Stepper */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <HorizontalStepper steps={documentSteps} currentStepIndex={3} />
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full space-y-6"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <TabsList className=" h-auto">
                <TabsTrigger value="file-metadata" className="">
                  File-level MetaData
                </TabsTrigger>
                <TabsTrigger value="patient-data">Patient-level Data</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModifySheetOpen(true)}
                  className="text-slate-600"
                >
                  <FileText className="w-4 h-4 mr-2" /> Modify Document
                </Button>
              </div>
            </div>

            <TabsContent value="file-metadata" className="m-0 pt-2">
              <FileLevelMetaData data={fileData} />
            </TabsContent>
            <TabsContent value="patient-data" className="m-0 pt-2">
              <PatientLevelData />
            </TabsContent>
          </Tabs>
        </div>

        <ModifyDocumentSheet
          open={isModifySheetOpen}
          onOpenChange={setIsModifySheetOpen}
          fileName={fileData.fileName}
        />
      </div>
    </div>
  );
}
