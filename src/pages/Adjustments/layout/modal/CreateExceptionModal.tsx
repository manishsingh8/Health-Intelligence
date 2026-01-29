import { ModalWrapper } from "./ModalWrapper";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export const CreateExceptionModal = ({ onClose }: { onClose: () => void }) => (
  <ModalWrapper title="Create New Exception" onClose={onClose}>
    <div className="text-green-600">
      Create a trackable exception for this issue. The exception will be added
      to the work-list and can be assigned to a team member.
    </div>
    <div className="space-y-4 mt-3">
      {/* Type */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-3">
        <Label htmlFor="type">Type</Label>
        <Select>
          <SelectTrigger id="type" className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bug">Bug</SelectItem>
            <SelectItem value="feature">Feature</SelectItem>
            <SelectItem value="incident">Incident</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Severity */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-3">
        <Label htmlFor="severity">Severity</Label>
        <Select>
          <SelectTrigger id="severity" className="w-full">
            <SelectValue placeholder="Select severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Amount */}
      <div className="grid grid-cols-[120px_1fr] items-center gap-3">
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" placeholder="Enter amount" />
      </div>

      {/* Description */}
      <div className="grid grid-cols-[120px_1fr] gap-3">
        <Label htmlFor="description" className="pt-2">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the issue..."
          rows={4}
        />
      </div>
    </div>

    <div className="mt-4 flex justify-end gap-2">
      <Button
        onClick={onClose}
        variant="outline"
        data-testid="button-edit"
        className="gap-2"
      >
        Close
      </Button>
      <Button
        variant="default"
        className="bg-[#249563] hover:bg-green-700 cursor-pointer"
        data-testid="button-export"
      >
        <Plus className="h-4 w-4" />
        Create Exception
      </Button>
    </div>
  </ModalWrapper>
);
