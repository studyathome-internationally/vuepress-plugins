import { defineClientAppEnhance } from '@vuepress/client';
import Comparator from './components/Comparator.vue';

export default defineClientAppEnhance(({ app, router }) => {
  app.component('Comparator', Comparator)
})
