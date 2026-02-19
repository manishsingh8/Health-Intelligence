import KpiCard from "@/components/KpiCard/KpiCard";
import { AreaChart } from "lucide-react";
import useRCMDashboard from "./RCMDashboard.hook";
//import OperationalView from "@/components/OperationalView/OperationalView";
import Loader from "@/components/Loader/Loader";
// import CustomBarChart from "@/components/CustomBarChart/CustomBarChart";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { CustomDropdown } from "@/components";
import { Toaster } from "@/components/Toaster/Toaster";
import RCMchart from "@/pages/RCMDashboard/RCMchart";

export type DateFilterValue = "today" | "lastMonth" | "custom";
const DATE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "lastMonth", label: "Last Month" },
  { value: "custom", label: "Custom" },
];

const RCMDashboard = () => {
  const {
    kpiCards,
    loading,
    from,
    setFrom,
    to,
    setTo,
    handleDateOptionChange,
    dateFilter,
    dateFilterText,
    // workQueueData,
    // operationalViewData,
  } = useRCMDashboard();
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px]">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          <AreaChart className="mr-3 h-6 w-6 mb-2 text-primary inline-block" />
          Revenue Cycle Intelligence Dashboard
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">
            Monitor team productivity, work queue health, and overall RCM
            performance.
          </span>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {kpiCards?.map((c) => (
            <KpiCard
              key={c.title}
              title={c.title}
              value={c.value}
              description={c.description}
              iconName={c.iconName}
              trend={c.trend}
            />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between border border-[#E6ECF0] p-1 rounded-[14px] px-3 py-4 flex-wrap">
        <div className="font-semibold">{dateFilterText}</div>
        <div className="flex items-center flex-wrap">
          {dateFilter === "custom" ? (
            <FilterSearchBar
              enableDateRange
              fromDate={from}
              toDate={to}
              onFromDateChange={setFrom}
              onToDateChange={setTo}
            />
          ) : (
            ""
          )}
          <div>
            <CustomDropdown
              options={DATE_OPTIONS}
              value={dateFilter}
              onChange={handleDateOptionChange}
            />
          </div>
        </div>
      </div>
      {/* {loading ? <Loader /> : <OperationalView data={operationalViewData} />} */}
      <RCMchart />

      {/* <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <Loader />
        ) : (
          <CustomBarChart
            title={workQueueData?.title}
            description={workQueueData?.description}
            data={workQueueData?.data}
            xKey="date"
            segments={workQueueData?.segments}
            barSize={30}
          />
        )}
        <WorkQueueVolumeChart />
      </div> */}
      <Toaster />
    </div>
  );
};

export default RCMDashboard;
