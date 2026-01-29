import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, X, Check } from "lucide-react";
import { MOCK_FILTER_DATA } from '@/constants/CDMData';

interface AssigneProps {
  selectedUsers: { id: number; name: string }[];
  setSelectedUsers: (users: { id: number; name: string }[]) => void;
}

const Assigne = ({ selectedUsers, setSelectedUsers }: AssigneProps) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const users = MOCK_FILTER_DATA.users;
  const initialDisplayCount = 7;
  const colorPalette = ['#FF8A80', '#81C784', '#64B5F6', '#FF80AB', '#B39DDB', '#FFB74D', '#FFD54F'];

  const toggleUser = (user: { id: number; name: string }) => {
    if (selectedUsers.some(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const clearUsers = () => setSelectedUsers([]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();
  const getColor = (id: number) => colorPalette[id % colorPalette.length];

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="font-medium text-sm text-slate-700">Assignee ({selectedUsers.length})</h4>
        {selectedUsers.length > 0 && (
           <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-slate-100 rounded-full" onClick={clearUsers}>
             <X className="h-3 w-3 text-slate-500" />
           </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
         {users.slice(0, initialDisplayCount).map(user => {
            const isSelected = selectedUsers.some(u => u.id === user.id);
            return (
               <div 
                  key={user.id} 
                  className={`relative cursor-pointer rounded-full transition-all ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                  onClick={() => toggleUser(user)}
                  title={user.name}
               >
                 <Avatar className="h-9 w-9 border-2 border-white">
                    <AvatarFallback style={{ backgroundColor: getColor(user.id), color: 'white', fontSize: '10px' }}>
                        {getInitials(user.name)}
                    </AvatarFallback>
                 </Avatar>
               </div>
            )
         })}

         {users.length > initialDisplayCount && (
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200">
                     <MoreHorizontal className="h-4 w-4 text-slate-600" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[300px] p-3" align="start">
                  <div className="relative mb-2">
                     <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                     <Input 
                       placeholder="Search Users" 
                       className="pl-8 h-9 rounded-full border-2 border-slate-200 focus-visible:ring-0 focus-visible:border-slate-300"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                     />
                  </div>
                  <div className="max-h-[200px] overflow-y-auto space-y-1">
                     {filteredUsers.slice(initialDisplayCount).map(user => {
                          const isSelected = selectedUsers.some(u => u.id === user.id);
                          return (
                            <div 
                                key={user.id}
                                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-slate-50 transition-colors
                                    ${isSelected ? 'bg-blue-50' : ''}
                                `}
                                onClick={() => toggleUser(user)}
                            >
                                <div className="flex items-center gap-3">
                                     <Avatar className="h-8 w-8">
                                        <AvatarFallback style={{ backgroundColor: getColor(user.id), color: 'white', fontSize: '10px' }}>
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                     </Avatar>
                                     <span className="text-sm font-medium text-slate-700">{user.name}</span>
                                </div>
                                {isSelected && <Check className="h-4 w-4 text-blue-600" />}
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

export default Assigne;
