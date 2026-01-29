import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Bot, Eye } from "lucide-react";

type ActionModalType = "ican" | "note" | "exception" | "source" | null;

interface RowActionsProps {
  rowId: string;
  onOpenModal: (type: ActionModalType) => void;
}

export const RowActions = ({ onOpenModal }: RowActionsProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (type: ActionModalType) => {
    setOpen(false);
    onOpenModal(type);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        className="p-2 hover:bg-muted rounded-md"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute left-2 z-50 w-60 rounded-md border bg-white shadow-lg">
          <ul className="py-1 text-sm">
            <li
              onClick={(e) => {
                e.stopPropagation();
                handleClick("ican");
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-muted cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              Ask iCAN Help
            </li>

            <li
              onClick={(e) => {
                e.stopPropagation();
                handleClick("note");
              }}
              className="flex items-center px-4 py-2 hover:bg-muted cursor-pointer"
            >
              Add Note
            </li>

            <li
              onClick={(e) => {
                e.stopPropagation();
                handleClick("exception");
              }}
              className="flex items-center px-4 py-2 hover:bg-muted cursor-pointer"
            >
              Create Exception
            </li>

            <li className="border-t my-1" />

            <li
              onClick={(e) => {
                e.stopPropagation();
                handleClick("source");
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-muted cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              View Source Document
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
