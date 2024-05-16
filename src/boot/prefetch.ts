import { boot } from 'quasar/wrappers';
import { enabled } from 'src/composables/prefetch';

export default boot(({ router }) => {
  if (process.env.CLIENT) {
    router.isReady().then(() => {
      const splashScreen = document.querySelector('.splash-screen');
      splashScreen?.remove();
      enabled.value = true;
    });
  }
});
