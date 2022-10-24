<script setup lang="ts">
import { ref, computed } from "vue";
import { groupBy, isEmpty } from "lodash";
import NodeGroup from "./NodeGroup.vue";
import type { NodeDef } from "@/node";

const props = defineProps<{ nodes: NodeDef[] }>();

const filter = ref("");

const filterPattern = computed(() =>
  filter.value ? new RegExp(filter.value.toLowerCase(), "gi") : null
);

const filteredNodes = computed(() => {
  const pattern = filterPattern.value;
  const filteredNodes = pattern
    ? props.nodes.filter((node) => pattern.test(node.name))
    : props.nodes;
  return groupBy(filteredNodes, "type");
});

const hasMatchingNodes = computed(() => !isEmpty(filteredNodes.value));
</script>

<template>
  <div class="nodes-filter">
    <input v-model.trim="filter" type="search" placeholder="Filter nodes" />
  </div>

  <div class="nodes-container">
    <TransitionGroup
      v-if="hasMatchingNodes"
      tag="div"
      name="fade"
      class="node-groups"
    >
      <div
        v-for="(nodes, type) in filteredNodes"
        :key="type"
        class="node-group"
      >
        <NodeGroup :title="String(type)" :nodes="nodes" />
      </div>
    </TransitionGroup>

    <div v-else class="hint">No matching nodes</div>
  </div>
</template>

<style scoped>
.nodes-filter {
  padding: 1rem;
}

.nodes-filter input {
  border: none;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  opacity: 0.65;
  transition: opacity 300ms ease;
}

.nodes-filter input:focus {
  opacity: 1;
  outline: none;
}

.nodes-container {
  padding: 0.5rem 1rem 1.5rem;
  overflow: auto;
}

.hint {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #888;
  text-align: center;
}

.node-groups {
  display: grid;
  gap: 1.5rem;
}
</style>
