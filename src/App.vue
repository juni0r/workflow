<script setup lang="ts">
import { ref, onMounted } from "vue";
import { dia, shapes } from "jointjs";
import { debounce } from "lodash";

import NodeDrawer from "@/components/NodeDrawer.vue";
import WorkfLowView from "@/components/WorkflowView.vue";

const graph = ref<dia.Graph>(new dia.Graph({}, { cellNamespace: shapes }));

function save() {
  localStorage.setItem("workflow-graph", JSON.stringify(graph.value.toJSON()));
}

function load() {
  const json = localStorage.getItem("workflow-graph");
  if (json) graph.value.fromJSON(JSON.parse(json));
}

onMounted(() => {
  load();
  graph.value.on("add change remove", debounce(save, 250));
});
</script>

<template>
  <aside>
    <NodeDrawer />
  </aside>
  <main>
    <WorkfLowView :graph="(graph as dia.Graph)" />
  </main>
</template>

<style scoped>
main {
  display: grid;
}

aside {
  display: grid;
  grid:
    "toolbar" min-content
    "content" auto
    / auto;
  background-color: #ddd;
}
</style>
