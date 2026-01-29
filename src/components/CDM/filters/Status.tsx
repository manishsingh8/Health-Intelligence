import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Search, X, Check } from "lucide-react";
import { MOCK_FILTER_DATA } from '@/constants/CDMData';

interface StatusProps {
  selectedStatus: { id: number; statusName: string }[];
  setSelectedStatus: (status: { id: number; statusName: string }[]) => void;
}

const getStatusColors = (statusName: string) => {
    const colorMap: Record<string, { text: string; bg: string; border: string }> = {
      Processed: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
      "Ready to Process": { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
      "Waiting for User Validation": { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
      "Found-Not Posted": { text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
      "Not Found-Not Posted": { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
      "Found-Partially Posted": { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" }
    };
    return colorMap[statusName] || { text: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" };
};

const Status = ({ selectedStatus, setSelectedStatus }: StatusProps) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const statusList = MOCK_FILTER_DATA.status;
  const initialDisplayCount = 5;

  const toggleStatus = (status: { id: number; statusName: string }) => {
    if (selectedStatus.some(s => s.id === status.id)) {
      setSelectedStatus(selectedStatus.filter(s => s.id !== status.id));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const clearStatus = () => setSelectedStatus([]);

  const filteredStatus = statusList.filter(s => 
    s.statusName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-medium text-sm text-slate-700">Status ({selectedStatus.length})</h4>
        {selectedStatus.length > 0 && (
           <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-slate-100 rounded-full" onClick={clearStatus}>
             <X className="h-3 w-3 text-slate-500" />
           </Button>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
         {statusList.slice(0, initialDisplayCount).map(status => {
            const isSelected = selectedStatus.some(s => s.id === status.id);
            const colors = getStatusColors(status.statusName);
            
            return (
                <div 
                   key={status.id}
                   className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer border-2 transition-all
                      ${isSelected 
                          ? `${colors.bg} ${colors.border} ${colors.text}` 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }
                   `}
                   onClick={() => toggleStatus(status)}
                >
                  <Checkbox 
                     checked={isSelected}
                     onCheckedChange={() => toggleStatus(status)}
                     className={`h-4 w-4 border-current ${isSelected ? 'bg-current text-white' : ''}`}
                  />
                  <span className="text-xs font-semibold leading-none">{status.statusName}</span>
                </div>
            )
         })}

         {statusList.length > initialDisplayCount && (
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 mt-1">
                     <MoreHorizontal className="h-4 w-4 text-slate-600" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[300px] p-3" align="start">
                  <div className="relative mb-2">
                     <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                     <Input 
                       placeholder="Search" 
                       className="pl-8 h-9 rounded-full border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-300"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
                  <div className="max-h-[200px] overflow-y-auto space-y-2 py-1">
                     {filteredStatus.slice(initialDisplayCount).map(status => {
                          const isSelected = selectedStatus.some(s => s.id === status.id);
                          const colors = getStatusColors(status.statusName);
                          return (
                            <div 
                                key={status.id}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors
                                    ${isSelected 
                                        ? `${colors.bg} border-2 ${colors.border} ${colors.text}`
                                        : 'bg-white border-2 border-transparent text-slate-600 hover:bg-slate-50'}
                                `}
                                onClick={() => toggleStatus(status)}
                            >
                                <div className="flex items-center gap-2">
                                     <Checkbox 
                                        checked={isSelected}
                                        onCheckedChange={() => toggleStatus(status)}
                                        className={`h-4 w-4 border-current ${isSelected ? 'bg-current text-white' : ''}`}
                                     />
                                     <span className="text-xs font-medium">{status.statusName}</span>
                                </div>
                                {isSelected && <Check className="h-3 w-3" />}
                            </div>
                          )
                     })}
                  </div>
               </PopoverContent>
            </Popover>
         )}
      </div>
    </div>
  );
};

export default Status;
