type NodeType = "group" | "integration" | "agent" | "subAgent";

interface UiConfig {
  type: NodeType;
  position?: { x: number; y: number };
  style?: React.CSSProperties;
}

export const NODE_UI_CONFIG: Record<NodeType, UiConfig> = {
  group: {
    type: "group",
    style: {
      width: 170,
      borderRadius: 24,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      padding: 10,
      zIndex: -1,
    },
  },

  integration: {
    type: "integration",
  },

  agent: {
    type: "agent",
    position: { x: 400, y: 50 }, // default anchor
  },

  subAgent: {
    type: "subAgent",
  },
};
