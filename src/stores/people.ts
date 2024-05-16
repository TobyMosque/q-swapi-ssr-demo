import { defineStore } from 'pinia';
import { QTableColumn } from 'quasar';
import { useFetch } from 'src/composables/fetch';
import { ApiResult } from 'src/types/api';
import { Person } from 'src/types/people';
import { computed, ref } from 'vue';

export const usePeopleStore = defineStore('people', () => {
  const fetch = useFetch();
  const page = ref(1);
  const url = computed(() => `people?page=${page.value}&format=json`);

  const people = ref<Person[]>([]);
  const count = ref(0);

  const {
    data,
    isFetching: loading,
    execute,
  } = fetch(url, {
    immediate: false,
  })
    .get()
    .json<ApiResult<Person>>();

  async function fetchPeople(val: number) {
    page.value = val;
    await execute();

    people.value = data.value?.results ?? [];
    count.value = data.value?.count ?? 0;
  }

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

  return {
    people,
    count,
    page,
    columns,
    loading,
    fetchPeople,
  };
});
