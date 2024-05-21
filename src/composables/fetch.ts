import { UseFetchOptions, createFetch as createFetchFn } from '@vueuse/core';
import type { Pinia } from 'pinia';
import { useAppStore } from 'src/stores/app';
import { useDiStore } from 'src/stores/di';

type Fetch = Awaited<ReturnType<typeof createFetch>>;
declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly fetch: Fetch;
  }
}

export async function createFetch(
  pinia: Pinia,
  _fetch: UseFetchOptions['fetch'],
) {
  const fetch = createFetchFn({
    baseUrl: 'https://swapi.dev/api/',
    options: {
      fetch: _fetch,
      beforeFetch({ options }) {
        const appStore = useAppStore(pinia);
        options.headers = {
          ...options.headers,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${appStore.token}`,
        };
        return { options };
      },
      onFetchError(ctx) {
        return ctx;
      },
      afterFetch(ctx) {
        return ctx;
      },
    },
  });

  pinia.use(() => ({ fetch }));
  return fetch;
}

export function useFetch(pinia?: Pinia) {
  const diStore = useDiStore(pinia);
  return diStore.fetch;
}
