import { defineStore } from 'pinia';
import { useFetch } from 'src/composables/fetch';
import { Person } from 'src/types/people';
import { computed, ref } from 'vue';

export const usePersonStore = defineStore('person', () => {
  const fetch = useFetch();
  const id = ref(0);
  const url = computed(() => `people/${id.value}?format=json`);

  const person = ref<Person>();
  const {
    data,
    isFetching: loading,
    execute,
  } = fetch(url, {
    immediate: false,
  })
    .get()
    .json<Person>();

  async function fetchPerson(val: number) {
    id.value = val;
    await execute();
    person.value = data.value ? data.value : undefined;
  }

  return {
    id,
    person,
    loading,
    fetchPerson,
  };
});
