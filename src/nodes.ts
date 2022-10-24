import { NodeDef, NodeType, type NodeStore } from "@/node";
import { transform } from "lodash";

const nodes: NodeStore = transform(
  {
    database: {
      name: "Huge Database",
      type: NodeType.Source,
      out: 1,
    },
    cloud: {
      name: "Some Cloud",
      type: NodeType.Source,
      out: 1,
    },
    files: {
      name: "Ordinary Files",
      type: NodeType.Source,
      out: 1,
    },
    sheet: {
      name: "Fancy Sheets",
      type: NodeType.Source,
      out: 1,
    },
    stream: {
      name: "Steady Stream",
      type: NodeType.Source,
      out: 1,
    },
    device: {
      name: "Nice Device",
      type: NodeType.Source,
      out: 1,
    },
    analyze: {
      name: "Deep Analyzer",
      type: NodeType.Processor,
      in: 1,
      out: 1,
    },
    mangle: {
      name: "Fierce Mangler",
      type: NodeType.Processor,
      in: 2,
      out: 1,
    },
    magic: {
      name: "Mighty Magic",
      type: NodeType.Processor,
      in: 1,
      out: 1,
    },
    process: {
      name: "Fast Processor",
      type: NodeType.Processor,
      in: 3,
      out: 1,
    },
    rocket: {
      name: "Rocket Science",
      type: NodeType.Processor,
      in: 1,
      out: 1,
    },
    flame: {
      name: "Slow Burner",
      type: NodeType.Processor,
      in: 2,
      out: 1,
    },
    api: {
      name: "Restful API",
      type: NodeType.Output,
      in: 1,
    },
    analytics: {
      name: "Elaborate Curve",
      type: NodeType.Output,
      in: 1,
    },
    printer: {
      name: "Pretty Printer",
      type: NodeType.Output,
      in: 1,
    },
    chart: {
      name: "Insightful Chart",
      type: NodeType.Output,
      in: 1,
    },
    mail: {
      name: "Spam Campaign",
      type: NodeType.Output,
      in: 1,
    },
    disc: {
      name: "Just Save",
      type: NodeType.Output,
      in: 1,
    },
  },
  (nodes, options, id) => {
    nodes[id] = new NodeDef({ id, ...options });
  }
);

export default nodes;
