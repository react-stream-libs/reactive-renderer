declare module 'html-webpack-plugin' {
  import {
    Plugin, Compiler,
  } from 'webpack';
  class HtmlWebpackPlugin implements Plugin{
    constructor (args?: {
      title?: string,
      filename?: string,
      template?: string,
    })
    apply(compiler: Compiler): void;
  }
  module HtmlWebpackPlugin { }
  export = HtmlWebpackPlugin;
}