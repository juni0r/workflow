import { dia, linkTools } from "jointjs";

// Actions
export const removeLink = new dia.ToolsView({
  tools: [
    new linkTools.Remove({
      distance: "50%",
      markup: [
        {
          tagName: "circle",
          selector: "button",
          attributes: {
            r: 7,
            fill: "#f6f6f6",
            stroke: "#ff5148",
            "stroke-width": 2,
            cursor: "pointer",
          },
        },
        {
          tagName: "path",
          selector: "icon",
          attributes: {
            d: "M -3 -3 3 3 M -3 3 3 -3",
            fill: "none",
            stroke: "#ff5148",
            "stroke-width": 2,
            "pointer-events": "none",
          },
        },
      ],
    }),
  ],
});
