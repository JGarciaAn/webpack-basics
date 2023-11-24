import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DevServer from 'webpack-dev-server';


const cssRule: webpack.RuleSetRule = {
  test:  /\.s[ac]ss$/i,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
};


const rules: webpack.RuleSetRule[] = [
  cssRule
];


const htmlPlugin: HtmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './index.html'
});


const cssPlugin: MiniCssExtractPlugin = new MiniCssExtractPlugin()


const devServer: DevServer.Configuration = {
  port: 4000,
  open: true
};


const config = (): webpack.Configuration => {
  return {
    output: {
      filename: 'bundle-test.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      htmlPlugin,
      cssPlugin
    ],
    module: {
      rules
    },
    devServer
  }
};


export default config;