import { useMemo } from "react";
import { Filter, FileText, LayoutGrid, User, Calendar, Tag, AtSign, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { DataTable } from "@/components/DataTable/DataTable"; 
import { DocumentMetrics } from "@/components/CDM/DocumentMetrics/DocumentMetrics";
import FilterPopover from "@/components/CDM/filters/FilterPopover";
import { BulkAssign } from "@/components/CDM/BulkAssign";
import TagCell from "@/components/CDM/TagCell";
import AssigneeSelect from "@/components/CDM/AssigneeSelect";

import { type Column } from "@/components/DataTable/DataTable";
import { useCDMDashboard, type CDMDocument } from "./CDMDashboard.hook";

const CDMDashboard = () => {
  const {
    navigate,
    letterListTableData,
    bulkAssignDialogOpen,
    setBulkAssignDialogOpen,
    rowSelection,
    fetchData,
    handleRowSelect,
    handleSelectAll,
  } = useCDMDashboard();

  const columns: Column<CDMDocument>[] = useMemo(() => [
    {
      key: "splitFileName",
      label: (
        <div className="flex items-center gap-2">
           <FileText className="w-4 h-4 text-slate-500" />
           <span>Split File Name</span>
        </div>
      ),
      render: (value: any, row: CDMDocument) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center gap-2 cursor-pointer hover:underline text-blue-900"
                onClick={() => navigate(`/cdm/letterDetails/${encodeURIComponent(row.id)}`)}
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span className="truncate max-w-[300px] font-medium">
                  {String(value)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{String(value)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      key: "classification",
      label: (
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-slate-500" />
          <span>Classification</span>
        </div>
      ),
    },
    {
      key: "payer",
      label: (
        <div className="flex items-center gap-2">
           <User className="w-4 h-4 text-slate-500" />    
           <span>Payer</span>
        </div>
      ),
    },
    {
      key: "assignee",
      label: (
        <div className="flex items-center gap-2">
           <AtSign className="w-4 h-4 text-slate-500" />
           <span>Assignee</span>
        </div>
      ),
      render: (_val: any, row: CDMDocument) => (
        <AssigneeSelect 
          rowData={row} 
          assignUser={(_isBulk, _payload, row, user) => {
            console.log("Assigning user", user.name, "to", row.id);
          }}
        />
      )
    },
    {
      key: "batchDate",
      label: (
        <div className="flex items-center gap-2">
           <Calendar className="w-4 h-4 text-slate-500" />
           <span>Batch Date</span>
        </div>
      ),
    },
    {
      key: "processedDate",
      label: (
        <div className="flex items-center gap-2">
           <Calendar className="w-4 h-4 text-slate-500" />
           <span>Processed Date</span>
        </div>
      ),
    },
    {
      key: "tags",
      label: (
        <div className="flex items-center gap-2">
           <Tag className="w-4 h-4 text-slate-500" />
           <span>Tags</span>
        </div>
      ),
      render: (tags: any, row: CDMDocument) => (
        <TagCell 
          value={tags} 
          row={row} 
          assignUser={(_isBulk, payload) => {
            console.log("Assigning tags for", row.id, payload);
          }}
        />
      )
    },
    {
      key: "status",
      label: (
        <div className="flex items-center gap-2">
           <CheckCircle className="w-4 h-4 text-slate-500" />
           <span>Status</span>
        </div>
      ),
      render: (val: any) => {
        const statusVal = String(val);
        let colorClass = "bg-green-100 text-green-800";
        let Icon = CheckCircle;
        
        if(statusVal === "Ready to Process") {
            colorClass = "bg-blue-100 text-blue-800";
            Icon = Clock;
        }
        else if(statusVal === "Waiting for User Validation") {
            colorClass = "bg-orange-100 text-orange-800";
            Icon = AlertCircle;
        }
        
        return (
            <Badge className={`${colorClass} hover:${colorClass} font-normal border-0 flex w-fit items-center gap-1 text-[10px] py-0`}>
                <Icon className="w-3 h-3" />
                {statusVal}
            </Badge>
        )
      }
    }
  ], [navigate]);

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-slate-50/50 p-4 md:p-6 space-y-6 overflow-hidden">
      <div className="w-full border border-[#E6ECF0] p-4 rounded-[14px] bg-white flex flex-col justify-center min-h-[80px] shrink-0">
        <div className="text-xl font-bold text-[#1A1A1A]">
          Correspondence Document Manager (CDM)
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Manage, assign, and organize healthcare correspondence with precision
        </div>
      </div>
       <div className="flex justify-end items-center">
          <div className="flex gap-2">
            {Object.keys(rowSelection).length > 0 && (
                <Button onClick={() => setBulkAssignDialogOpen(true)}>
                    Bulk Assign ({Object.keys(rowSelection).length})
                </Button>
            )}
            <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-all">
                      <Filter className="w-4 h-4" /> Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto bg-transparent border-0 shadow-none -ml-4" align="end">
                    <FilterPopover 
                      handlePopoverClose={()=>{}} 
                      fetchData={fetchData} 
                      loading={false} 
                    />
                </PopoverContent>
            </Popover>
          </div>
       </div>

       <DocumentMetrics />

        <div className="bg-white rounded-lg border shadow-sm section-table overflow-hidden">
           <DataTable 
             columns={columns} 
             data={letterListTableData} 
             selectable={true}
             idKey="id"
             selectedRows={new Set(Object.keys(rowSelection))}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
           />
        </div>

       <BulkAssign 
         bulkAssignDialogOpen={bulkAssignDialogOpen}
         bulkAssignDialogClose={() => setBulkAssignDialogOpen(false)}
         letterIds={Object.keys(rowSelection)}
         assignUser={()=>{}}
         fetchData={fetchData}
         loading={false}
       />
    </div>
  );
};

export default CDMDashboard;
