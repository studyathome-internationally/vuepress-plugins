import type { Plugin } from "@vuepress/core";
import { path } from "@vuepress/utils";

interface PathSpec {
  path: RegExp;
  files: RegExp;
  from: RegExp;
  to: string;
}

export type ImageComparatorPluginOptions = {
  enable?: boolean,
  include?: PathSpec[]
};

export const imageComparatorPlugin: Plugin<ImageComparatorPluginOptions> = (options, app) => {
  return {
    name: "vuepress-plugin-image-comparator",
    extendsMarkdown: (md) => {
      md.use(require("./markdown/comparator").default, options);
    },
    clientAppEnhanceFiles: [
      path.resolve(__dirname, `../client/clientAppEnhance${"@vuepress/bundler-vite" === app.options.bundler ? "Vite": ""}.js`),
      path.resolve(__dirname, "../client/clientAppEnhanceIcons.js")
    ]
    // clientAppEnhanceFiles: path.resolve(__dirname, "../client/clientAppEnhanceIcons.js")
  }
}