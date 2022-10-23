<script setup lang="ts">
import { ref, onMounted } from "vue";
import { dia, shapes } from "jointjs";

import NodeDrawer from "./components/NodeDrawer.vue";
import WorkfLowView from "./components/WorkflowView.vue";
import { debounce } from "lodash";

const graph = ref<dia.Graph>(new dia.Graph({}, { cellNamespace: shapes }));

const save = debounce(() => {
  localStorage.setItem("workflow-graph", JSON.stringify(graph.value?.toJSON()));
}, 250);

const load = () => {
  const json = localStorage.getItem("workflow-graph");
  if (json) graph.value?.fromJSON(JSON.parse(json));
};

onMounted(() => {
  load();
  graph.value.on("add change remove", save);
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
  display: flex;
  flex: auto;
}

aside {
  flex: 0 1 256px;
  padding: 12px;
  overflow: auto;
  background-color: #ddd;
}
</style>
