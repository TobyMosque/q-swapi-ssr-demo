import { boot } from 'quasar/wrappers';
import { enabled } from 'src/composables/prefetch';

export default boot(({ router }) => {
  if (process.env.MODE === 'ssr' && process.env.CLIENT) {
    router.isReady().then(() => {
      enabled.value = true;
    });
  }
});
