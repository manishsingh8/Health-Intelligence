
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { MOCK_FILTER_DATA } from '@/constants/CDMData';

interface SearchProps {
  searchType: string;
  setSearchType: (type: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const Search = ({ searchType, setSearchType, searchValue, setSearchValue }: SearchProps) => {
  const searchFields = MOCK_FILTER_DATA.searchField;

  return (
    <div className="mb-4">
      <h4 className="font-medium text-sm text-slate-700 mb-2">Search</h4>
      <div className="flex gap-2">
         <div className="relative w-[140px]">
             <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full h-10 appearance-none rounded-full border-2 border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
             >
                <option value="" disabled>Select Field</option>
                {searchFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
             </select>
         </div>

         <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
               placeholder="Search..." 
               className="pl-9 h-10 rounded-full border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-300"
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
            />
         </div>
      </div>
    </div>
  );
};

export default Search;
