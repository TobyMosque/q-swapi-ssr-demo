import { defineStore } from 'pinia';
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
    error,
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

  return {
    people,
    count,
    page,
    loading,
    fetchPeople,
  };
});
