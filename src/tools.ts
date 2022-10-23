import { dia, linkTools, elementTools } from "jointjs";

const removeButton = [
  {
    tagName: "circle",
    selector: "button",
    attributes: {
      r: 10,
      fill: "#ddd",
      stroke: "#555",
      "stroke-width": 2,
      cursor: "pointer",
    },
  },
  {
    tagName: "path",
    selector: "icon",
    attributes: {
      d: "M -4 -4 4 4 M -4 4 4 -4",
      fill: "none",
      stroke: "#777",
      "stroke-width": 3,
      "pointer-events": "none",
    },
  },
];

export const removeElement = new dia.ToolsView({
  tools: [
    new elementTools.Remove({ x: "50%", y: "100%", markup: removeButton }),
  ],
});

export const removeLink = new dia.ToolsView({
  tools: [
    new linkTools.Remove({
      distance: "50%",
      markup: removeButton,
    }),
  ],
});
