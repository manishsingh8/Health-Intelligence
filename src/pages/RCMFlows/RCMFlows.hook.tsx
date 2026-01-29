import { useState, useEffect } from "react";

export const useRCMFlowsLogic = () => {
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("activetab") || "rcm"
  );
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("1week");
  useEffect(() => {
    sessionStorage.setItem("activetab", activeTab);
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    open,
    setOpen,
    selectedRange,
    setSelectedRange
  };
};
