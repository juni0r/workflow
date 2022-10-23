import { shapes } from "jointjs";
import { times } from "lodash";

export enum NodeType {
  Source = "source",
  Processor = "processor",
  Output = "output",
}

interface INodeDef {
  type: NodeType;
  id: string;
  name: string;
  in?: number;
  out?: number;
}

export class NodeDef {
  public type!: NodeType;
  public id!: string;
  public name!: string;
  public in: number = 0;
  public out: number = 0;

  constructor(def: INodeDef) {
    Object.assign(this, def);
  }

  get iconURL() {
    return `/icons/${this.id}.svg`;
  }

  getElement() {
    return getNodeElement(this);
  }
}

export const getNodeElement = (node: NodeDef) =>
  new shapes.standard.BorderedImage({
    size: { width: 64, height: 64 },
    attrs: {
      root: {
        magnet: false,
      },
      label: {
        text: node.name,
        yAlignment: "bottom",
        refY: -20,
        fontSize: 15,
        fill: "#666",
      },
      border: {
        strokeWidth: 0,
      },
      background: {
        fill: "transparent",
      },
      image: {
        href: node.iconURL,
      },
    },
    ports: {
      groups: {
        in: portIn,
        out: portOut,
      },
      items: [
        ...times(node.in, () => ({ group: "in" })),
        ...times(node.out, () => ({ group: "out" })),
      ],
    },
  });

const portIn = {
  position: {
    name: "left",
  },
  attrs: {
    portBody: {
      magnet: "passive",
      r: 7,
      fill: "#0007",
      cursor: "pointer",
    },
  },
  markup: [
    {
      tagName: "circle",
      selector: "portBody",
    },
  ],
};

const portOut = {
  position: {
    name: "right",
  },
  attrs: {
    portBody: {
      magnet: true,
      r: 7,
      fill: "#0007",
      cursor: "pointer",
    },
  },
  markup: [
    {
      tagName: "circle",
      selector: "portBody",
    },
  ],
};
