import { NodeDef, NodeType } from "@/node";
import { transform } from "lodash";

const nodes = transform(
  {
    database: {
      name: "Giant Database",
      type: NodeType.Source,
      out: 1,
    },
    cloud: {
      name: "Trendy Cloud",
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
    analyze: {
      name: "Deep Analyzer",
      type: NodeType.Processor,
      in: 2,
      out: 1,
    },
    mangle: {
      name: "Mighty Mangler",
      type: NodeType.Processor,
      in: 2,
      out: 1,
    },
    patch: {
      name: "Reliable Patcher",
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
    api: {
      name: "Restful API",
      type: NodeType.Output,
      in: 1,
    },
    chart: {
      name: "Insightul Chart",
      type: NodeType.Output,
      in: 1,
    },
    printer: {
      name: "Pretty Printer",
      type: NodeType.Output,
      in: 1,
    },
    trash: {
      name: "Grimy Trashbin",
      type: NodeType.Output,
      in: 1,
    },
  },
  (nodes: Record<string, NodeDef>, options, id) => {
    nodes[id] = new NodeDef({ id, ...options });
  }
);

export default nodes;
