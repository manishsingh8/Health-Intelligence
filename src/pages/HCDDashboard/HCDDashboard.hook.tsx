import { useState, useCallback, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/api";
import { HCD_CARD_MAPPER } from "@/constants/ChartsData";
import { transformBarData } from "@/utils/transformBarChartData";

interface StatusOverviewResponse {
  totalDocumentsProcessed: number;
  autoClassificationAccuracy: string;
  documentsAwaitingReview: number;
  meanProcessingTime: string;
}
interface HCDBackendResponse {
  totalDocumentsProcessed: number;
  autoClassificationAccuracy: string;
  documentsAwaitingReview: number;
  meanProcessingTime: string;
}

interface DocumentIntelligenceResponse {
  [key: string]: any;
}

export const useHCDLogic = () => {
  const [from, setFrom] = useState("2025-10-01");
  const [to, setTo] = useState("2025-12-01");
  const [dateFilter, setDateFilter] = useState("custom");
  const [dateFilterText, setDateFilterText] = useState(
    "Showing records for today.",
  );
  const [customDate, setCustomDate] = useState(false);
  const [statusOverview, setStatusOverview] =
    useState<StatusOverviewResponse | null>(null);
  const [documentIntelligence, setDocumentIntelligence] =
    useState<DocumentIntelligenceResponse | null>(null);
  const [docChartData, setDocChartData] = useState<any[]>([]);
  const [volumeChartData, setVolumeChartData] = useState<any[]>([]);
  const [volumeSegments, setVolumeSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildHCDCards = (data: HCDBackendResponse) => {
    return HCD_CARD_MAPPER.map((card) => ({
      id: card.id,
      headerText: card.headerText,
      value: data[card.key as keyof HCDBackendResponse],
    }));
  };

  const handleDateOptionChange = useCallback((value: string) => {
    setDateFilter(value);
    setCustomDate(false);
    const today = new Date();
    const format = (d: Date) => d.toISOString().split("T")[0];

    if (value === "today") {
      const t = format(today);
      setFrom(t);
      setTo(t);
      setDateFilterText("Showing records for today.");
    }

    if (value === "lastMonth") {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      setFrom(format(start));
      setTo(format(end));
      setDateFilterText("Showing records from last month.");
    }

    if (value === "custom") {
      setCustomDate(true);
      setDateFilterText("Showing records for the selected date range.");
    }
  }, []);

  useEffect(() => {
    if (dateFilter === "custom" && from && to) {
      setDateFilterText(`Showing records from ${from} to ${to}.`);
    }
  }, [dateFilter, from, to]);

  const buildDateQuery = () =>
    new URLSearchParams({
      startDate: from,
      endDate: to,
    }).toString();

  const fetchHCDWidgets = async () => {
    if (!from || !to) return;
    const query = buildDateQuery();
    setLoading(true);
    try {
      const [docRes, volumeRes] = await Promise.all([
        fetch(`${API_ENDPOINTS.HCD_DOCUMENT_PROCESSING}?${query}`),
        fetch(`${API_ENDPOINTS.HCD_DAILY_PROCESSING_VOLUME}?${query}`),
      ]);
      const docData = await docRes.json();
      const volumeData = await volumeRes.json();
      setDocChartData(docData?.data);
      const volumeResult = transformBarData(volumeData?.data);
      setVolumeChartData(volumeResult?.chartData);
      setVolumeSegments(volumeResult?.segments);
    } catch (error) {
      console.error("HCD API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHCDPostWidgets = async () => {
    if (!from || !to) return;
    setLoading(true);
    setError(null);
    const query = buildDateQuery();
    try {
      const [statusOverviewResult, documentIntelligenceResult] =
        await Promise.allSettled([
          fetch(`${API_ENDPOINTS.HCD_DOCUMENT_STATUS_OVERVIEW}?${query}`, {
            method: "POST",
          }),
          fetch(`${API_ENDPOINTS.HCD_DOCUMENT_INTELLIGENCE}?${query}`, {
            method: "POST",
          }),
        ]);
      if (statusOverviewResult.status === "fulfilled") {
        const statusData = await statusOverviewResult?.value?.json();
        setStatusOverview(statusData?.data);
      } else {
        console.error(
          "Status overview API failed:",
          statusOverviewResult.reason,
        );
        setStatusOverview(null);
      }
      if (documentIntelligenceResult.status === "fulfilled") {
        const intelligenceData =
          await documentIntelligenceResult?.value?.json();
        const cardsArray = buildHCDCards(intelligenceData?.data);
        setDocumentIntelligence(cardsArray);
      } else {
        console.error(
          "Document intelligence API failed:",
          documentIntelligenceResult.reason,
        );
        setDocumentIntelligence(null);
      }
    } catch (err) {
      console.error("HCD dashboard error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHCDWidgets();
    fetchHCDPostWidgets();
  }, [from, to]);

  return {
    from,
    setFrom,
    to,
    setTo,
    dateFilterText,
    setDateFilterText,
    dateFilter,
    setDateFilter,
    handleDateOptionChange,
    customDate,
    statusOverview,
    documentIntelligence,
    loading,
    error,
    volumeChartData,
    volumeSegments,
    docChartData,
  };
};
