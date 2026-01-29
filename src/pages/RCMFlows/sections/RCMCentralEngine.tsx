// import MapCard from "@/components/MapCard/MapCard";
// import { RCM_CENTRAL_ENGINE_DATA } from "@/constants/DashboardData";
import WorkflowPage from "./Workflow/WorkFlow";
import { type Node, type Edge, MarkerType } from "reactflow";
// import { getStatusMeta } from "@/utils/getStatusMeta";

const initialNodes: Node[] = [
  {
    id: "group-integration",
    type: "group",
    position: { x: 50, y: -43 },
    style: {
      display: "flex",
      width: 170,
      height: 300,
      zIndex: -1,
      background: "#F9FAFBFF",
      border: "1px solid #E5E5E5",
      borderRadius: 24,
      padding: 10,
    },
    data: { label: "" },
  },
  {
    id: "scheduler",
    type: "integration",
    position: { x: 25, y: 30 },
    parentId: "group-integration",
    extent: "parent",
    data: { label: "Scheduler", icon: "scheduler" },
  },
  {
    id: "config",
    type: "integration",
    position: { x: 25, y: 160 },
    parentId: "group-integration",
    extent: "parent",
    data: { label: "Config", icon: "config" },
  },
  {
    id: "group-intake",
    type: "group",
    position: { x: 50, y: 340 },
    style: {
      width: 170,
      height: 400,
      zIndex: -1,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 24,
      padding: 10,
    },
    data: { label: "" },
  },
  {
    id: "inbox",
    type: "integration",
    position: { x: 25, y: 25 },
    parentId: "group-intake",
    extent: "parent",
    data: { label: "Email", icon: "inbox" },
  },
  {
    id: "sftp",
    type: "integration",
    position: { x: 25, y: 145 },
    parentId: "group-intake",
    extent: "parent",
    data: { label: "SFTP", icon: "sftp" },
  },
  {
    id: "amazon-s3",
    type: "integration",
    position: { x: 25, y: 265 },
    parentId: "group-intake",
    extent: "parent",
    data: { label: "Cloud Storage", icon: "amazon" },
  },
  {
    id: "rcm-maestro",
    type: "agent",
    position: { x: 490, y: 0 },
    data: {
      label: "RCM Central Engine",
      showAddButton: true,
      showLogo: true,
      isSecondLeftHandle: true,
      route: "/dashboard/rcm-dashboard",
      handles: [
        { position: "Left", type: "target", id: "left" },
        { position: "Left", type: "target", id: "left-2" },
        { position: "Bottom", type: "source", id: "bottom-1" },
        { position: "Bottom", type: "source", id: "bottom-2" },
        { position: "Bottom", type: "source", id: "bottom-3" },
      ],
    },
  },
  {
    id: "intake-orchestrator",
    type: "subAgent",
    position: { x: 400, y: 300 },
    data: {
      label: "Intake Workflow Agent",
      showLogo: false,
      showAddButton: true,
      // route: "/era-parser",
      isSetTab: true,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Left", type: "target", id: "left" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
      isTwoLeftHandle: true,
    },
  },
  {
    id: "reconciliation",
    type: "subAgent",
    position: { x: 800, y: 300 },
    data: {
      label: "Reconciliation Agent",
      // route: "/variance-queue",
      showAddButton: true,
      isSetTab: true,
      showLogo: false,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },
  {
    id: "cash-posting",
    type: "subAgent",
    position: { x: 1200, y: 300 },
    data: {
      label: "Payment Posting Agent",
      showAddButton: true,
      showLogo: false,
      isSetTab: true,
      // route: "/cash-posting-queue",
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Right", type: "Source", id: "right" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },

  // ---------------- Agent Tools Group ----------------
  {
    id: "group-agent-tools",
    type: "group",
    position: { x: 481, y: 500 },
    style: {
      // zIndex:-1,
      width: 970,
      height: 170,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      backdropFilter: "blur(3.2908897399902344px)",
      boxShadow: "0px 0px 20.57px 0px #0000001A",
      borderRadius: 24,
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
    position: { x: 800, y: 770 },
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
    position: { x: 1600, y: 175 },
    style: {
      zIndex: -1,
      width: 140,
      height: 350,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 24,
      padding: 10,
    },
    data: { label: "" },
  },
  {
    id: "emr-1",
    type: "emr",
    position: { x: 25, y: 25 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR 1",
      isLeftHandle: true,
      handles: [{ position: "Left", type: "target", id: "left" }],
    },
  },
  {
    id: "emr-2",
    type: "emr",
    position: { x: 25, y: 130 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR 2",
      isLeftHandle: true,
      handles: [{ position: "Left", type: "target", id: "left" }],
    },
  },
  {
    id: "emr-n",
    type: "emr",
    position: { x: 25, y: 235 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR n",
      isLeftHandle: true,
      handles: [{ position: "Left", type: "target", id: "left" }],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "scheduler-rcm",
    source: "scheduler",
    target: "rcm-maestro",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#0D74CE", // 👈 arrow color
    },
    style: { stroke: "#0D74CE", strokeWidth: 2 },
  },
  {
    id: "config-rcm",
    source: "config",
    target: "rcm-maestro",
    type: "bezier",
    // animated: true,
    style: { stroke: "#0D74CE", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#0D74CE", // 👈 arrow color
    },
    targetHandle: "left-2",
  },
  {
    id: "inbox-intake",
    source: "inbox",
    target: "intake-orchestrator",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
    targetHandle: "left-2",
  },
  {
    id: "sftp-intake",
    source: "sftp",
    target: "intake-orchestrator",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
    targetHandle: "left",
  },
  {
    id: "s3-intake",
    source: "amazon-s3",
    target: "intake-orchestrator",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
    targetHandle: "left-3",
  },
  {
    id: "rcm-intake",
    source: "rcm-maestro",
    target: "intake-orchestrator",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom-1",
    targetHandle: "top",
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },
  {
    id: "rcm-recon",
    source: "rcm-maestro",
    target: "reconciliation",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom-2",
    targetHandle: "top",
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },
  {
    id: "rcm-cash",
    source: "rcm-maestro",
    target: "cash-posting",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom-3",
    targetHandle: "top",
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },

  {
    id: "intake-api",
    source: "intake-orchestrator",
    target: "tool-db",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom",
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },
  {
    id: "recon-log",
    source: "reconciliation",
    target: "tool-logs",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom",
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },
  {
    id: "cash-vault",
    source: "cash-posting",
    target: "tool-vault",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom",
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },

  // Agent Tools to Insight Agent connections

  {
    id: "tool-logs-insight",
    source: "tool-search",
    target: "insight-agent",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
    targetHandle: "top",
  },

  {
    id: "cash-emr1",
    source: "cash-posting",
    target: "emr-1",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-emr2",
    source: "cash-posting",
    target: "emr-2",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-emrn",
    source: "cash-posting",
    target: "emr-n",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed, // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
  },
];

const RCMCentralEngine = ({ setActiveTab }: any) => {
  return (
    <div>
      {/* <div className="flex items-center justify-between gap-3 mt-3">
        {RCM_CENTRAL_ENGINE_DATA.map((item, index) => {
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
        <WorkflowPage
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default RCMCentralEngine;
