import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const token = ref('#super-secret');
  return {
    token,
  };
});
