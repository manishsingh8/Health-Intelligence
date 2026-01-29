import { Handle, Position, type HandleType } from "reactflow";
import { Button } from "@/components/ui/Button";
import PlusIcon from "@/assets/icons/plus-icon.svg";
import Logo from "@/assets/icons/rp-logo-icon.svg";

type HandlePosition = keyof typeof Position; // 'Left' | 'Right' | 'Top' | 'Bottom'

interface HandleConfig {
  position: HandlePosition;
  type: HandleType;
  id?: string;
}

interface AgentNodeData {
  label: string;
  showAddButton?: boolean;
  showLogo: boolean;
  handles?: HandleConfig[]; // 👈 dynamic handle support
}

interface AgentNodeProps {
  data: AgentNodeData;
}

export default function AgentNode({ data }: AgentNodeProps) {
  const sizeClasses = data.showLogo ? "w-150 h-30" : "w-70 h-25";

  // Group handles by their position (Left, Right, Top, Bottom)
  const groupedHandles =
    data.handles?.reduce((acc, handle) => {
      acc[handle.position] = acc[handle.position] || [];
      acc[handle.position].push(handle);
      return acc;
    }, {} as Record<HandlePosition, HandleConfig[]>) || {};

  // Auto position handles evenly based on count
  const getOffsetStyle = (
    position: HandlePosition,
    index: number,
    total: number
  ): React.CSSProperties => {
    const spacing = 100 / (total + 1);
    const offset = spacing * (index + 1);

    if (position === "Left" || position === "Right") {
      return { top: `${offset}%`, transform: "translateY(-50%)" };
    }
    if (position === "Top" || position === "Bottom") {
      return { left: `${offset}%`, transform: "translateX(-50%)" };
    }
    return {};
  };

  return (
    <div
      className={`pointer-events-none flex items-center justify-center bg-card border border-card-border rounded-3xl shadow-md hover-elevate min-w-[200px] relative ${sizeClasses} w-[900px]`}
      style={{
        backdropFilter: "blur(3.2908897399902344px)",
        WebkitBackdropFilter: "blur(3.2908897399902344px)",
        boxShadow: "0px 0px 20.57px 0px #24956333",
      }}
    >
      <div className="pointer-events-auto w-full h-full flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-semibold text-card-foreground"
            data-testid={`text-${data.label}`}
          >
            {data.label}
          </span>
          {data.showLogo && (
            <img src={Logo} className="w-7 h-8 animate-spin" alt="logo" />
          )}
        </div>
      </div>

      {data.showAddButton && (
        <Button
          size="icon"
          className="absolute -top-[1px] -right-[1px] h-8 w-8 rounded-full shadow-md"
          data-testid="button-add-connection"
          onClick={() => console.log("Add connection clicked")}
        >
          <img src={PlusIcon} alt="Add Connection" className="w-12 h-12" />
        </Button>
      )}

      {/* Dynamic Handle Rendering */}
      {(
        Object.entries(groupedHandles) as [HandlePosition, HandleConfig[]][]
      ).map(([position, handles]) =>
        handles.map((handle, index) => (
          <Handle
            key={`${position}-${index}`}
            type={handle.type}
            id={handle.id}
            position={Position[position]}
            className="w-2 h-2 !bg-primary absolute"
            style={getOffsetStyle(position, index, handles.length)}
          />
        ))
      )}
    </div>
  );
}
