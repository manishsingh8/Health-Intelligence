import { ModalWrapper } from "./ModalWrapper";
import { Button } from "@/components/ui/Button";

export const AddNoteModal = ({ onClose }: { onClose: () => void }) => (
  <ModalWrapper title="Notes for tx-1" onClose={onClose}>
    <div className="font-semibold">Add Note</div>
    <textarea
      className="w-full border rounded p-2"
      placeholder="Type your note here..."
    />
    <div className="mt-1 flex justify-end gap-2">
      <Button
        variant="default"
        className="bg-[#249563] hover:bg-green-700 cursor-pointer "
        data-testid="button-export"
      >
        Add Note
      </Button>
    </div>
    <div>
      <div className="font-semibold">Note History (0)</div>
      <div className="flex h-80 border border-grey p-2 rounded mt-1 justify-center">
        No notes yet.Add note above
      </div>
    </div>
    <div className="flex justify-end mt-2">
      <Button
        variant="outline"
        data-testid="button-edit"
        className="gap-2"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  </ModalWrapper>
);
