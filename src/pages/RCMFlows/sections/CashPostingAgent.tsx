// import { CASH_POSTING_DATA } from "@/constants/DashboardData";
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
  // ---------------- Group 2 ----------------

  // ---------------- Center Agents ----------------
  {
    id: "rcm-maestro",
    type: "agent",
    position: { x: 400, y: 50 },
    data: {
      label: "Payment Posting Agent",
      showLogo: true,
      showAddButton: true,
      // route: "/cash-posting-queue",
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
    id: "intake-orchestrator",
    type: "subAgent",
    position: { x: 200, y: 300 },
    data: {
      label: "Posting Agent-EMR1",
      showLogo: false,
      showAddButton: true,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
        { position: "Left", type: "target", id: "left" },
      ],
      // isSecondHandle: true,
    },
  },
  {
    id: "reconciliation",
    type: "subAgent",
    position: { x: 530, y: 300 },
    data: {
      label: "Posting Agent-EMR2",
      showAddButton: true,
      showLogo: false,
      isSecondHandle: true,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },
  {
    id: "cash-posting",
    type: "subAgent",
    position: { x: 870, y: 300 },
    data: {
      label: "Posting Agent-EMR3",
      showAddButton: true,
      showLogo: false,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },
  {
    id: "cpn",
    type: "subAgent",
    position: { x: 1200, y: 300 },
    data: {
      label: "Posting Agent-EMR Series",
      showAddButton: true,
      showLogo: false,
      isSecondHandle: true,
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
    position: { x: 380, y: 600 },
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
    position: { x: 700, y: 850 },
    data: {
      label: "Insight Agent",
      showAddButton: true,
      handles: [{ position: "Top", type: "target", id: "top" }],
    },
  },

  // ---------------- EMR Group ----------------
  {
    id: "group-emr",
    type: "group",
    position: { x: 0, y: 300 },
    style: {
      width: 140,
      height: 350,
      zIndex: -1,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 24,
      padding: 10,
    },
    data: { label: "" },
  },
  {
    id: "emr1",
    type: "emr",
    position: { x: 25, y: 25 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR 1",
      isRightHandle: true,
      handles: [{ position: "Right", type: "source", id: "right" }],
    },
  },
  {
    id: "emr2",
    type: "emr",
    position: { x: 25, y: 130 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR 2",
      isRightHandle: true,
      handles: [{ position: "Right", type: "source", id: "right" }],
    },
  },
  {
    id: "emr3",
    type: "emr",
    position: { x: 25, y: 235 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR n",
      isRightHandle: true,
      handles: [{ position: "Right", type: "source", id: "right" }],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "config-rcm",
    source: "config",
    target: "rcm-maestro",
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
    id: "rcm-recon",
    source: "rcm-maestro",
    target: "reconciliation",
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
    id: "rcm-intake",
    source: "rcm-maestro",
    target: "intake-orchestrator",
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
    id: "rcm-cash",
    source: "rcm-maestro",
    target: "cash-posting",
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
    id: "rcm-cpn",
    source: "rcm-maestro",
    target: "cpn",
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
    id: "intake-api",
    source: "intake-orchestrator",
    target: "tool-api",
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
    id: "cash-vault",
    source: "cpn",
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

  // emr connection
  {
    id: "emr1-cp1",
    source: "emr1",
    target: "intake-orchestrator",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    targetHandle: "left",
  },
  {
    id: "emr2-cp2",
    source: "emr2",
    target: "reconciliation",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    targetHandle: "bottom-2",
  },
  {
    id: "emr3-cp3",
    source: "emr3",
    target: "cpn",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    targetHandle: "bottom-2",
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
  {
    id: "inbox-intake",
    source: "inbox",
    target: "intake-orchestrator",
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
  {
    id: "sftp-intake",
    source: "sftp",
    target: "intake-orchestrator",
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
  {
    id: "s3-intake",
    source: "amazon-s3",
    target: "intake-orchestrator",
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
  {
    id: "cash-emr1",
    source: "cash-posting",
    target: "emr-1",
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
  {
    id: "cash-emr2",
    source: "cash-posting",
    target: "emr-2",
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
  {
    id: "cash-emrn",
    source: "cash-posting",
    target: "emr-n",
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
];

const CashPostingAgent = () => {
  return (
    <div>
      {/* <div className="flex items-center justify-between gap-3 mt-3">
        {CASH_POSTING_DATA.map((item, index) => {
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
        className="flex justify-between gap-2 p-0 mt-4 mb-4 bg-[#E6EEF4] rounded-3xl"
        style={{
          background:
            "linear-gradient(90deg, rgba(230, 238, 244, 0.8) 0%, rgba(207, 221, 232, 0.8) 49.49%, rgba(195, 202, 230, 0.8) 100%)",
        }}
      >
        <WorkflowPage initialNodes={initialNodes} initialEdges={initialEdges} />
      </div>
    </div>
  );
};

export default CashPostingAgent;
