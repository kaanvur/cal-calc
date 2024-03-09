import { init, register, locale } from 'svelte-i18n';

register('tr', () => import('./locales/tr.json'));

init({
    fallbackLocale: 'tr',
});

export { locale };