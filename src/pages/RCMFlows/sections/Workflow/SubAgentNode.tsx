import { Handle, Position, type HandleType } from "reactflow";
import { Button } from "@/components/ui/Button";
import PlusIcon from "@/assets/icons/plus-icon.svg";
import Logo from "@/assets/images/logo-icon.jpeg";

type HandlePosition = keyof typeof Position;

interface HandleConfig {
  position: HandlePosition;
  type: HandleType;
  id?: string;
}

interface SubAgentNodeProps {
  data: {
    label: string;
    showAddButton?: boolean;
    showLogo: boolean;
    isSecondHandle?: boolean;
    isTwoLeftHandle?: boolean;
    handles?: HandleConfig[];
  };
}

export default function SubAgentNode({ data }: SubAgentNodeProps) {
  const sizeClasses = data.showLogo ? "w-150 h-30" : "w-70 h-25";
  return (
    <div
      className={`pointer-events-none flex items-center justify-center bg-card border border-card-border rounded-3xl shadow-md hover-elevate min-w-[200px] relative ${sizeClasses}`}
      style={{
        backdropFilter: "blur(3.2908897399902344px)",
        WebkitBackdropFilter: "blur(3.2908897399902344px)",
        boxShadow: "0px 0px 20.57px 0px #24956333",
      }}
    >
      <div className="pointer-events-auto w-full h-full flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-semibold text-card-foreground font-medium"
            data-testid={`text-${data.label}`}
          >
            {data.label}
          </span>
          {data.showLogo ? (
            <span>
              <img src={Logo} className="w-7 h-8  animate-spin" />
            </span>
          ) : (
            ""
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

      {data.isTwoLeftHandle ? (
        <>
          <Handle
            type="target"
            position={Position.Left}
            className="w-2 h-2 !bg-primary"
            id="left-2"
            style={{ top: "25%" }}
          />
          <Handle
            type="target"
            position={Position.Left}
            className="w-2 h-2 !bg-primary"
            id="left-3"
            style={{ top: "80%" }}
          />
        </>
      ) : null}
      {data.isSecondHandle ? (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-2 h-2 !bg-primary"
          id="bottom-2"
          style={{ left: "30%" }}
        />
      ) : (
        ""
      )}
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
