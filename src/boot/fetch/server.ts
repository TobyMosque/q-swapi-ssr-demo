import { boot } from 'quasar/wrappers';
import { createFetch } from 'src/composables/fetch';
import nodeFetch from 'node-fetch';

export default boot(({ store }) => {
  createFetch(store, nodeFetch as never);
});
