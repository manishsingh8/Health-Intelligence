import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, subDays } from "date-fns";
import { setPayload, setLetterListTableData } from "@/redux/slices/cdmSlice";
import type { RootState } from "@/redux/store";
import { COOKED_CDM_DATA } from "@/constants/CDMData";
import { API_ENDPOINTS } from "@/config/api";

export interface CDMDocument {
  id: string;
  splitFileName: string;
  classification: string;
  payer: string;
  assignee: string;
  batchDate: string;
  processedDate: string;
  tags: string[];
  status: string;
}

export const useCDMDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payloadData, letterListTableData } = useSelector(
    (state: RootState) => state.cdm,
  );

  const [bulkAssignDialogOpen, setBulkAssignDialogOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // Fetch Logic
  const fetchData = async (payload: any) => {
    console.log("Simulating fetch with payload:", payload);
    // Simple simulation delay
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  useEffect(() => {
    let initialPayload = { ...payloadData };
    if (!initialPayload.fromDate) {
      const today = new Date();
      const yesterday = subDays(today, 1);
      initialPayload = {
        ...initialPayload,
        fromDate: format(yesterday, "MM-dd-yyyy"),
        toDate: format(today, "MM-dd-yyyy"),
      };
      dispatch(setPayload(initialPayload));
    }

    // Inject cooked data for demonstration
    dispatch(setLetterListTableData(COOKED_CDM_DATA as CDMDocument[]));

    // Original fetch logic commented out for "cooked data" usage
    // fetchData(initialPayload);
  }, []);

  const handleRowSelect = (id: string | number) => {
    const newSelection = { ...rowSelection };
    if (newSelection[String(id)]) {
      delete newSelection[String(id)];
    } else {
      newSelection[String(id)] = true;
    }
    setRowSelection(newSelection);
  };

  const handleSelectAll = () => {
    if (Object.keys(rowSelection).length === letterListTableData.length) {
      setRowSelection({});
    } else {
      const allSelected: Record<string, boolean> = {};
      letterListTableData.forEach((row) => {
        allSelected[String(row.id)] = true;
      });
      setRowSelection(allSelected);
    }
  };

  const fetchCDMFilters = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.CLAIM_FILTERS, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch CDM filters");
      }
      const data = await res.json();
      console.log("CDM Filters:", data);
      // Optional: dispatch to redux if needed
      // dispatch(setCDMFilters(data));
    } catch (error) {
      console.error("Error fetching CDM filters:", error);
    }
  };
  useEffect(() => {
    fetchCDMFilters();
  }, []);

  return {
    dispatch,
    navigate,
    payloadData,
    letterListTableData,
    bulkAssignDialogOpen,
    setBulkAssignDialogOpen,
    rowSelection,
    fetchData,
    handleRowSelect,
    handleSelectAll,
  };
};
