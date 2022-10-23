<script setup lang="ts">
import WorkfLowPaper from "./components/WorkflowView.vue";
import NodeDrawer from "./components/NodeDrawer.vue";
</script>

<template>
  <aside>
    <NodeDrawer />
  </aside>
  <main>
    <WorkfLowPaper />
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
