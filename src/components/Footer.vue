<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ lastUpdated: string }>();
</script>

<template>
  <footer>
    <span>
      <font-awesome-icon @click="$emit('refreshData')" :icon="['fa', 'arrows-rotate']" />
    </span>
    <span>
      Last updated: {{ lastUpdated }}
    </span>
    <a href="https://github.com/dreamxinxcode/top-gainers-and-losers/" target="_blank">
      <span>
        <font-awesome-icon :icon="['fa-brands', 'fa-github-alt']" />
      </span>
    </a>
  </footer>
</template>

<style scoped lang="scss">
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
}
</style>
