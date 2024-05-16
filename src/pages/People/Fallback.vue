<template>
  <q-page class="row flex flex-center">
    <q-card class="q-ma-md">
      <q-table
        :rows="people"
        :columns="columns"
        :pagination="pagination"
        :loading="true"
      >
        <template #body-cell>
          <q-td>
            <q-skeleton type="text"></q-skeleton>
          </q-td>
        </template>
        <template #body-cell-url>
          <q-td>
            <q-skeleton type="QBtn"></q-skeleton>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { usePeopleStore } from 'src/stores/people';
import { storeToRefs } from 'pinia';

defineOptions({
  name: 'PeopleFallback',
});

const peopleStore = usePeopleStore();
const { columns } = storeToRefs(peopleStore);

const people = Array.from(Array(10).keys());
const pagination = {
  rowsPerPage: people.length,
};
</script>
