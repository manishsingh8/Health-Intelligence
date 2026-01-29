import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, X, Check } from "lucide-react";
import { MOCK_FILTER_DATA } from '@/constants/CDMData';

interface TagsProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const Tags = ({ selectedTags, setSelectedTags }: TagsProps) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const tags = MOCK_FILTER_DATA.tags;
  const initialDisplayCount = 5;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearTags = () => setSelectedTags([]);

  const filteredTags = tags.filter(t => 
    t.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-medium text-sm text-slate-700">Tag ({selectedTags.length})</h4>
        {selectedTags.length > 0 && (
           <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-slate-100 rounded-full" onClick={clearTags}>
             <X className="h-3 w-3 text-slate-500" />
           </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
         {tags.slice(0, initialDisplayCount).map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
               <Badge 
                 key={tag}
                 variant="secondary"
                 className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium border-2 transition-colors
                    ${isSelected 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100' 
                        : 'bg-slate-50 border-transparent hover:bg-slate-100 text-slate-600'
                    }
                 `}
                 onClick={() => toggleTag(tag)}
               >
                 {tag}
               </Badge>
            )
         })}

         {tags.length > initialDisplayCount && (
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200">
                     <MoreHorizontal className="h-4 w-4 text-slate-600" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[280px] p-3" align="start">
                  <div className="relative mb-2">
                     <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                     <Input 
                       placeholder="Search" 
                       className="pl-8 h-9 rounded-full border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-300"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
                  <div className="max-h-[200px] overflow-y-auto space-y-1">
                     {filteredTags.slice(initialDisplayCount).length > 0 ? (
                        filteredTags.slice(initialDisplayCount).map(tag => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <div 
                                    key={tag}
                                    className={`flex items-center justify-between px-3 py-2 rounded-full cursor-pointer text-sm transition-colors
                                        ${isSelected ? 'bg-blue-50 border-2 border-blue-500 text-blue-700' : 'bg-slate-50 border-2 border-transparent text-slate-600 hover:bg-slate-100'}
                                    `}
                                    onClick={() => toggleTag(tag)}
                                >
                                    <span>{tag}</span>
                                    {isSelected && <Check className="h-3 w-3 text-blue-600" />}
                                </div>
                            )
                        })
                     ) : (
                        <p className="text-xs text-slate-400 text-center py-2">No more tags found</p>
                     )}
                  </div>
               </PopoverContent>
            </Popover>
         )}
      </div>
    </div>
  );
};

export default Tags;
