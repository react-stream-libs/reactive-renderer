declare module 'react-static-webpack-plugin' {
  import {
    Plugin, Compiler,
  } from 'webpack';
  class ReactStaticWebpackPlugin implements Plugin{
    constructor (args: {
      routes: string,
      template: string,
    })
    apply(compiler: Compiler): void;
  }
  module ReactStaticWebpackPlugin { }
  export = ReactStaticWebpackPlugin;
}