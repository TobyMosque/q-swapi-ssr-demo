<template>
  <suspense>
    <template #default>
      <people-content />
    </template>
    <template #fallback>
      <people-fallback />
    </template>
  </suspense>
</template>

<script setup>
import PeopleContent from './Content.vue';
import PeopleFallback from './Fallback.vue';

defineOptions({
  name: 'PeoplePage',
});
</script>
