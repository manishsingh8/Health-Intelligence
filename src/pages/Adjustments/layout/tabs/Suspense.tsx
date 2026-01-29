import { DataTable } from "@/components/DataTable/DataTable";
import { ICANModal } from "../modal/ICANModal";
import { AddNoteModal } from "../modal/AddNoteModal";
import { CreateExceptionModal } from "../modal/CreateExceptionModal";
import { SourceDocumentModal } from "../modal/SourceDocumentModal";

const Suspense = ({
  ledgerColumns,
  currentPage,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
  totalPages,
  paginatedData,
  activeModal,
  setActiveModal,
}: any) => {
  console.log(paginatedData, "pdata", ledgerColumns, "lc");
  return (
    <div className=" flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Suspense Account
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">Suspense Account</span>
        </div>
      </div>
      <DataTable
        data={paginatedData}
        columns={ledgerColumns}
        idKey="id"
        pageInfo={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          rowsPerPage,
          onRowsPerPageChange: setRowsPerPage,
        }}
      />
      <div>
        {activeModal === "ican" && (
          <ICANModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "note" && (
          <AddNoteModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "exception" && (
          <CreateExceptionModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "source" && (
          <SourceDocumentModal onClose={() => setActiveModal(null)} />
        )}
      </div>
    </div>
  );
};

export default Suspense;
