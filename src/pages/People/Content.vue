<template>
  <q-page class="row flex flex-center">
    <q-card class="q-ma-md">
      <q-table
        :rows="people"
        :columns="columns"
        :loading="loading"
        v-model:pagination="pagination"
        @request="onRequest"
      >
        <template #body-cell-url="{ value }">
          <q-td>
            <router-link :to="getUrl(value)">
              <q-btn icon="info" flat dense color="primary"></q-btn>
            </router-link>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { usePeopleStore } from 'src/stores/people';
import { storeToRefs } from 'pinia';
import { useMeta, type QTableProps } from 'quasar';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePreFetch } from 'src/composables/prefetch';

defineOptions({
  name: 'PeopleContent',
});

const peopleStore = usePeopleStore();
const route = useRoute();

await usePreFetch(async () => {
  let page = 1;
  if (route.query.page && typeof route.query.page === 'string') {
    page = parseInt(route.query.page as string);
  }
  await peopleStore.fetchPeople(page);
});

const router = useRouter();
const { page, count, people, columns, loading } = storeToRefs(peopleStore);

useMeta(() => ({
  title: `People - Page ${page.value}`,
}));

function getUrl(url: string) {
  const parts = url.split('/').filter((p) => !!p);
  return { name: 'person', params: { id: parts[parts.length - 1] } };
}

const pagination = computed<QTableProps['pagination']>(() => {
  return {
    descending: false,
    page: page.value,
    rowsNumber: count.value,
    rowsPerPage: 10,
    sortBy: 'url',
  };
});

const onRequest: QTableProps['onRequest'] = function onRequest({ pagination }) {
  peopleStore.fetchPeople(pagination.page);
  router.replace({ name: 'people', query: { page: pagination.page } });
};
</script>
