import { NodeDef, NodeType } from "@/node";

export const getNode = (id: string) => nodes.find((node) => node.id === id);
export const getNodeElement = (id: string) => getNode(id)?.getElement();

const nodes = [
  {
    id: "database",
    name: "Huge Database",
    type: NodeType.Source,
    out: 1,
  },
  {
    id: "cloud",
    name: "Some Cloud",
    type: NodeType.Source,
    out: 1,
  },
  {
    id: "files",
    name: "Ordinary Files",
    type: NodeType.Source,
    out: 1,
  },
  {
    id: "sheet",
    name: "Fancy Sheets",
    type: NodeType.Source,
    out: 1,
  },
  {
    id: "stream",
    name: "Steady Stream",
    type: NodeType.Source,
    out: 1,
  },
  {
    id: "device",
    name: "Nice Device",
    type: NodeType.Source,
    out: 1,
  },
  {
    id: "analyze",
    name: "Deep Analyzer",
    type: NodeType.Processor,
    in: 1,
    out: 1,
  },
  {
    id: "mangle",
    name: "Fierce Mangler",
    type: NodeType.Processor,
    in: 2,
    out: 1,
  },
  {
    id: "magic",
    name: "Mighty Magic",
    type: NodeType.Processor,
    in: 1,
    out: 1,
  },
  {
    id: "process",
    name: "Fast Processor",
    type: NodeType.Processor,
    in: 3,
    out: 1,
  },
  {
    id: "rocket",
    name: "Rocket Science",
    type: NodeType.Processor,
    in: 1,
    out: 1,
  },
  {
    id: "flame",
    name: "Slow Burner",
    type: NodeType.Processor,
    in: 2,
    out: 1,
  },
  {
    id: "api",
    name: "Restful API",
    type: NodeType.Output,
    in: 1,
  },
  {
    id: "analytics",
    name: "Elaborate Curve",
    type: NodeType.Output,
    in: 1,
  },
  {
    id: "printer",
    name: "Pretty Printer",
    type: NodeType.Output,
    in: 1,
  },
  {
    id: "chart",
    name: "Insightful Chart",
    type: NodeType.Output,
    in: 1,
  },
  {
    id: "mail",
    name: "Spam Campaign",
    type: NodeType.Output,
    in: 1,
  },
  {
    id: "disc",
    name: "Just Save",
    type: NodeType.Output,
    in: 1,
  },
].map((options) => new NodeDef(options));

export default nodes;
