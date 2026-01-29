import { useState } from "react";

type StageStatus = "idle" | "processing" | "completed";

export const useEOBLogic = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAccordion, setShowAccordion] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<any>(null);

  // ⭐ Single clean state for all stage statuses
  const [stageStatus, setStageStatus] = useState({
    stage1: "idle" as StageStatus,
    stage2: "idle" as StageStatus,
    stage3: "idle" as StageStatus,
    stage4: "idle" as StageStatus,
  });

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files?.[0];
    if (pdfFile) {
      setFile(pdfFile);
      setPdfUrl(URL.createObjectURL(pdfFile));
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
  };

  const clearFile = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);

    setFile(null);
    setPdfUrl(null);
    setNumPages(null);
    setPipelineResult(null);
    setShowAccordion(false);
    setStageStatus({
      stage1: "idle",
      stage2: "idle",
      stage3: "idle",
      stage4: "idle",
    });
  };

  const runStageAnimation = async () => {
    setStageStatus({
      stage1: "processing",
      stage2: "idle",
      stage3: "idle",
      stage4: "idle",
    });

    await wait(2000);
    setStageStatus((s) => ({
      ...s,
      stage1: "completed",
      stage2: "processing",
    }));

    await wait(2000);
    setStageStatus((s) => ({
      ...s,
      stage2: "completed",
      stage3: "processing",
    }));

    await wait(2000);
    setStageStatus((s) => ({
      ...s,
      stage3: "completed",
      stage4: "processing",
    }));

    await wait(2000);
    setStageStatus((s) => ({ ...s, stage4: "completed" }));
  };
  const handleStartPipeline = async () => {
    if (!file) return;

    setIsLoading(true);
    setShowAccordion(true);
    setPipelineResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const splitRes = await fetch(
        "https://d3gjsnfpy4.execute-api.us-east-1.amazonaws.com/dev/split",
        { method: "POST", body: formData }
      );
      const splitData = await splitRes.json();

      if (!splitData?.data || splitData.data.length === 0) {
        throw new Error("Split API did not return page info");
      }
      const pipelineResults: any = {
        split: splitData.data,
        classify: [],
        extract: [],
      };

      for (const letter of splitData.data.letters) {
        const { start_page, end_page } = letter;

        const pageFormData = new FormData();
        pageFormData.append("file", file);
        pageFormData.append("start_page", start_page.toString());
        pageFormData.append("end_page", end_page.toString());
        const [classifyRes, extractRes] = await Promise.all([
          fetch(
            "https://d3gjsnfpy4.execute-api.us-east-1.amazonaws.com/dev/classify",
            { method: "POST", body: pageFormData }
          ),
          fetch(
            "https://d3gjsnfpy4.execute-api.us-east-1.amazonaws.com/dev/extract",
            { method: "POST", body: pageFormData }
          ),
        ]);

        const classifyData = await classifyRes.json();
        const extractData = await extractRes.json();

        pipelineResults.classify.push(classifyData?.data);
        pipelineResults.extract.push(extractData?.data);
      }

      setPipelineResult(pipelineResults);
      runStageAnimation();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    file,
    pdfUrl,
    numPages,
    isLoading,
    pipelineResult,
    stageStatus,
    handleStartPipeline,
    handleFileSelect,
    onDocumentLoadSuccess,
    onDocumentLoadError,
    clearFile,
    showAccordion,
  };
};
