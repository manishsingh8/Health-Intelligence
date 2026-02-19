import { useCallback, useEffect, useMemo, useState } from "react";
import { buildKpiCards } from "@/constants/RCMDashboardData";
import { API_ENDPOINTS } from "@/config/api";
import { postRequest } from "@/utils/postRequest";
import { type BackendKpi } from "@/constants/RCMDashboardData";
// import { type BarSegmentConfig } from "@/components/CustomBarChart/CustomBarChart";
// import { showToast } from "@/lib/toast";
import { validateDateRange } from "@/utils/dateRangeValidator";
// interface WorkQueueBarChartData {
//   title?: string;
//   description?: string;
//   data: any;
//   segments?: BarSegmentConfig[];
// }

export default function useRCMDashboard() {
  const [operationalMetrics, setOperationalMetrics] = useState<BackendKpi[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  // const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState("2025-10-01");
  const [to, setTo] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [dateFilter, setDateFilter] = useState("custom");
  const [customDate, setCustomDate] = useState(false);
  const [dateFilterText, setDateFilterText] = useState(
    "Showing records for today.",
  );
  // const [workQueueData, setWorkQueueData] =
  //   useState<WorkQueueBarChartData | null>(null);
  // const [operationalViewData, setOperationalViewData] = useState<any | null>(
  //   null,
  // );

  const kpiCards = useMemo(() => {
    return buildKpiCards(operationalMetrics);
  }, [operationalMetrics]);

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

  const fetchRcmDashboardData = async () => {
    if (!validateDateRange({ from, to })) return;

    const payload = {
      fromDate: from,
      toDate: to,
    };

    try {
      setLoading(true);
      const [revenueRes] = await Promise.allSettled([
        postRequest(API_ENDPOINTS.REVENUE_WIDGETS, payload),
        // postRequest(API_ENDPOINTS.WORK_QUEUE_ACTIVITY, payload),
        // postRequest(API_ENDPOINTS.OPERATIONAL_PERFORMANCE_VIEW, payload),
      ]);

      if (revenueRes.status === "fulfilled") {
        setOperationalMetrics(revenueRes.value.data);
      }

      // if (workQueueRes.status === "fulfilled") {
      //   const data = workQueueRes.value?.data;

      //   if (!data || data.length === 0) {
      //     setWorkQueueData(null);
      //     showToast({
      //       message: "No work queue activity found",
      //       severity: "info",
      //       id: "workqueue-empty",
      //     });
      //   } else {
      //     setWorkQueueData(data);
      //   }
      // } else {
      //   setWorkQueueData(null);

      //   showToast({
      //     message: "Failed to fetch work queue activity",
      //     severity: "error",
      //     id: "workqueue-error",
      //   });
      // }

      // if (operationalRes.status === "fulfilled") {
      //   setOperationalViewData(operationalRes.value);
      // }
    } catch (error) {
      console.error("Widget fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRcmDashboardData();
  }, [from, to]);

  return {
    operationalMetrics,
    kpiCards,
    loading,
    error,
    from,
    setFrom,
    to,
    setTo,
    handleDateOptionChange,
    dateFilter,
    customDate,
    dateFilterText,
    // workQueueData,
    // operationalViewData,
  };
}
