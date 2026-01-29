import type { MouseEvent } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X, Check } from "lucide-react";
import { MOCK_FILTER_DATA } from '@/constants/CDMData';

interface ClassificationTypeProps {
  selectedClassifications: string[];
  setSelectedClassifications: (classification: string[]) => void;
}

const ClassificationType = ({ selectedClassifications, setSelectedClassifications }: ClassificationTypeProps) => {
  const allClassifications = MOCK_FILTER_DATA.classification.map(c => c.classificationType);

  const handleSelect = (value: string) => {
    if (value === 'all') {
      if (selectedClassifications.length === allClassifications.length) {
        setSelectedClassifications([]);
      } else {
        setSelectedClassifications(allClassifications);
      }
    } else {
      if (selectedClassifications.includes(value)) {
        setSelectedClassifications(selectedClassifications.filter(c => c !== value));
      } else {
        setSelectedClassifications([...selectedClassifications, value]);
      }
    }
  };

  const removeClassification = (e: MouseEvent, value: string) => {
    e.stopPropagation();
    setSelectedClassifications(selectedClassifications.filter(c => c !== value));
  };

  const isAllSelected = selectedClassifications.length === allClassifications.length;

  return (
    <div className="mb-4">
      <h4 className="font-medium text-sm text-slate-700 mb-2">Classification Type</h4>
      <Popover>
        <PopoverTrigger asChild>
          <div className="min-h-[40px] w-full border-2 border-slate-200 rounded-full px-3 py-1 flex flex-wrap items-center gap-1 cursor-pointer hover:border-slate-300 transition-colors">
            {selectedClassifications.length === 0 ? (
              <span className="text-slate-400 text-sm">Select Classification</span>
            ) : isAllSelected ? (
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 rounded-md py-0.5 px-2 flex items-center gap-1 group">
                    All
                    <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={(e) => { e.stopPropagation(); setSelectedClassifications([]); }} />
                </Badge>
            ) : (
                selectedClassifications.map(value => (
                    <Badge key={value} variant="secondary" className="bg-slate-100 text-slate-700 rounded-md py-0.5 px-2 flex items-center gap-1 group">
                        {value}
                        <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={(e) => removeClassification(e, value)} />
                    </Badge>
                ))
            )}
            <div className="flex-1" />
            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
          <div className="max-h-[300px] overflow-y-auto py-1">
             <div 
                className="flex items-center space-x-2 px-3 py-2 hover:bg-slate-50 cursor-pointer"
                onClick={() => handleSelect('all')}
             >
                <Checkbox checked={isAllSelected} id="select-all" />
                <label className="text-sm font-medium leading-none cursor-pointer flex-1">All</label>
             </div>
             <div className="h-px bg-slate-100 my-1" />
             {MOCK_FILTER_DATA.classification.map(item => (
                <div 
                    key={item.id}
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-slate-50 cursor-pointer"
                    onClick={() => handleSelect(item.classificationType)}
                >
                    <Checkbox checked={selectedClassifications.includes(item.classificationType)} id={`item-${item.id}`} />
                    <label className="text-sm font-medium leading-none cursor-pointer flex-1">{item.classificationType}</label>
                    {selectedClassifications.includes(item.classificationType) && <Check className="h-4 w-4 text-blue-600" />}
                </div>
             ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ClassificationType;
