import type { Plugin } from "@vuepress/core";
import { path } from "@vuepress/utils";

import MdItWrapper from "./markdown/wrapper";

export type figureWrapperPluginOptions = {
  enable?: boolean;
};

export const figureWrapperPlugin = (options: figureWrapperPluginOptions): Plugin => ({
  name: "vuepress-plugin-figure-wrapper",
  extendsMarkdown: (md) => {
    md.use(MdItWrapper, options);
  },
});
