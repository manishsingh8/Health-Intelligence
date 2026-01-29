import {
  AudioWaveform,
  // BookOpen,
  Bot,
  Command,
  // Frame,
  GalleryVerticalEnd,
  // Map,
  PieChart,
  // Settings2,
  House,
  BrainCircuit,
  WavesLadder,
} from "lucide-react";

export const SIDEBAR_DATA = {
  user: {
    name: "Manish",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Innoclique",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: House,
      items: [
        {
          title: "Revenue Cycle Intelligence Dashboard",
          url: "/dashboard/rcm-dashboard",
        },
        {
          title: "Healthcare Correspondence Document Intelligence Dashboard",
          url: "/dashboard/hcd-dashboard",
        },
      ],
    },
    {
      title: "RCM Operational Flows",
      url: "/rcm-flows",
      icon: WavesLadder,
    },
    {
      title: "Reconciliation",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Non-Reconciled Queue",
          url: "/variance-queue",
        },
        {
          title: "Reconciliation Summary Report",
          url: "/reconciled-report",
        },
        // {
        //   title: "Adjustments",
        //   url: "/adjustments",
        // },
      ],
    },
    {
      title: "Payment Posting",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Payment Posting Queue",
          url: "/cash-posting-queue",
        },
        {
          title: "Payment Posting Activity Report",
          url: "/cash-posting",
        },
      ],
    },
    {
      title: "CDM",
      url: "/cdm",
      icon: AudioWaveform,
    },
    {
      title: "Document Parser",
      url: "#",
      icon: BrainCircuit,
      items: [
        {
          title: "ERA Document Parser",
          url: "/era-parser",
        },
        {
          title: "EOB Parser",
          url: "/eob-parser",
        },
        {
          title: "BAI Parser",
          url: "/bai-parser",
        },
      ],
    },
  ],
};
