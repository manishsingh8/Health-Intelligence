import { useState, type UIEvent } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, subDays } from 'date-fns';

import DateSelection from './DateSelection';
import ClassificationType from './ClassificationType';
import Category from './Category';
import Tags from './Tags';
import Status from './Status';
import Assigne from './Assigne';
import Search from './Search';

interface FilterPopoverProps {
  handlePopoverClose: () => void;
  fetchData: (payload: any) => void;
  loading: boolean;
}

const FilterPopover = ({ handlePopoverClose, fetchData, loading }: FilterPopoverProps) => {
  // Local State
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [processedFromDate, setProcessedFromDate] = useState('');
  const [processedToDate, setProcessedToDate] = useState('');
  const [selectedClassifications, setSelectedClassifications] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{ id: number; payerName: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ id: number; statusName: string }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ id: number; name: string }[]>([]);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Error State for dates
  const [errors, setErrors] = useState<{
    fromDate?: boolean;
    toDate?: boolean;
    processedFromDate?: boolean;
    processedToDate?: boolean;
  }>({});

  const isApplyDisabled = !(
     fromDate || toDate || processedFromDate || processedToDate ||
     (searchType && searchValue) ||
     selectedClassifications.length > 0 ||
     selectedCategories.length > 0 ||
     selectedStatus.length > 0 ||
     selectedTags.length > 0 ||
     selectedUsers.length > 0
  );

  const handleApply = () => {
    let newErrors: any = {};
    let hasError = false;

    // Validation logic similar to legacy
    if (fromDate && !toDate) { newErrors.toDate = true; hasError = true; }
    else if (!fromDate && toDate) { newErrors.fromDate = true; hasError = true; }
    
    if (processedFromDate && !processedToDate) { newErrors.processedToDate = true; hasError = true; }
    else if (!processedFromDate && processedToDate) { newErrors.processedFromDate = true; hasError = true; }

    setErrors(newErrors);
    if (hasError) return;

    const payload = {
        fromDate,
        toDate,
        processedFromDate,
        processedToDate,
        classificationType: selectedClassifications,
        category: selectedCategories.map(c => c.id),
        tags: selectedTags,
        statusId: selectedStatus.map(s => s.id),
        assigneeId: selectedUsers.map(u => u.id),
        searchType,
        searchValue,
        pageNumber: 1,
        pageSize: 10
    };

    console.log("Applying Filter Payload:", payload);
    fetchData(payload);
    handlePopoverClose(); // Close on apply
  };

  const handleClear = () => {
    const today = new Date();
    const yesterday = subDays(today, 1);
    
    setFromDate(format(yesterday, 'yyyy-MM-dd'));
    setToDate(format(today, 'yyyy-MM-dd'));
    setProcessedFromDate('');
    setProcessedToDate('');
    setSelectedClassifications([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedStatus([]);
    setSelectedUsers([]);
    setSearchType('');
    setSearchValue('');
    setErrors({});

    const defaultPayload = {
      fromDate: format(yesterday, 'yyyy-MM-dd'),
      toDate: format(today, 'yyyy-MM-dd'),
      pageSize: 10,
      pageNumber: 1
    };
    fetchData(defaultPayload);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 0);
  };

  return (
    <div className="w-[400px] h-[400px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-slate-200">
       {/* Header */}
       <div className={`flex items-center justify-between px-4 py-2 border-b transition-shadow z-10 shrink-0 ${isScrolled ? 'shadow-sm border-transparent' : 'border-slate-100'}`}>
          <h3 className="font-bold text-slate-800 tracking-tight text-xs uppercase">FILTERS</h3>
          <div className="flex gap-4">
             <button 
                className={`text-xs font-semibold transition-colors ${isApplyDisabled ? 'text-slate-300 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
                onClick={handleApply}
                disabled={isApplyDisabled}
             >
                Apply
             </button>
             <button 
                className={`text-xs font-semibold transition-colors ${isApplyDisabled ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={handleClear}
                disabled={isApplyDisabled}
             >
                Clear
             </button>
          </div>
       </div>

       <ScrollArea className="flex-1 w-full" onScrollCapture={handleScroll}>
          <div className="p-3 space-y-2">
            {loading ? (
                <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    <DateSelection 
                        fromDate={fromDate} toDate={toDate} 
                        processedFromDate={processedFromDate} processedToDate={processedToDate}
                        setFromDate={setFromDate} setToDate={setToDate}
                        setProcessedFromDate={setProcessedFromDate} setProcessedToDate={setProcessedToDate}
                        errors={errors}
                    />
                    
                    <ClassificationType 
                        selectedClassifications={selectedClassifications} 
                        setSelectedClassifications={setSelectedClassifications} 
                    />
                    
                    <Category 
                        selectedCategories={selectedCategories} 
                        setSelectedCategories={setSelectedCategories} 
                    />
                    
                    <Tags 
                        selectedTags={selectedTags} 
                        setSelectedTags={setSelectedTags} 
                    />
                    
                    <Status 
                        selectedStatus={selectedStatus} 
                        setSelectedStatus={setSelectedStatus} 
                    />
                    
                    <Assigne 
                        selectedUsers={selectedUsers} 
                        setSelectedUsers={setSelectedUsers} 
                    />
                    
                    <Search 
                        searchType={searchType} setSearchType={setSearchType}
                        searchValue={searchValue} setSearchValue={setSearchValue}
                    />
                </>
            )}
          </div>
       </ScrollArea>
       <div className="h-6 border-t border-slate-100 bg-slate-50/50 shrink-0" />
    </div>
  );
};

export default FilterPopover;
