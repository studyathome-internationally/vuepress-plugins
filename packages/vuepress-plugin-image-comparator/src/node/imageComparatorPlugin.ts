import type { Plugin } from "@vuepress/core";
import { path } from "@vuepress/utils";

import MdItComparator from "./markdown/comparator.js";

interface PathSpec {
  path: RegExp;
  files: RegExp[];
  from: RegExp;
  to: string;
}

export type ImageComparatorPluginOptions = {
  enable?: boolean;
  include?: PathSpec[];
};

export const imageComparatorPlugin = (options: ImageComparatorPluginOptions): Plugin => ({
  name: "vuepress-plugin-image-comparator",
  extendsMarkdown: (md) => {
    md.use(MdItComparator, options);
  },
  clientConfigFile: path.resolve(__dirname, "../client/config.js"),
});
