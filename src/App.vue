<script setup lang="ts">
import WorkfLowPaper from "./components/WorkflowPaper.vue";
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
  /* position: relative; */
  display: flex;
  flex: auto;
  /* position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
}

aside {
  flex: 0 1 256px;
  overflow: auto;
  padding: 12px;
  background-color: #ddd;
}
</style>
