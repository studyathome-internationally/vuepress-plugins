import { defineClientConfig } from '@vuepress/client';
import Comparator from './components/Comparator.vue';

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faExpand, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons" 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faAngleRight, faExpand, faChevronLeft, faChevronRight)
dom.watch();

export default defineClientConfig({
  enhance({ app }) {
    app.component('Comparator', Comparator);
    app.component("font-awesome-icon", FontAwesomeIcon);
  }
});