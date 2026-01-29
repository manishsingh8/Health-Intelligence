import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { DataTable } from "@/components/DataTable/DataTable";
import { useCashPostingQueueLogic } from "./CashPostingQueue.hook";
import Logo from "@/assets/icons/rp-logo-icon.svg";

const CashPostingQueue = () => {
  const {
    toggle,
    setToggle,
    from,
    setFrom,
    to,
    setTo,
    paginatedData,
    columns,
    selectedRows,
    setSelectedRows,
    handleRowSelect,
    handleSelectAll,
    searchTerm,
    setSearchTerm,
    selectedBrands,
    handleBrandToggle,
    handleExport,
    currentPage,
    totalPages,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    tableLoading,
  } = useCashPostingQueueLogic();
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px]">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Payment Posting Queue
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#249563]">Payment Posting Queue</span>
        </div>
      </div>
      <div className="border border-[#E6ECF0] p-1 rounded-[14px]">
        <FilterSearchBar
          toggleOptions={[
            { value: "List", label: "List" },
            { value: "Queue", label: "Queue" },
          ]}
          selectedToggle={toggle}
          onToggleChange={setToggle}
          enableDateRange
          fromDate={from}
          onFromDateChange={setFrom}
          toDate={to}
          onToDateChange={setTo}
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
            searchEnabled
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            // filtersEnabled
            // filterOptions={BRANDS}
            selectedFilters={selectedBrands}
            onFilterChange={handleBrandToggle}
            exportEnabled
            onExport={handleExport}
            idKey="cashPostingId"
            pageInfo={{
              currentPage,
              totalPages,
              onPageChange: setCurrentPage,
              rowsPerPage,
              onRowsPerPageChange: setRowsPerPage,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CashPostingQueue;
