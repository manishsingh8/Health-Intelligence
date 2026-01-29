import { Handle, Position } from "reactflow";

interface GroupNodeProps {
  data: {
    label: string;
  };
}

export default function GroupNode({ data }: GroupNodeProps) {
  return (
    <div className="w-full h-full bg-gray-50 rounded-3xl relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-gray-800 font-semibold text-base">
        {data.label}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "transparent" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "transparent" }}
      />
    </div>
  );
}
