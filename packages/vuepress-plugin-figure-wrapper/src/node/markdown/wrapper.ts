import type MdIt from "markdown-it";
import type Token from "markdown-it/lib/token";
import type Renderer from "markdown-it/lib/renderer";

import type { figureWrapperPluginOptions } from "../figureWrapperPlugin.js";

export default function wrapper(md: MdIt, opts: figureWrapperPluginOptions) {
  if (opts.enable === false) return;
  const defaultRendererOpen: Renderer.RenderRule | undefined = md.renderer.rules.figure_open;
  const defaultRendererClose: Renderer.RenderRule | undefined = md.renderer.rules.figure_close;
  const wrapperOpenRule: Renderer.RenderRule = (
    tokens: Token[],
    idx: number,
    options: MdIt.Options,
    env: any,
    self: Renderer
  ) => {
    const figure_open = defaultRendererOpen
      ? defaultRendererOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
    return `<div class="wrapper">\n${figure_open}`;
  };
  const wrapperCloseRule: Renderer.RenderRule = (
    tokens: Token[],
    idx: number,
    options: MdIt.Options,
    env: any,
    self: Renderer
  ) => {
    const figure_open = defaultRendererClose
      ? defaultRendererClose(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
    return `${figure_open}\n</div>`;
  };
  md.renderer.rules.figure_open = wrapperOpenRule;
  md.renderer.rules.figure_close = wrapperCloseRule;
}
