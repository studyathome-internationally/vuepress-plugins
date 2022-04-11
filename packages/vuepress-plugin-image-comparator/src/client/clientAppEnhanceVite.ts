import { defineClientAppEnhance } from "@vuepress/client";
import { h } from "vue";
import Comparator from "./components/ComparatorVite";

import "./styles/index.styl";

export default defineClientAppEnhance(({ app /*, router, siteData */ }) => {
  app.component("Comparator", h(Comparator));
})