// Static fallback stack data, used when the API is unavailable.
// Tool names stay untranslated (they're proper nouns); category labels
// come from locale keys `stack.categories.*`.

export interface StackTool {
  name: string;
  /** 0-100, rendered as a proficiency meter */
  level: number;
  note?: string;
}

export interface StackCategory {
  key: "network" | "web" | "data";
  icon: string;
  tools: StackTool[];
}

export const STACK_CATEGORIES: StackCategory[] = [
  {
    key: "network",
    icon: "network",
    tools: [
      { name: "Cisco IOS", level: 85, note: "switching, routing, ACL" },
      { name: "Mikrotik RouterOS", level: 90, note: "daily driver" },
      { name: "Linux", level: 88, note: "Debian / Ubuntu server" },
      { name: "PRTG / Grafana", level: 80, note: "monitoring & alerting" },
      { name: "Wireshark", level: 78, note: "packet-level debugging" },
    ],
  },
  {
    key: "web",
    icon: "code",
    tools: [
      { name: "React", level: 86, note: "18/19, hooks-first" },
      { name: "TypeScript", level: 82 },
      { name: "Next.js / Vite", level: 80 },
      { name: "Tailwind CSS", level: 90, note: "design tokens, no utility soup" },
      { name: "Node.js / Express", level: 78 },
    ],
  },
  {
    key: "data",
    icon: "sparkles",
    tools: [
      { name: "LLM tooling", level: 84, note: "agents, RAG, pipelines" },
      { name: "MongoDB", level: 76 },
      { name: "PostgreSQL", level: 72 },
      { name: "Docker", level: 78, note: "homelab orchestration" },
      { name: "n8n / automation", level: 82 },
    ],
  },
];
