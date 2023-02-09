import type { Plugin } from "@vuepress/core";
import { path, getDirname } from "@vuepress/utils";

import MdItComparator from "./markdown/comparator.js";

const __dirname = getDirname(import.meta.url);

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
