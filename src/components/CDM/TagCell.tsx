import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, X, Check, Search } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { setAvailableTags, setLetterListTableData, setTags, setData } from "@/redux/slices/cdmSlice";
import type { RootState } from "@/redux/store";
import type { CDMDocument } from "@/pages/CDM/CDMDashboard.hook";

interface TagCellProps {
  value: string[];
  row: CDMDocument;
  component?: string;
  isBulkAssign?: boolean;
  assignUser?: (isBulk: boolean, payload: any, extra1: any, extra2: any) => void;
}

const TagCell = ({ value, row, component = "", isBulkAssign = false, assignUser }: TagCellProps) => {
  const dispatch = useDispatch();
  const { availableTags, letterListTableData, data } = useSelector((state: RootState) => state.cdm);
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedTags(value || []);
    dispatch(setTags(value || []));
  }, [row]);

  const handleTagChange = (updatedTags: string[]) => {
    setSelectedTags(updatedTags);
    dispatch(setTags(updatedTags));
    
    if (component !== 'bulk_assign') {
      const updatedTableData = letterListTableData.map((letter) => {
        if (letter.id === row.id) {
          return { ...letter, tags: [...updatedTags] };
        }
        return letter;
      });
      dispatch(setLetterListTableData(updatedTableData));
    }

    const newTags = updatedTags.filter((tag) => !availableTags.includes(tag));
    if (newTags.length > 0) {
      const updatedAvailTags = [...availableTags, ...newTags];
      dispatch(setAvailableTags(updatedAvailTags));
      dispatch(setData({ ...data, tags: updatedAvailTags }));
    }

    if (!isBulkAssign && assignUser) {
      const payload = { letterIds: [row?.id], assignUserId: '', tags: [...updatedTags] };
      assignUser(false, payload, {}, {});
    }
  };

  const toggleTag = (tag: string) => {
    let newTags: string[];
    if (selectedTags.includes(tag)) {
        newTags = selectedTags.filter(t => t !== tag);
    } else {
        newTags = [...selectedTags, tag];
    }
    handleTagChange(newTags);
  };

  const addNewTag = () => {
    const tag = inputValue.trim();
    if (tag && !selectedTags.includes(tag)) {
        handleTagChange([...selectedTags, tag]);
        setInputValue('');
    }
  };

  const filteredAvailableTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  const showAddNew = inputValue.trim() !== "" && !availableTags.some(t => t.toLowerCase() === inputValue.trim().toLowerCase());

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverAnchor asChild>
                <div 
                  onClick={() => setOpen(true)}
                  className={`
                    cursor-pointer flex items-center gap-1.5 p-1.5 rounded-md border-2 border-transparent hover:border-slate-200 transition-all min-h-[32px] w-full
                    ${component === "bulk_assign" ? 'border-slate-200' : ''}
                    ${open ? 'border-blue-200 bg-blue-50/10' : ''}
                  `}
                >
                  {selectedTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {selectedTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-slate-100 text-slate-700 border-none">
                          {index > 1 ? `${tag.substring(0, 5)}...` : tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add tags
                    </span>
                  )}
                </div>
              </PopoverAnchor>
            </TooltipTrigger>
            {selectedTags.length > 0 && (
              <TooltipContent side="top">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {selectedTags.join(", ")}
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <PopoverContent 
          className="w-[280px] p-0" 
          align="start"
          onOpenAutoFocus={(e) => {
            // Prevent focusing the first element (which might be the X button in tags list)
            // and focus the search input instead
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                ref={inputRef}
                placeholder="Search or add tags..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addNewTag();
                    }
                }}
                className="pl-8 h-9 rounded-md border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-slate-200"
              />
            </div>
          </div>
          <div className="max-h-[240px] overflow-y-auto py-1">
             {showAddNew && (
                <div 
                    onClick={addNewTag}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm text-blue-600 font-medium"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add "{inputValue}"</span>
                </div>
             )}
             
             {filteredAvailableTags.length > 0 ? (
                filteredAvailableTags.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                        <div 
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`
                                flex items-center justify-between px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm transition-colors
                                ${isSelected ? 'bg-blue-50/50 text-blue-700' : 'text-slate-600'}
                            `}
                        >
                            <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                                {tag}
                            </div>
                        </div>
                    );
                })
             ) : !showAddNew && (
                <div className="px-3 py-4 text-center text-xs text-slate-400">
                    No tags found. Type to add a new one.
                </div>
             )}
          </div>
          
          {selectedTags.length > 0 && (
            <div className="p-2 border-t bg-slate-50/50 flex flex-wrap gap-1">
                {selectedTags.map(tag => (
                   <Badge key={tag} className="gap-1 px-2 py-0.5 text-[10px]">
                       {tag}
                       <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-200" 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleTag(tag);
                        }} 
                       />
                   </Badge>
                ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TagCell;
