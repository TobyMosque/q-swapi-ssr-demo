<template>
  <suspense>
    <template #default>
      <person-content />
    </template>
    <template #fallback>
      <person-fallback />
    </template>
  </suspense>
</template>

<script setup>
import PersonContent from './Content.vue';
import PersonFallback from './Fallback.vue';

defineOptions({
  name: 'PersonPage',
});
</script>
