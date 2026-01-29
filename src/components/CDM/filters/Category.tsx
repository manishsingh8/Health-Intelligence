import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, X, Check } from "lucide-react";
import { MOCK_FILTER_DATA } from '@/constants/CDMData';

interface CategoryProps {
  selectedCategories: { id: number; payerName: string }[];
  setSelectedCategories: (categories: { id: number; payerName: string }[]) => void;
}

const Category = ({ selectedCategories, setSelectedCategories }: CategoryProps) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const categories = MOCK_FILTER_DATA.payerPortals;
  const initialDisplayCount = 5;

  const toggleCategory = (category: { id: number; payerName: string }) => {
    if (selectedCategories.some(c => c.id === category.id)) {
      setSelectedCategories(selectedCategories.filter(c => c.id !== category.id));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearCategories = () => setSelectedCategories([]);

  const filteredCategories = categories.filter(c => 
    c.payerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-medium text-sm text-slate-700">Category ({selectedCategories.length})</h4>
        {selectedCategories.length > 0 && (
           <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-slate-100 rounded-full" onClick={clearCategories}>
             <X className="h-3 w-3 text-slate-500" />
           </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
         {categories.slice(0, initialDisplayCount).map(category => {
            const isSelected = selectedCategories.some(c => c.id === category.id);
            return (
               <Badge 
                 key={category.id}
                 variant="secondary"
                 className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium border-2 transition-colors
                    ${isSelected 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100' 
                        : 'bg-slate-50 border-transparent hover:bg-slate-100 text-slate-600'
                    }
                 `}
                 onClick={() => toggleCategory(category)}
               >
                 {category.payerName}
               </Badge>
            )
         })}

         {categories.length > initialDisplayCount && (
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
                     {filteredCategories.slice(initialDisplayCount).length > 0 ? (
                        filteredCategories.slice(initialDisplayCount).map(category => {
                            const isSelected = selectedCategories.some(c => c.id === category.id);
                            return (
                                <div 
                                    key={category.id}
                                    className={`flex items-center justify-between px-3 py-2 rounded-full cursor-pointer text-sm transition-colors
                                        ${isSelected ? 'bg-blue-50 border-2 border-blue-500 text-blue-700' : 'bg-slate-50 border-2 border-transparent text-slate-600 hover:bg-slate-100'}
                                    `}
                                    onClick={() => toggleCategory(category)}
                                >
                                    <span>{category.payerName}</span>
                                    {isSelected && <Check className="h-3 w-3 text-blue-600" />}
                                </div>
                            )
                        })
                     ) : (
                        <p className="text-xs text-slate-400 text-center py-2">No more categories found</p>
                     )}
                     {/* If searching, show matching ones from initial list too if needed, but for now sticking to more popover */}
                  </div>
               </PopoverContent>
            </Popover>
         )}
      </div>
    </div>
  );
};

export default Category;
