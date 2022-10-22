<script setup lang="ts">
import { ref, onMounted } from "vue";
import { dia, shapes } from "jointjs";

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
    validateConnection: function (cellViewS, _magnetS, cellViewT, magnetT) {
      // Prevent linking from output ports to input ports within one element
      if (cellViewS === cellViewT) return false;
      // Prevent linking to output ports
      return magnetT && magnetT.getAttribute("port-group") === "in";
    },
    validateMagnet: function (cellView, magnet) {
      // Note that this is the default behaviour. It is shown for reference purposes.
      // Disable linking interaction for magnets marked as passive
      return magnet.getAttribute("magnet") !== "passive";
    },
  });
});

function onDrop(event: DragEvent) {
  event.dataTransfer?.items[0].getAsString((...args) =>
    console.log("Drop", ...args)
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
