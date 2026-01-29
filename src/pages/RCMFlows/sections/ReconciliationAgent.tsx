// import { RECONCILIATION_DATA } from "@/constants/DashboardData";
// import { MapCard } from "@/components";
import WorkflowPage from "./Workflow/WorkFlow";
import { type Node, type Edge, MarkerType } from "reactflow";
// import { getStatusMeta } from "@/utils/getStatusMeta";

const initialNodes: Node[] = [
  // ---------------- Group 1 ----------------
  {
    id: "config",
    type: "integration",
    position: { x: 16, y: 57 },
    data: { label: "Config", icon: "config" },
  },
  {
    id: "intake-orch",
    type: "agent",
    position: { x: 400, y: 50 },
    data: {
      label: "Reconciliation Agent",
      showLogo: true,
      showAddButton: true,
      // route: "/variance-queue",
      handles: [
        { position: "Left", type: "target", id: "left" },
        { position: "Bottom", type: "source", id: "bottom-1" },
        { position: "Bottom", type: "source", id: "bottom-2" },
        { position: "Bottom", type: "source", id: "bottom-3" },
        { position: "Bottom", type: "source", id: "bottom-4" },
      ],
    },
  },
  {
    id: "bai",
    type: "subAgent",
    position: { x: 200, y: 300 },
    data: {
      label: "Smart Matching Agent",
      showLogo: false,
      showAddButton: true,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },
  {
    id: "edi",
    type: "subAgent",
    position: { x: 530, y: 300 },
    data: {
      label: "Exception Identification Agent",
      showAddButton: true,
      showLogo: false,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },
  {
    id: "correspond",
    type: "subAgent",
    position: { x: 870, y: 300 },
    data: {
      label: "Posting Queue Generator Agent",
      showAddButton: true,
      showLogo: false,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },
  {
    id: "cp",
    type: "subAgent",
    position: { x: 1200, y: 300 },
    data: {
      label: "Data Validation Agent",
      showAddButton: true,
      showLogo: false,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },

  // ---------------- Agent Tools Group ----------------
  {
    id: "group-agent-tools",
    type: "group",
    position: { x: 350, y: 500 },
    style: {
      width: 970,
      height: 170,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 32,
      padding: 10,
    },
    data: { label: "Agent Tools" },
  },
  {
    id: "tool-db",
    type: "agentTool",
    position: { x: 30, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "DB", icon: "db" },
  },
  {
    id: "tool-api",
    type: "agentTool",
    position: { x: 150, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "API", icon: "api" },
  },
  {
    id: "tool-audit",
    type: "agentTool",
    position: { x: 270, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Audit Log", icon: "audit" },
  },
  {
    id: "tool-logs",
    type: "agentTool",
    position: { x: 400, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Agent Logs", icon: "logs" },
  },
  {
    id: "tool-search",
    type: "agentTool",
    position: { x: 540, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Elastic Search", icon: "search" },
  },
  {
    id: "tool-services",
    type: "agentTool",
    position: { x: 700, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Services", icon: "services" },
  },
  {
    id: "tool-vault",
    type: "agentTool",
    position: { x: 830, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Vault", icon: "vault" },
  },

  {
    id: "insight-agent",
    type: "subAgent",
    position: { x: 700, y: 770 },
    data: {
      label: "Insight Agent",
      showAddButton: true,
      handles: [{ position: "Top", type: "target", id: "top" }],
    },
  },

  // ---------------- EMR Group ----------------
];

const initialEdges: Edge[] = [
  {
    id: "config-rcm",
    source: "config",
    target: "intake-orch",
    type: "smoothstep",
    style: { stroke: "#0D74CE", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#0D74CE", // 👈 arrow color
    },
    targetHandle: "left",
  },
  {
    id: "intake-bai",
    source: "intake-orch",
    target: "bai",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom-1",
    targetHandle: "top",
  },
  {
    id: "intake-bai",
    source: "intake-orch",
    target: "edi",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom-2",
    targetHandle: "top",
  },
  {
    id: "intake-corr",
    source: "intake-orch",
    target: "correspond",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom-3",
    targetHandle: "top",
  },

  {
    id: "intake-cp",
    source: "intake-orch",
    target: "cp",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom-4",
    targetHandle: "top",
  },
  {
    id: "recon-log",
    source: "reconciliation",
    target: "tool-logs",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom",
  },
  {
    id: "cash-vault",
    source: "cash-posting",
    target: "tool-vault",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },

  // edge from center to agent tools
  {
    id: "bai-tools",
    source: "bai",
    target: "tool-db",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom",
  },
  {
    id: "edi-agent",
    source: "edi",
    target: "tool-logs",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom",
  },
  {
    id: "cor-services",
    source: "correspond",
    target: "tool-services",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom",
  },
  {
    id: "cp-vault",
    source: "cp",
    target: "tool-vault",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    sourceHandle: "bottom",
  },

  // Agent Tools to Insight Agent connections

  {
    id: "tool-logs-insight",
    source: "tool-search",
    target: "insight-agent",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    targetHandle: "top",
  },
];

const ReconciliationAgent = () => {
  return (
    <div>
      {/* <div className="flex items-center justify-between gap-3 mt-3">
        {RECONCILIATION_DATA.map((item, index) => {
          const { colorClass, image } = getStatusMeta(item.status);
          return (
            <MapCard
              key={index}
              headerText={item.headerText}
              percentage={item.percentage}
              value={item.value}
              status={item.status}
              image={image}
              colorClass={colorClass}
            />
          );
        })}
      </div> */}
      <div
        className="flex justify-center items-center gap-2 p-0 mt-4 mb-4 bg-[#E6EEF4] rounded-3xl"
        style={{
          background:
            "linear-gradient(90deg, rgba(230, 238, 244, 0.8) 0%, rgba(207, 221, 232, 0.8) 49.49%, rgba(195, 202, 230, 0.8) 100%)",
          backdropFilter: "blur(15px)",
        }}
      >
        <WorkflowPage initialNodes={initialNodes} initialEdges={initialEdges} />
      </div>
    </div>
  );
};

export default ReconciliationAgent;
