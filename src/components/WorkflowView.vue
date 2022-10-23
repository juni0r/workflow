<script setup lang="ts">
import { ref, onMounted } from "vue";
import { dia, shapes, connectors } from "jointjs";
import { removeLink, removeElement } from "@/tools";

import nodes from "@/nodes";

// const { TangentDirections } = connectors.Curve;

const workflow = ref<HTMLElement>();
const graph = ref<dia.Graph>();
const paper = ref<dia.Paper>();

onMounted(() => {
  graph.value = new dia.Graph({}, { cellNamespace: shapes });
  paper.value = new dia.Paper({
    el: workflow.value,
    model: graph.value,
    width: "auto",
    height: "auto",
    gridSize: 1,
    cellViewNamespace: shapes,
    markAvailable: true,
    linkPinning: false, // Prevent link being dropped in blank paper area
    defaultLink: () =>
      new shapes.standard.Link({
        attrs: {
          wrapper: {
            cursor: "default",
          },
        },
      }),
    defaultConnectionPoint: { name: "boundary" },
    validateConnection: function (source, _, target, magnet?) {
      if (source === target) return false;
      return magnet?.getAttribute("port-group") === "in";
    },
    validateMagnet: function (_, magnet) {
      return magnet.getAttribute("magnet") !== "passive";
    },
    defaultConnector: function (source, target, route, _, link) {
      return connectors.curve(
        source,
        target,
        route,
        {
          targetDirection: "auto" as unknown as undefined,
          sourceDirection: "auto" as unknown as undefined,
        },
        link
      );
    },
  });

  paper.value.on("link:mouseenter", (link) => {
    link.addTools(removeLink);
  });

  paper.value.on("link:mouseleave", (link) => {
    link.removeTools();
  });

  paper.value.on("element:mouseenter", (element) => {
    element.addTools(removeElement);
  });

  paper.value.on("element:mouseleave", (element) => {
    element.removeTools();
  });
});

function onDrop(event: DragEvent) {
  event.dataTransfer?.items[0].getAsString((id) => {
    console.log("Drop", id, event);
    if (!graph.value) return;
    const nodeElement = nodes[id].getElement();
    nodeElement.position(event.offsetX, event.offsetY);
    graph.value.addCell(nodeElement);
  });
}
</script>

<template>
  <div
    ref="workflow"
    @dragenter.prevent
    @dragleave.prevent
    @dragover.prevent
    @drop="onDrop"
    class="workflow"
  ></div>
</template>

<style scoped>
.workflow {
  flex: auto;
}

.workflow :global(.available-magnet) {
  fill: #00ff4a;
}
</style>
