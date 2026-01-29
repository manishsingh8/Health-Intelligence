import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export default function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
}: ZoomControlsProps) {
  return (
    <div className="bg-card border border-card-border rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={onZoomOut}
        data-testid="button-zoom-out"
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span
        className="text-sm font-medium text-foreground min-w-[50px] text-center"
        data-testid="text-zoom-level"
      >
        {Math.round(zoom * 100)}%
      </span>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={onZoomIn}
        data-testid="button-zoom-in"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
