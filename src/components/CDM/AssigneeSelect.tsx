import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Search, Check } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { setLetterListTableData, setSelectedUserAssigne } from "@/redux/slices/cdmSlice";
import type { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import type { CDMDocument } from "@/pages/CDM/CDMDashboard.hook";

// Function to get initials from the name
const getAvatarInitials = (name: string) => {
  if (!name) return "";
  const words = name.split(' ');
  const shortName = words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  return shortName.toUpperCase();
};

const colorPalette = [
  '#FF8A80', '#81C784', '#64B5F6', '#FF80AB', '#B39DDB', 
  '#FFB74D', '#FFD54F', '#4DB6AC', '#AED581', '#FFD54F'
];

const getColorByName = (name: string) => {
  if (!name) return '#ADAEB3';
  const charCode = name.charCodeAt(0);
  return colorPalette[charCode % colorPalette.length];
};

interface AssigneeSelectProps {
  rowData: CDMDocument;
  width?: string;
  isBulkAssign?: boolean;
  assignUser?: (isBulk: boolean, payload: any, row: CDMDocument, newValue: any) => void;
}

const AssigneeSelect = ({ 
  rowData, 
  width = "100%", 
  isBulkAssign = false, 
  assignUser 
}: AssigneeSelectProps) => {
  const dispatch = useDispatch();
  const { usersListForAssign, letterListTableData, editClick } = useSelector((state: RootState) => state.cdm);
  
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const user = usersListForAssign.find((u: any) => u.name === rowData?.assignee) || null;
    setSelectedUser(user);
    // Note: dispatching this might have side effects if other components rely on global "selectedUserAssigned"
    // but following the requested logic.
    dispatch(setSelectedUserAssigne(user));
  }, [rowData, usersListForAssign, dispatch]);

  const handleSelect = (user: any) => {
    setSelectedUser(user);
    dispatch(setSelectedUserAssigne(user));
    setOpen(false);
    
    if (!isBulkAssign) {
      const updatedTableData = letterListTableData.map((letter) => {
        if (letter.id === rowData.id) {
          return { ...letter, assignee: user.name };
        }
        return letter;
      });
      dispatch(setLetterListTableData(updatedTableData));
      
      if (assignUser) {
        const payload = { letterIds: [rowData.id], assignUserId: user.id, tags: [] };
        assignUser(false, payload, rowData, user);
      }
    }
  };

  const filteredUsers = usersListForAssign.filter((user: any) => 
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ width }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div 
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-slate-50 transition-all border-2 border-transparent",
              isBulkAssign && "border-slate-200",
              editClick && "border-blue-100 bg-blue-50/10",
              open && "border-blue-200"
            )}
          >
            {selectedUser ? (
              <Avatar className="h-7 w-7">
                <AvatarFallback 
                  style={{ backgroundColor: getColorByName(selectedUser.name), color: 'white', fontSize: '11px' }}
                >
                  {getAvatarInitials(selectedUser.name)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="h-4 w-4 text-slate-400" />
              </div>
            )}
            
            <p className={cn(
              "text-sm font-medium truncate",
              !selectedUser && "text-slate-400"
            )}>
              {selectedUser ? selectedUser.name : (editClick ? 'Select an Assignee' : 'Unassigned')}
            </p>
          </div>
        </PopoverTrigger>
        
        <PopoverContent className="w-[240px] p-0" align="start">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                ref={inputRef}
                placeholder="Search..." 
                className="pl-8 h-9 rounded-md border-2 border-slate-100 focus-visible:ring-0 focus-visible:border-slate-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="max-h-[200px] overflow-y-auto py-1">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user: any) => (
                <div 
                  key={user.id}
                  onClick={() => handleSelect(user)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm transition-colors",
                    selectedUser?.id === user.id ? "bg-blue-50/50 text-blue-700" : "text-slate-600"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-7 w-7">
                       <AvatarFallback 
                        style={{ backgroundColor: getColorByName(user.name), color: 'white', fontSize: '11px' }}
                       >
                         {getAvatarInitials(user.name)}
                       </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  {selectedUser?.id === user.id && <Check className="h-4 w-4 text-blue-600" />}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-xs text-slate-400">
                No users found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AssigneeSelect;
