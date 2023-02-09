import type MdIt from "markdown-it";
import type Token from "markdown-it/lib/token";
import type Renderer from "markdown-it/lib/renderer";

import type { ImageComparatorPluginOptions } from "../imageComparatorPlugin.js";

export default function comparator(md: MdIt, opts: ImageComparatorPluginOptions) {
  if (opts.enable === false) return;
  const defaultRenderer: Renderer.RenderRule | undefined = md.renderer.rules.image;
  const imageRule: Renderer.RenderRule = (
    tokens: Token[],
    idx: number,
    options: MdIt.Options,
    env: any,
    self: Renderer
  ) => {
    if (defaultRenderer && env.filePathRelative && opts.include) {
      const token = tokens[idx];
      const src = token.attrGet("src");
      if (src) {
        const files = opts.include
          .filter(({ path }) => path.exec(env.filePathRelative))
          .map(({ files }) => files)
          .flat();
        // if (!files) return defaultRenderer ? defaultRenderer(tokens, idx, options, env, self) : "";
        const included = files
          .map((file) => file.exec(src))
          .map((entry) => (entry === null ? false : true))
          .find((el) => el === true)
          ? true
          : false;
        if (included) {
          const tokenComp = cloneImageToken(token, opts);
          return `<Comparator>
          <template #original>
          ${defaultRenderer(tokens, idx, options, env, self)}
          </template>
          <template #comparison>
            <img ${self.renderAttrs(tokenComp)} />
            </template>
            </Comparator>`;
        }
      }
    }
    return defaultRenderer ? defaultRenderer(tokens, idx, options, env, self) : "";
  };
  md.renderer.rules.image = imageRule;
}

function cloneImageToken(token: Token, opts) {
  const o = JSON.parse(JSON.stringify(token));
  o.attrs = o.attrs.map(([prop, val]) => {
    if (prop === "src") val = val.replace(/\.svg$/, ".original.svg").replace(/^\.\//, "@source/");
    if (prop === "alt" && !val) val = token.attrGet("title");
    return [prop, val];
  });
  return o;
}
