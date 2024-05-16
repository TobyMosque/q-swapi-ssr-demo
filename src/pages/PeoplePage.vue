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
import { useMeta, type QTableColumn, type QTableProps } from 'quasar';
import { Person } from 'src/types/people';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'PeoplePage',
  async preFetch({ store, currentRoute }) {
    let page = 1;
    if (
      currentRoute.query.page &&
      typeof currentRoute.query.page === 'string'
    ) {
      page = parseInt(currentRoute.query.page as string);
    }
    const peopleStore = usePeopleStore(store);
    await peopleStore.fetchPeople(page);
  },
});

const router = useRouter();
const peopleStore = usePeopleStore();
const { page, count, people, loading } = storeToRefs(peopleStore);

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

const columns = computed<QTableColumn<Person>[]>(() => {
  return [
    {
      field: 'name',
      label: 'Nome',
      name: 'name',
    },
    {
      field: 'height',
      label: 'Altura',
      name: 'height',
    },
    {
      field: 'mass',
      label: 'Massa',
      name: 'mass',
    },
    {
      field: 'hair_color',
      label: 'Nome',
      name: 'hair_color',
    },
    {
      field: 'skin_color',
      label: 'Cor da Pele',
      name: 'skin_color',
    },
    {
      field: 'eye_color',
      label: 'Cor dos Olhos',
      name: 'eye_color',
    },
    {
      field: 'birth_year',
      label: 'Data de Nascimento',
      name: 'birth_year',
    },
    {
      field: 'gender',
      label: 'Genero',
      name: 'gender',
    },
    {
      field: 'url',
      label: '',
      name: 'url',
    },
  ];
});
</script>
