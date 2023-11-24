import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DevServer from 'webpack-dev-server';


const cssRule: webpack.RuleSetRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
};


const rules: webpack.RuleSetRule[] = [
  cssRule
];


const htmlPlugin: HtmlWebpackPlugin = new HtmlWebpackPlugin({
  template: 'index.html'
});


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
      htmlPlugin
    ],
    module: {
      rules
    },
    devServer
  }
};


export default config;