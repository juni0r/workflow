<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { dia, shapes } from "jointjs";

import NodeDrawer from "./components/NodeDrawer.vue";
import WorkfLowView from "./components/WorkflowView.vue";

const graph = ref<dia.Graph>(new dia.Graph({}, { cellNamespace: shapes }));
const autoSave = ref<number>(0);

function save(key: string) {
  localStorage.setItem(key, JSON.stringify(graph.value?.toJSON()));
}

function load(key: string) {
  const json = localStorage.getItem(key);
  if (json) graph.value?.fromJSON(JSON.parse(json));
}

onMounted(() => {
  load("graph");
  // autoSave.value = setInterval(() => save("graph"), 5000);
});

onUnmounted(() => {
  if (autoSave.value) clearInterval(autoSave.value);
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
