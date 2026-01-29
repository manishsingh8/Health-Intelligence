import PaymentCard from "@/components/PaymentCard/PaymentCard";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { usePaymentLogic } from "./NonReconciledQueue.hook";
import { DataTable } from "@/components/DataTable/DataTable";
import { EditModal } from "@/components/EditModal/EditModal";
import { EDITABLE_FIELDS } from "@/constants/TableData";
import Logo from "@/assets/icons/rp-logo-icon.svg";
import DataModal from "./DataModal";
import { BANK_DEPOSIT_COLUMNS } from "@/constants/TableData";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage mockup",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
  },
  {
    id: "2",
    title: "Implement authentication",
    status: "To Do",
    priority: "High",
    assignee: "Jane Smith",
  },
  {
    id: "3",
    title: "Write API documentation",
    status: "In Progress",
    priority: "Medium",
    assignee: "Bob Johnson",
  },
  {
    id: "4",
    title: "Fix mobile responsiveness",
    status: "Done",
    priority: "Low",
    assignee: "Alice Brown",
  },
  {
    id: "5",
    title: "Add dark mode support",
    status: "To Do",
    priority: "Medium",
    assignee: "Charlie Wilson",
  },
];

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
  } = usePaymentLogic();

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
        columns={BANK_DEPOSIT_COLUMNS}
        loading={loadingData}
      />
    </div>
  );
};

export default Payment;
