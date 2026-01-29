import { useState, useRef } from "react";
import { Upload, Zap, Bot } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/assets/icons/rp-logo-icon.svg";
import { RemitAnalysisView } from "./RemittanceAnalysisView";

export default function RemittanceProcessing() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [remitData, setRemitData] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const selectedFile = e.target.files[0];
    const name = selectedFile.name.toLowerCase();
    const valid = [".835", ".eob", ".edi", ".txt"];

    if (!valid.some((ext) => name.endsWith(ext))) {
      toast({
        title: "Invalid File Format",
        description: "Upload a valid .835 or .eob file.",
        variant: "destructive",
      });
      e.target.value = "";
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setIsProcessed(false);
    setRemitData(null);
  };

  const handleProcess = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a remittance file.",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append("eraFile", file);
      const response = await fetch(
        "https://ibdk93jyg0.execute-api.us-east-1.amazonaws.com/Prod/upload",
        { method: "POST", body: formData }
      );
      if (!response.ok) throw new Error("Failed to process file");
      const data = await response.json();
      setRemitData(data);
      setIsProcessed(true);
      setIsProcessing(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Processing Failed",
        description: "Unable to process file. Try again later.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 rounded-[14px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          Smart Remittance Assistant
        </div>
        <div className="text-sm text-[#737373]">
          Upload ERA/EOB files to analyze payments and adjustments.
        </div>
      </div>
      <div>
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-4 space-y-8 border-r border-slate-100 bg-white">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    ERA/EOB File
                  </label>
                  <div>Upload remittance file (.835, .eob)</div>
                  <div
                    className="flex items-center w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 cursor-pointer hover:bg-slate-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <button className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-xs mr-3">
                      Choose File
                    </button>
                    <span className="text-slate-600 truncate flex-1">
                      {file ? file.name : "No file chosen"}
                    </span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".835,.eob,.txt,.edi"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <Button
                  className="w-full md:w-auto bg-[#249563] hover:bg-[#249563] text-white font-medium"
                  size="lg"
                  onClick={handleProcess}
                  disabled={isProcessing || !file}
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Process Remittance File
                    </>
                  )}
                </Button>
              </div>
              <div className="p-8 bg-slate-50/50 flex flex-col justify-center min-h-[300px]">
                {!isProcessed ? (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center">
                    {isProcessing ? (
                      <img
                        src={Logo}
                        className="w-7 h-8 animate-spin mx-auto"
                      />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium">
                          Upload a remittance file
                        </h3>
                        <p className="text-sm text-slate-500">
                          The system will analyze the data.
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Bot className="w-24 h-24 text-blue-600" />
                    </div>

                    <div className="relative space-y-4">
                      <div className="flex items-center gap-2 text-blue-700 font-semibold">
                        <Zap className="w-5 h-5" />
                        Workflow Suggestion
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase text-slate-500">
                          Suggested Action
                        </span>
                        <div className="font-medium text-slate-900 text-lg">
                          {remitData?.result?.workflow?.suggestedAction ||
                            "N/A"}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold uppercase text-slate-500">
                          Review Priority
                        </span>

                        <div className="w-full bg-slate-200 rounded-full h-8 flex items-center justify-center text-sm mt-1">
                          {remitData?.result?.workflow?.reviewPriority || "Low"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {isProcessed && remitData && (
          <div className="mt-6">
            <RemitAnalysisView data={remitData} />
          </div>
        )}
      </div>
    </div>
  );
}
