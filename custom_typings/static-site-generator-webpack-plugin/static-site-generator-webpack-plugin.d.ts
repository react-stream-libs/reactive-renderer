declare module 'static-site-generator-webpack-plugin' {
  import {
    Plugin, Compiler,
  } from 'webpack';
  class StaticSiteGeneratorWebpackPlugin implements Plugin{
    constructor (
      entry: string,
      paths: Array<string>
    )
    apply(compiler: Compiler): void;
  }
  module StaticSiteGeneratorWebpackPlugin { }
  export = StaticSiteGeneratorWebpackPlugin;
}