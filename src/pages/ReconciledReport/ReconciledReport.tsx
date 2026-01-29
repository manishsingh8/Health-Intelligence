import PaymentCard from "@/components/PaymentCard/PaymentCard";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { useReconciledReportLogic } from "./ReconciledReport.hook";
import { DataTable } from "@/components/DataTable/DataTable";
// import { EditModal } from "@/components/EditModal/EditModal";
// import { EDITABLE_RECONCILED_FIELDS } from "@/constants/TableData";
import Logo from "@/assets/icons/rp-logo-icon.svg";

const ReconciledReport = () => {
  const {
    toggle,
    from,
    to,
    payerOptions,
    // statusOptions,
    selectedPayer,
    selectedStatus,
    setSelectedPayer,
    setSelectedStatus,
    setToggle,
    setFrom,
    setTo,
    columns,
    // handleEditCancel,
    // handleEditSubmit,
    // handleFieldChange,
    handleExport,
    handleSelectAll,
    handleRowSelect,
    totalPages,
    // isEditModalOpen,
    setSearchTerm,
    setRowsPerPage,
    paginatedData,
    selectedRows,
    setSelectedRows,
    searchTerm,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    // setIsEditModalOpen,
    // editedData,
    widgetLoading,
    tableLoading,
    reconciledCardsData,
  } = useReconciledReportLogic();

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px]">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Reconciliation Summary Report
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">
            Reconciliation Summary Report
          </span>
        </div>
      </div>
      {widgetLoading ? (
        <div className="flex align-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
          <span className="flex items-center gap-2 text-gray-500">
            Loading...
            <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {reconciledCardsData.map((card) => (
            <PaymentCard
              key={card.id}
              headerText={card.headerText}
              amount={card.amount}
              bgColor={card.bgColor}
            />
          ))}
        </div>
      )}

      <div className="border border-[#E6ECF0] p-1 rounded-[14px]">
        <FilterSearchBar
          toggleOptions={[
            { value: "dateRange", label: "Date Range" },
            { value: "dayWise", label: "Day Wise" },
          ]}
          selectedToggle={toggle}
          onToggleChange={setToggle}
          enableDateRange
          fromDate={from}
          toDate={to}
          onFromDateChange={setFrom}
          onToDateChange={setTo}
          enablePayer
          payerOptions={payerOptions}
          selectedPayer={selectedPayer}
          onPayerChange={setSelectedPayer}
          // statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showAdvancedSearch
          onAdvancedSearch={() => console.log("adv search")}
        />
      </div>
      {tableLoading ? (
        <div className="flex align-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
          <span className="flex items-center gap-2 text-gray-500">
            Loading...
            <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
          </span>
        </div>
      ) : (
        <div className="border border-[#E6ECF0] p-4 rounded-[14px]">
          <DataTable
            data={paginatedData}
            columns={columns}
            selectable
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            exportEnabled
            searchEnabled
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onExport={handleExport}
            idKey="reconciledDataId"
            pageInfo={{
              currentPage,
              totalPages,
              onPageChange: setCurrentPage,
              rowsPerPage,
              onRowsPerPageChange: setRowsPerPage,
            }}
            // May needed later on
            // editRow={{
            //   enabled: true,
            //   onEditClick: handleEditClick,
            // }}
          />
        </div>
      )}
      {/* <EditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        data={editedData}
        columns={columns}
        editableFields={EDITABLE_RECONCILED_FIELDS}
        onFieldChange={handleFieldChange}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
        idKey="id"
        title="Reconciliation Details - e875vned0"
      /> */}
    </div>
  );
};

export default ReconciledReport;
