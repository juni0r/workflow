<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
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
    snapLinks: { radius: 5 },
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

  paper.value.on("paper:pan", (_evt, dx, dy) => {
    if (!paper.value) return;
    const { tx, ty } = paper.value.translate();
    paper.value.translate(tx - dx, ty - dy);
  });

  paper.value.on("blank:pointerdblclick", () => {
    fitToContent();
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

  nextTick(() => fitToContent());
});

function fitToContent(options: dia.Paper.ScaleContentOptions = {}) {
  if (!paper.value) return;
  const maxScale = Math.max(1, paper.value.scale().sx);
  paper.value.scaleContentToFit({ padding: 40, maxScale, ...options });
}

function onDropNode({ dataTransfer, pageX, pageY }: DragEvent) {
  if (!(paper.value && props.graph && dataTransfer)) return;

  const element = nodes[dataTransfer.getData("id")].getElement();
  const offset = JSON.parse(dataTransfer.getData("offset"));
  const { x, y } = paper.value.clientToLocalPoint(
    pageX - offset.x,
    pageY - offset.y
  );
  props.graph.addCell(element.position(x, y));
}
</script>

<template>
  <div
    ref="workflow"
    @dragenter.prevent
    @dragleave.prevent
    @dragover.prevent
    @drop="onDropNode"
    class="workflow"
  ></div>
</template>

<style scoped>
.workflow {
  flex: auto;
}
</style>
