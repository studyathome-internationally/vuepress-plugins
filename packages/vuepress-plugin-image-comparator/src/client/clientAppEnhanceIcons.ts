import { defineClientAppEnhance } from "@vuepress/client";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faExpand, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons" 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faAngleRight, faExpand, faChevronLeft, faChevronRight)
dom.watch();

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component("font-awesome-icon", FontAwesomeIcon);
})