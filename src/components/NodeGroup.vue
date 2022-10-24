<script setup lang="ts">
import type { NodeDef } from "@/node";

defineProps<{ title: string; nodes: NodeDef[] }>();

function dragNode(
  { target, dataTransfer, offsetX, offsetY }: DragEvent,
  node: NodeDef
) {
  if (!(target && dataTransfer)) return;

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
        :key="node.id"
        draggable="true"
        @dragstart="dragNode($event, node)"
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
  margin-bottom: 1rem;
  color: #888;
  text-transform: uppercase;
  font-size: 0.67rem;
  font-weight: bold;
}

.nodes {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  gap: 0.5rem;
}

.node {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.5rem;
  box-sizing: content-box;
  cursor: grab;
  font-size: 0.67rem;
  font-weight: bold;
  z-index: 1;
}

.node:active {
  cursor: grabbing;
}

.node .icon {
  width: 50%;
  aspect-ratio: 1;
}

.node .caption {
  display: inline-block;
  text-align: center;
}
</style>
