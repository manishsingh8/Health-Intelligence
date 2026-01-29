import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import Suspense from "./layout/tabs/Suspense";
import PIP from "./layout/tabs/PIP";
import Recoupment from "./layout/tabs/Recoupments";
import OtherAdjustments from "./layout/tabs/OtherAdjustments";
import { useAdjustmentsLogic } from "./Adjustments.hook";

const Adjustments = () => {
  const {
    ledgerColumns,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
    TABS,
    activeTab,
    setActiveTab,
    activeModal,
    setActiveModal,
  } = useAdjustmentsLogic();
  // ✅ default

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabs Header */}
        <div className="flex justify-center">
          <TabsList className="bg-transparent gap-2 flex justify-center items-center">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                  cursor-pointer rounded-full px-5 py-5
                  data-[state=active]:bg-[#249563]
                  data-[state=active]:text-white
                  data-[state=inactive]:bg-[#E6EEF4]
                  data-[state=inactive]:text-gray-700
                "
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tabs Content */}
        <TabsContent value="SUSPENSE" className="mt-4">
          <Suspense
            ledgerColumns={ledgerColumns}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            totalPages={totalPages}
            paginatedData={paginatedData}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />
        </TabsContent>

        <TabsContent value="PIP" className="mt-4">
          <PIP
            ledgerColumns={ledgerColumns}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            totalPages={totalPages}
            paginatedData={paginatedData}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />
        </TabsContent>

        <TabsContent value="RECOUPMENT" className="mt-4">
          <Recoupment
            ledgerColumns={ledgerColumns}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            totalPages={totalPages}
            paginatedData={paginatedData}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />
        </TabsContent>

        <TabsContent value="OTHER_ADJUSTMENT" className="mt-4">
          <OtherAdjustments
            ledgerColumns={ledgerColumns}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            totalPages={totalPages}
            paginatedData={paginatedData}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Adjustments;
