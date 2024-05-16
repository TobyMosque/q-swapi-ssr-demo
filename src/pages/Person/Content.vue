<template>
  <q-page class="row flex flex-center">
    <q-card class="q-ma-md">
      <q-card-section>
        <pre>Person Id: {{ id }}</pre>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <pre>{{ person }}</pre>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions align="right">
        <q-btn
          icon="reply"
          :to="{ name: 'people' }"
          color="primary"
          label="Voltar"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { usePersonStore } from 'src/stores/person';
import { storeToRefs } from 'pinia';
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { usePreFetch } from 'src/composables/prefetch';

defineOptions({
  name: 'PersonContent',
});

const personStore = usePersonStore();
const route = useRoute();

await usePreFetch(async () => {
  if (typeof route.params.id !== 'string') {
    throw 'invalid parameter type';
  }

  const id = parseInt(route.params.id);
  await personStore.fetchPerson(id);
});

const { id, person } = storeToRefs(personStore);
useMeta(() => ({
  title: `Person ${id.value} - ${person.value?.name}`,
}));
</script>
