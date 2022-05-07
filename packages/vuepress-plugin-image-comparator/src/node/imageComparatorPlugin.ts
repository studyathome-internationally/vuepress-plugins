import type { Plugin } from "@vuepress/core";
import { path } from "@vuepress/utils";

interface PathSpec {
  path: RegExp;
  files: RegExp[];
  from: RegExp;
  to: string;
}

export type ImageComparatorPluginOptions = {
  enable?: boolean,
  include?: PathSpec[]
};

export const imageComparatorPlugin = (options: ImageComparatorPluginOptions): Plugin => ({
  name: "vuepress-plugin-image-comparator",
  extendsMarkdown: (md) => {
    md.use(require("./markdown/comparator").default, options)
  },
  clientAppEnhanceFiles: [
    path.resolve(__dirname, '../client/clientAppEnhance.js'),
    path.resolve(__dirname, '../client/clientAppEnhanceIcons.js')
  ]
});