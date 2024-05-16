<template>
  <q-page class="row flex flex-center">
    <q-card class="q-ma-md">
      <q-card-section>
        <pre>Person Id: {{ id }}</pre>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-skeleton height="600px" width="400px" />
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions align="right">
        <q-skeleton type="circle"></q-skeleton>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'PersonFallback',
});

const route = useRoute();
const id = computed(() => route.params.id);
</script>
