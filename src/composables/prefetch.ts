import { ref } from 'vue';

export const enabled = ref(process.env.MODE !== 'ssr' || process.env.SERVER);
export function checkPwa() {
  if (process.env.CLIENT) {
    if (!('__INITIAL_STATE__' in window)) {
      enabled.value = true;
      console.log('is pwa');
    } else {
      console.log('is not pwa');
    }
  }
}

export async function usePreFetch(preFetch: () => Promise<void>) {
  if (enabled.value) {
    await preFetch();
  }
}
