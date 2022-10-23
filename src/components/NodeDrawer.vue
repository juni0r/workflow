<script setup lang="ts">
import { ref, computed } from "vue";
import { values, groupBy, isEmpty } from "lodash";
import NodeGroup from "./NodeGroup.vue";
import nodes from "@/nodes";

const filter = ref("");

const filterPattern = computed(
  () => new RegExp(filter.value.toLowerCase(), "gi")
);

const groupedNodes = computed(() => {
  const pattern = filterPattern.value;
  const filteredNodes = filter.value
    ? values(nodes).filter((node) => pattern.test(node.name))
    : values(nodes);
  return groupBy(filteredNodes, "type");
});

const hasMatchingNodes = computed(() => !isEmpty(groupedNodes.value));
</script>

<template>
  <div class="node-filter">
    <input v-model.trim="filter" type="search" placeholder="Filter nodes" />
  </div>

  <TransitionGroup
    v-if="hasMatchingNodes"
    tag="div"
    name="fade"
    class="node-groups"
  >
    <div v-for="(nodes, type) in groupedNodes" :key="type" class="node-group">
      <NodeGroup :title="String(type)" :nodes="nodes" />
    </div>
  </TransitionGroup>

  <div v-else class="hint">No matching nodes</div>
</template>

<style scoped>
.node-filter {
  margin-bottom: 12px;
}

.node-filter input {
  border: none;
  width: 100%;
  padding: 8px;
  border-radius: 5px;
}

.hint {
  margin-bottom: 8px;
  font-weight: bold;
  color: #888;
  text-align: center;
}

.node-groups {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
}
</style>
