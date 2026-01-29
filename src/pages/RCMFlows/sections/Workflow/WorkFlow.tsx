import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  Background,
  ConnectionMode,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

import IntegrationNode from "./IntegrationNode";
import AgentNode from "./AgentNode";
import EMRNode from "./EMRNode";
import AgentToolNode from "./AgentToolsPanel";
import { type Node, type Edge, type NodeMouseHandler } from "reactflow";
import GroupNode from "./GroupNode";
import SubAgentNode from "./SubAgentNode";
import bgImage from "../../../../assets/images/bg-img.png";

interface WorkFlowProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  onNavigateTab?: (value: string) => void;
  setActiveTab?: (value: string) => void;
}

const nodeTypes = {
  integration: IntegrationNode,
  agent: AgentNode,
  emr: EMRNode,
  agentTool: AgentToolNode,
  group: GroupNode,
  subAgent: SubAgentNode,
};

export default function WorkflowPage({
  initialNodes,
  initialEdges,
  setActiveTab,
}: WorkFlowProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onNodeClick: NodeMouseHandler = (_, node) => {
    const data = node?.data;
    if (data?.route) {
      navigate(data.route);
      return;
    }
    if (data?.label && data?.isSetTab) {
      let tabValue = data.label;

      if (data.label === "Intake Workflow Agent") {
        tabValue = "intake";
      } else if (data.label === "Reconciliation Agent") {
        tabValue = "reconciliation";
      } else if (data.label === "Payment Posting Agent") {
        tabValue = "cashPosting";
      }

      sessionStorage.setItem("activetab", tabValue);
      setActiveTab?.(tabValue);
    }
  };

  useEffect(() => {
    const wrapper = reactFlowWrapper.current;

    if (wrapper) {
      const handleWheel = (e: WheelEvent) => {
        if (!e.ctrlKey) {
          e.stopPropagation();
        }
      };
      wrapper.addEventListener("wheel", handleWheel, { passive: true });
      return () => wrapper.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-1 relative pointer-events-none">
        <ReactFlow
          className="cursor-default"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={false}
          panOnDrag={false}
          proOptions={{ hideAttribution: true }}
          onNodeClick={onNodeClick}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Background color="#e5e7eb" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
