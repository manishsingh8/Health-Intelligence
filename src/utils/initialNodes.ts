import { type Node, Position } from "reactflow";
import { NODE_UI_CONFIG } from "@/config/nodeUiconfig";

const mapHandles = (handles?: string[]) =>
  handles?.map((id) => ({
    id,
    type: id.includes("bottom") || id === "right" ? "source" : "target",
    position: id.includes("bottom")
      ? Position.Bottom
      : id === "right"
      ? Position.Right
      : id === "top"
      ? Position.Top
      : Position.Left,
  }));

const layoutGroupChildren = (
  nodes: any[],
  startX = 16,
  startY = 40,
  gap = 70
) =>
  nodes.map((node, index) => ({
    ...node,
    position: {
      x: startX,
      y: startY + index * gap,
    },
  }));
const layoutSubAgents = (nodes: any[], startX = 200, y = 300, gap = 330) =>
  nodes.map((node, index) => ({
    ...node,
    position: {
      x: startX + index * gap,
      y,
    },
  }));
export const mapApiNodesToFlowNodes = (apiNodes: any[]): Node[] => {
  const groups = apiNodes.filter((n) => n.nodeType === "group");
  const integrations = apiNodes.filter((n) => n.nodeType === "integration");
  const agents = apiNodes.filter((n) => n.nodeType === "agent");
  const subAgents = apiNodes.filter((n) => n.nodeType === "subAgent");

  /** ---------------- Groups ---------------- */
  const groupNodes: Node[] = groups.map((node, index) => ({
    id: node.id,
    type: "group",
    position: { x: 16 + index * 220, y: 40 },
    style: NODE_UI_CONFIG.group.style,
    data: { label: node.label },
  }));

  /** ---------------- Integrations ---------------- */
  const integrationNodes: Node[] = integrations.map((node) => ({
    id: node.id,
    type: "integration",
    parentId: node.parentId,
    extent: "parent",
    position: { x: 16, y: 0 }, // temp, fixed later
    data: {
      label: node.label,
      icon: node.icon,
    },
  }));

  /** Fix integration layout inside groups */
  const groupedIntegrations = groupNodes.flatMap((group) =>
    layoutGroupChildren(integrationNodes.filter((i) => i.parentId === group.id))
  );

  /** ---------------- Agent ---------------- */
  const agentNodes: Node[] = agents.map((node) => ({
    id: node.id,
    type: "agent",
    position: NODE_UI_CONFIG.agent.position!,
    data: {
      label: node.label,
      route: node.route,
      ...node.flags,
      handles: mapHandles(node.handles),
    },
  }));

  /** ---------------- Sub Agents ---------------- */
  const subAgentNodes = layoutSubAgents(
    subAgents.map((node) => ({
      id: node.id,
      type: "subAgent",
      position: { x: 0, y: 0 },
      data: {
        label: node.label,
        ...node.flags,
        handles: mapHandles(node.handles),
      },
    }))
  );

  return [
    ...groupNodes,
    ...groupedIntegrations,
    ...agentNodes,
    ...subAgentNodes,
  ];
};
