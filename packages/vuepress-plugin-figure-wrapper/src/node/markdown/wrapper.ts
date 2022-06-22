import type MdIt from "markdown-it";
import type Token from "markdown-it/lib/token";
import type Renderer from "markdown-it/lib/renderer";

import type { figureWrapperPluginOptions } from "../figureWrapperPlugin";

export default function wrapper(md: MdIt, opts: figureWrapperPluginOptions) {
  if (opts.enable === false || !md.renderer.rules.figure_open || !md.renderer.rules.figure_close) return;
  const defaultRendererOpen: any = md.renderer.rules.figure_open;
  const defaultRendererClose: any = md.renderer.rules.figure_close;
  const wrapperOpenRule: Renderer.RenderRule = (
    tokens: Token[],
    idx: number,
    options: MdIt.Options,
    env: any,
    self: Renderer
  ) => {
    if (defaultRendererOpen) {
      return `${defaultRendererOpen(tokens, idx, options, env, self)}\n<div class="wrapper">`;
    }
    return defaultRendererOpen(tokens, idx, options, env, self);
  }
  const wrapperCloseRule: Renderer.RenderRule = (
    tokens: Token[],
    idx: number,
    options: MdIt.Options,
    env: any,
    self: Renderer
  ) => {
    if (defaultRendererClose) {
      return `</div>${defaultRendererClose(tokens, idx, options, env, self)}`;
    }
    return defaultRendererClose(tokens, idx, options, env, self);
  }
  md.renderer.rules.figure_open = wrapperOpenRule;
  md.renderer.rules.figure_close = wrapperCloseRule;
}
