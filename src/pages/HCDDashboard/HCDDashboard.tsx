import PaymentCard from "@/components/PaymentCard/PaymentCard";
import CustomDoughnutChart from "@/components/CustomDoughnutChart/CustomDoughnutChart";
import CustomBarChart from "@/components/CustomBarChart/CustomBarChart";
import { AlertTriangle } from "lucide-react";
// import CustomAreaChart from "@/components/CustomAreaChart/CustomAreaChart";
import { CustomDropdown } from "@/components";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
// import {
// AVG_TIME_CHART_DATA,
// TOP_EXCEPTION_CHART_DATA,
// DAILY_DOCS_CHART_DATA,
// DOCUMENT_STATUS_CHART_DATA,
// DAILY_DOCS_SEGMENTS_DATA,
// agentData,
// processingTimeData,
// slaComplianceData,
// slaSegments,
// } from "@/constants/ChartsData";
import { useHCDLogic } from "./HCDDashboard.hook";
import Logo from "@/assets/icons/rp-logo-icon.svg";

const DATE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "lastMonth", label: "Last Month" },
  { value: "custom", label: "Custom" },
];

const Dashboard2 = () => {
  const {
    from,
    setFrom,
    to,
    setTo,
    dateFilterText,
    dateFilter,
    handleDateOptionChange,
    statusOverview,
    documentIntelligence,
    loading,
    // error,
    volumeChartData,
    volumeSegments,
    docChartData,
  } = useHCDLogic();
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px]">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Healthcare Correspondence Document Intelligence Dashboard
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">
            {" "}
            Healthcare Correspondence Document Intelligence Dashboard
          </span>
        </div>
      </div>
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
      <div className="flex lg:justify-between items-center flex-wrap gap-4">
        {loading ? (
          <div className="flex align-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
            <span className="flex items-center gap-2 text-gray-500">
              Loading...
              <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
            </span>
          </div>
        ) : (
          documentIntelligence?.map((card: any) => (
            <PaymentCard
              key={card?.id}
              headerText={card?.headerText}
              amount={card?.value}
              border
              borderColor="#E5E5E5"
              containerWidth="medium"
            />
          ))
        )}
      </div>
      {loading ? (
        <div className="flex align-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
          <span className="flex items-center gap-2 text-gray-500">
            Loading...
            <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-4">
            <CustomBarChart
              title="Document Processing Duration (min)"
              description="Processing duration trends across documents types."
              data={docChartData}
              xKey="classificationType"
              dataKey="processingTimeMin"
              color="#249563"
              barSize={40}
              tooltipLabel="Processing Time"
            />
            <CustomDoughnutChart
              title="Exception Category Overview"
              description="Categorization of to exception types in document workflows."
              icon={AlertTriangle}
              data={statusOverview}
              legendPosition="right"
              valueKey="percentage"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <CustomBarChart
              title="Daily Processing Volume by Category"
              description="Daily distribution of processed document types"
              data={volumeChartData}
              xKey="date"
              segments={volumeSegments}
              barSize={30}
            />
            {/* <CustomDoughnutChart
          title="Document Status Overview"
          description=""
          data={DOCUMENT_STATUS_CHART_DATA}
          legendPosition="right"
        /> */}
          </div>
        </>
      )}
      {/* <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-[50%]">
          <CustomBarChart
            title="Total Documents Processed per Agent (30 Days)"
            data={agentData}
            xKey="agentId"
            dataKey="completed"
            color="#249563"
            tooltipLabel="Completed Documents"
            xAxisLabel="Agent ID"
            yAxisLabel="Total Completed Documents"
          />
        </div>
        <div className="w-[50%]">
          <CustomBarChart
            title="Average Processing Time by Document Type"
            data={processingTimeData}
            xKey="documentType"
            dataKey="avgTime"
            color="#1D4ED8"
            tooltipLabel="Hours"
            xAxisLabel="Document Type"
            yAxisLabel="AVG Processing Time (Hours)"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full lg:w-[50%]">
          <CustomAreaChart
            title="SLA Achievements Analysis "
            data={slaComplianceData}
            xKey="date"
            segments={slaSegments}
            xAxisLabel="Date"
            yAxisLabel="Document Count"
          />
        </div>
        <div></div>
      </div> */}
    </div>
  );
};

export default Dashboard2;
