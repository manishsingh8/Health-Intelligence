import { Handle, Position, type HandleType } from "reactflow";
import EMRIcon from "@/assets/icons/emr.svg";

type HandlePosition = keyof typeof Position; 

interface HandleConfig {
  position: HandlePosition;
  type: HandleType;
  id?: string;
}

interface EMRNodeProps {
  data: {
    label: string;
    isLeftHandle?: boolean;
    isRightHandle?: boolean;
    handles?: HandleConfig[];
  };
}

export default function EMRNode({ data }: EMRNodeProps) {
  return (
    <div
      className="bg-card border border-card-border rounded-lg p-3 shadow-sm hover-elevate min-w-[90px]"
      style={{
        backdropFilter: "blur(3.2908897399902344px)", 
        WebkitBackdropFilter: "blur(3.2908897399902344px)", 
        boxShadow: "0px 0px 20.57px 0px #24956333", 
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
          <img src={EMRIcon} alt="icon" className="w-12 h-12" />
        </div>
        <span
          className="text-md font-medium text-foreground text-center"
          data-testid={`text-${data.label}`}
        >
          {data.label}
        </span>
      </div>
      {data.handles?.map((handle: HandleConfig, index: number) => (
        <Handle
          key={handle.id || index}
          type={handle.type}
          position={Position[handle.position]}
          id={handle.id}
          className={`w-2 h-2 !bg-primary`}
        />
      ))}
    </div>
  );
}
