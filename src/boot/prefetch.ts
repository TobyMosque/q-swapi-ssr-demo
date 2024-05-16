import { boot } from 'quasar/wrappers';
import { enabled } from 'src/composables/prefetch';

export default boot(({ router }) => {
  if (process.env.CLIENT) {
    router.isReady().then(() => {
      document.body?.classList.remove('splash-screen');
      enabled.value = true;
    });
  }
});
