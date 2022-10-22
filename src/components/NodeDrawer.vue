<script setup lang="ts">
import { ref, computed } from "vue";
import { values } from "lodash";

import nodes from "@/nodes";

const filter = ref("");
const filterPattern = computed(
  () => new RegExp(filter.value.toLowerCase(), "gi")
);
const filteredNodes = computed(() =>
  values(nodes).filter((node) => filterPattern.value.test(node.name))
);

function dragNode(event: DragEvent, id: string) {
  event.dataTransfer?.items.add(id, "application/x-workflow-node");
  console.log("dragNode", event.dataTransfer);
}
</script>

<template>
  <div class="nodes">
    <div
      v-for="node in filteredNodes"
      :key="node.id"
      draggable="true"
      @dragstart="dragNode($event, node.id)"
      class="node"
    >
      <div class="icon" :style="{ backgroundImage: `url(${node.iconURL})` }" />
      <div class="caption">
        {{ node.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.nodes {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.node {
  display: flex;
  flex-flow: column nowrap;
  box-sizing: content-box;
  align-items: center;
  gap: 8px;
  padding: 8px;
  width: 96px;
  cursor: grab;
}

.node:active {
  cursor: grabbing;
}

.node .icon {
  width: 64px;
  height: 64px;
}

.node .caption {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
