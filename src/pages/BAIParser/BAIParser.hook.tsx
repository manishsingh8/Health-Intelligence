import { useState } from "react";
import { showToast } from "@/lib/toast";
import { API_ENDPOINTS } from "@/config/api";

export const useBAIParserLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleProcess = async (file: File) => {
    // Extra safety check
    if (!file.name.endsWith(".xlsx")) {
      showToast({
        message: "Only .xlsx files are allowed",
        severity: "error",
        id: "file-format-error",
      });
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("files", file);
      const res = await fetch(API_ENDPOINTS.BAI_PARSER, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      setIsSuccess(true);
      showToast({
        message: "File uploaded successfully",
        severity: "success",
        id: "pipeline-success",
      });
    } catch (error) {
      console.error("Pipeline error", error);

      showToast({
        message: "Failed to upload file. Please try again.",
        severity: "error",
        id: "pipeline-error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleProcess,
    isSuccess,
    isLoading,
  };
};
