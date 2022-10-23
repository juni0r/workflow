<script setup lang="ts">
import type { NodeDef } from "@/node";

defineProps<{ title: string; nodes: NodeDef[] }>();

function dragNode(event: DragEvent, id: string) {
  event.dataTransfer?.items.add(id, "application/x-workflow-node");
  console.log("dragNode", event);
}
</script>

<template>
  <div class="node-group">
    <div class="group-title">{{ title }}</div>
    <TransitionGroup tag="div" name="fade" class="nodes">
      <div
        v-for="node in nodes"
        :key="node.id"
        draggable="true"
        @dragstart="dragNode($event, node.id)"
        class="node"
      >
        <div
          class="icon"
          :style="{ backgroundImage: `url(${node.iconURL})` }"
        />
        <div class="caption">
          {{ node.name }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.group-title {
  margin-bottom: 8px;
  margin-left: 12px;
  color: #888;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
}

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
