<script setup lang="ts">
import { ref, computed } from "vue";
import { values, groupBy } from "lodash";
import NodeGroup from "./NodeGroup.vue";
import nodes from "@/nodes";

const filter = ref("");

const filterPattern = computed(
  () => new RegExp(filter.value.toLowerCase(), "gi")
);

const groupedNodes = computed(() => {
  const filteredNodes = filter.value
    ? values(nodes).filter((node) => filterPattern.value.test(node.name))
    : values(nodes);
  return groupBy(filteredNodes, "type");
});
</script>

<template>
  <div class="node-filter">
    <input v-model.trim="filter" type="search" placeholder="Filter Nodes" />
  </div>

  <TransitionGroup tag="div" name="fade" class="node-groups">
    <div v-for="(nodes, type) in groupedNodes" :key="type" class="node-group">
      <NodeGroup :title="String(type)" :nodes="nodes" />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.node-filter {
  padding: 8px 8px;
  margin-bottom: 12px;
}

.node-filter input {
  border: none;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  font-size: 1.15rem;
}

.node-groups {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
}
</style>
