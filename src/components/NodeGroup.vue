<script setup lang="ts">
import type { NodeDef } from "@/node";

defineProps<{ title: string; nodes: NodeDef[] }>();

function dragNode(
  { target, dataTransfer, offsetX, offsetY }: DragEvent,
  node: NodeDef
) {
  if (!target || !dataTransfer) return;

  const icon = (target as HTMLElement).querySelector(".icon") as HTMLElement;

  dataTransfer.setData("id", node.id);
  dataTransfer.setData(
    "offset",
    JSON.stringify({
      x: offsetX - icon.offsetLeft,
      y: offsetY - icon.offsetTop,
    })
  );
}
</script>

<template>
  <div class="node-group">
    <div class="group-title">{{ title }}</div>
    <TransitionGroup tag="div" name="fade" class="nodes">
      <div
        v-for="node in nodes"
        draggable="true"
        @dragstart="dragNode($event, node)"
        :key="node.id"
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
  color: #888;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
}

.nodes {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.node {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 8px;
  box-sizing: content-box;
  width: 96px;
  padding: 4px;
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
