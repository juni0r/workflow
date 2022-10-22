export type WorkflowNodeType = "source" | "processor" | "output";

export class WorkflowNode {
  public type!: WorkflowNodeType;
  public id!: string;
  public name!: string;

  constructor(options: IWorkflowNode) {
    Object.assign(this, options);
  }

  get iconURL() {
    return `/icons/${this.id}.svg`;
  }
}

type IWorkflowNode = Omit<WorkflowNode, "iconURL">;

const nodes: IWorkflowNode[] = [
  {
    id: "database",
    name: "Giant Database",
    type: "source",
  },
  {
    id: "cloud",
    name: "Trendy Cloud",
    type: "source",
  },
  {
    id: "files",
    name: "Ordinary Files",
    type: "source",
  },
  {
    id: "sheet",
    name: "Fancy Sheets",
    type: "source",
  },
  {
    id: "analyze",
    name: "Deep Analyzer",
    type: "processor",
  },
  {
    id: "mangle",
    name: "Mighty Mangler",
    type: "processor",
  },
  {
    id: "patch",
    name: "Reliable Patcher",
    type: "processor",
  },
  {
    id: "process",
    name: "Fast Processor",
    type: "processor",
  },
  {
    id: "api",
    name: "Restful API",
    type: "output",
  },
  {
    id: "chart",
    name: "Insightul Chart",
    type: "output",
  },
  {
    id: "printer",
    name: "Pretty Printer",
    type: "output",
  },
  {
    id: "trash",
    name: "Grimy Trashbin",
    type: "output",
  },
];

export default nodes.map((options) => new WorkflowNode(options));
