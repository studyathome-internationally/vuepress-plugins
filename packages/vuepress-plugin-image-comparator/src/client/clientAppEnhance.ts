import { defineClientAppEnhance } from "@vuepress/client";
import Comparator from "./components/Comparator";

import "./styles/index.styl";

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component("Comparator", Comparator);
})