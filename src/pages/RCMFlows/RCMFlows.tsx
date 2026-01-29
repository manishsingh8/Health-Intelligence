import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import CashPostingAgent from "./sections/CashPostingAgent";
import IntakeOrchestratorAgent from "./sections/IntakeWorkflowAgent";
import RCMCentralEngine from "./sections/RCMCentralEngine";
import ReconciliationAgent from "./sections/ReconciliationAgent";
import { TABS } from "@/constants/DashboardData";
import { useRCMFlowsLogic } from "./RCMFlows.hook";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/DropdownMenu";
// import { Button } from "@/components/ui/Button";
// import { ChevronDown } from "lucide-react";

const RCMFlows = () => {
  const {
    activeTab,
    setActiveTab,
    // open,
    // setOpen,
    // selectedRange,
    // setSelectedRange,
  } = useRCMFlowsLogic();

  return (
    <div
      className="bg-[#cfdde8] p-4 flex justify-center h-[calc(100vh-64px)] overflow-auto"
      style={{
        background:
          "linear-gradient(0deg, #E6EEF4, #CFDDE8), linear-gradient(90deg, rgba(230, 238, 244, 0.8) 0%, rgba(207, 221, 232, 0.8) 49.49%, rgba(195, 202, 230, 0.8) 100%)",
      }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between w-full">
          <TabsList className="bg-transparent gap-2 flex justify-center items-center w-[90%]">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="
              cursor-pointer rounded-full px-5 py-5
              data-[state=active]:bg-[#249563]
              data-[state=active]:text-white
              data-[state=inactive]:bg-[#E6EEF4]
              data-[state=inactive]:text-gray-700
            "
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* <div className="flex items-center gap-1 decoration-[1.5px]  decoration-gray-800 cursor-pointer w-[10%] justify-end">
            <DropdownMenu onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs w-40 flex justify-between shadow-none focus-visible:ring-0 py-4"
                >
                  <span>
                    {
                      DROPDOWN_OPTIONS.find((o) => o.value === selectedRange)
                        ?.label
                    }
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-36">
                {DROPDOWN_OPTIONS.map((o) => (
                  <DropdownMenuItem
                    key={o.value}
                    onClick={() => setSelectedRange(o.value)}
                  >
                    {o.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </div>
        <TabsContent value="rcm">
          <RCMCentralEngine setActiveTab={setActiveTab} />
        </TabsContent>
        <TabsContent value="intake">
          <IntakeOrchestratorAgent />
        </TabsContent>
        <TabsContent value="reconciliation">
          <ReconciliationAgent />
        </TabsContent>
        <TabsContent value="cashPosting">
          <CashPostingAgent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RCMFlows;
