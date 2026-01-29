import { ModalWrapper } from "./ModalWrapper";
import { Button } from "@/components/ui/Button";
export const ICANModal = ({ onClose }: { onClose: () => void }) => (
  <ModalWrapper title="iCAN AI Analysis" onClose={onClose}>
    <div className="text-center py-10">
      <p className="text-red-500 font-medium">
        Failed to analyze data. Please try again.
      </p>
      <Button
        variant="outline"
        data-testid="button-edit"
        className="gap-2 text-red-500 cursor-pointer border border-red-500  hover:text-red-500 
    hover:border-red-500
    hover:bg-transparent mt-2"
        onClick={onClose}
      >
        Retry
      </Button>
    </div>
  </ModalWrapper>
);
