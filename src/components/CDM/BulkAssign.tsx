import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BulkAssignProps {
  bulkAssignDialogOpen: boolean;
  bulkAssignDialogClose: () => void;
  letterIds: any[];
  assignUser: any;
  fetchData: any;
  loading: boolean;
}

export const BulkAssign = ({
  bulkAssignDialogOpen,
  bulkAssignDialogClose,
  letterIds,
}: BulkAssignProps) => {
  return (
    <Dialog open={bulkAssignDialogOpen} onOpenChange={bulkAssignDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Assign</DialogTitle>
          <DialogDescription>
            Assign {letterIds.length} documents to a user.
          </DialogDescription>
        </DialogHeader>
        <div>
          {/* User selection logic */}
          Placeholder for Assignee Selection
        </div>
      </DialogContent>
    </Dialog>
  );
};
