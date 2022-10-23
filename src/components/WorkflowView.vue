<script setup lang="ts">
import { ref, onMounted } from "vue";
import { dia, shapes } from "jointjs";
import { removeLink, removeElement } from "@/tools";

import nodes from "@/nodes";

const props = defineProps<{ graph: dia.Graph }>();

const workflow = ref<HTMLElement>();
const paper = ref<dia.Paper>();

onMounted(() => {
  paper.value = new dia.Paper({
    el: workflow.value,
    model: props.graph,
    width: "auto",
    height: "auto",
    gridSize: 16,
    cellViewNamespace: shapes,
    restrictTranslate: true,
    linkPinning: false,
    snapLinks: { radius: 10 },
    multiLinks: false,
    markAvailable: true,
    defaultLink: () =>
      new shapes.standard.Link({
        attrs: {
          wrapper: {
            cursor: "default",
          },
          line: {
            stroke: "#666",
          },
        },
      }),
    defaultConnectionPoint: { name: "boundary" },
    defaultConnector: { name: "smooth" },
    validateConnection: function (source, _, target, magnet?) {
      if (source === target) return false;
      return magnet?.getAttribute("port-group") === "in";
    },
    validateMagnet: function (_, magnet) {
      return magnet.getAttribute("magnet") !== "passive";
    },
  });

  paper.value.on("paper:pan", (_, dX, dY) => {
    if (!paper.value) return;
    const dist = paper.value.translate();
    paper.value.translate(dist.tx - dX, dist.ty - dY);
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

function onDrop({ dataTransfer, offsetX, offsetY }: DragEvent) {
  if (!props.graph || !dataTransfer) return;

  const offset = JSON.parse(dataTransfer.getData("offset"));
  const nodeElement = nodes[dataTransfer.getData("id")].getElement();
  props.graph.addCell(
    nodeElement.position(offsetX - offset.x, offsetY - offset.y)
  );
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
</style>
