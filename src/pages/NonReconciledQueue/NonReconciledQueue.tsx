import PaymentCard from "@/components/PaymentCard/PaymentCard";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { usePaymentLogic } from "./NonReconciledQueue.hook";
import { DataTable } from "@/components/DataTable/DataTable";
import { EditModal } from "@/components/EditModal/EditModal";
import { EDITABLE_FIELDS } from "@/constants/TableData";
import Logo from "@/assets/icons/rp-logo-icon.svg";
import DataModal from "../../components/DataModal/DataModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getEmrSummaryColumns,
  emrFileDetailsColumns,
} from "./nonReconciledColumnRules";
import { mockTasks } from "@/constants/NonReconciledQueue";

const Payment = () => {
  const {
    toggle,
    from,
    to,
    payerOptions,
    statusOptions,
    selectedPayer,
    selectedStatus,
    setSelectedPayer,
    setSelectedStatus,
    setToggle,
    setFrom,
    setTo,
    columns,
    handleEditCancel,
    handleEditSubmit,
    handleFieldChange,
    handleExport,
    handleSelectAll,
    handleRowSelect,
    isEditModalOpen,
    setRowsPerPage,
    paginatedData,
    selectedRows,
    setSelectedRows,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    editedData,
    paymentCardsData,
    tableLoading,
    widgetLoading,
    // searchTerm,
    // setSearchTerm,
    handleEditClick,
    // comment,
    // setComment,
    open,
    setOpen,
    modalData,
    loadingData,
    edit_columns,
    dataModalColumns,
    emrTableOpen,
    setEmrTableOpen,
    emrFileDetailsOpen,
    setEmrFileDetailsOpen,
    emrTableData,
    openEmrFileDetails,
    selectedEmrFileName,
    selectedEmrFileRows,
  } = usePaymentLogic();

  const emrSummaryColumns = getEmrSummaryColumns({
    openEmrFileDetails,
  });

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px]">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Non-Reconciled Queue
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">Non-Reconciled Queue</span>
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
        <div className="flex flex-wrap gap-2">
          {paymentCardsData.map((card: any) => (
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
          enableStatus
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showAdvancedSearch
          onAdvancedSearch={() => console.log("adv search")}
        />
      </div>
      {tableLoading ? (
        <div className="flex items-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
          <span className="flex items-center gap-2 text-gray-500">
            Loading...
            <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
          </span>
        </div>
      ) : (
        <div className="border border-[#E6ECF0] p-4 rounded-[14px]">
          <div className="w-full overflow-x-auto overflow-hidden">
            <DataTable
              data={paginatedData}
              columns={columns}
              stackHeaderText
              handleEditClick={handleEditClick}
              selectable
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              exportEnabled
              // searchEnabled
              // searchTerm={searchTerm}
              // onSearchChange={setSearchTerm}
              onExport={handleExport}
              idKey="nonReconciledDataId"
              pageInfo={{
                currentPage,
                totalPages: Math.ceil(mockTasks.length / rowsPerPage),
                onPageChange: setCurrentPage,
                rowsPerPage,
                onRowsPerPageChange: setRowsPerPage,
              }}
              // assignmentFeature={{
              //   enabled: true,
              //   onAssign: handleAssign,
              //   users: mockUsers,
              //   quickActions: true,
              //   currentUserId: "user-1",
              //   onChangeStatus: handleChangeStatus,
              //   onWatchOptions: handleWatchOptions,
              //   onDelete: handleDelete,
              // }}
              editRow={{
                enabled: true,
                onEditClick: handleEditClick,
              }}
            />
          </div>
        </div>
      )}

      <EditModal
        open={isEditModalOpen}
        data={editedData}
        columns={edit_columns}
        editableFields={EDITABLE_FIELDS}
        onFieldChange={handleFieldChange}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
        idKey="id"
        title="Reconciliation Details"
        // comment={comment}
        // onCommentChange={setComment}
      />
      <DataModal
        open={open}
        setOpen={setOpen}
        modalData={modalData}
        columns={dataModalColumns}
        loading={loadingData}
      />

      <Dialog open={emrTableOpen} onOpenChange={setEmrTableOpen}>
        <DialogContent className="w-full max-w-[85vw] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-md">EMR Amount Details</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            {loadingData ? (
              <div className="flex items-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
                <span className="flex items-center gap-2 text-gray-500">
                  Loading...
                  <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
                </span>
              </div>
            ) : (
              <DataTable
                data={emrTableData}
                columns={emrSummaryColumns}
                idKey="__rowId"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={emrFileDetailsOpen} onOpenChange={setEmrFileDetailsOpen}>
        <DialogContent className="w-full max-w-[85vw] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-md">
              {selectedEmrFileName
                ? `${selectedEmrFileName} Details`
                : "File Details"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-auto">
            <DataTable
              data={selectedEmrFileRows}
              columns={emrFileDetailsColumns}
              idKey="__rowId"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
