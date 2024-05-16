import { boot } from 'quasar/wrappers';
import { createFetch } from 'src/composables/fetch';

export default boot(({ store }) => {
  createFetch(store);
});
