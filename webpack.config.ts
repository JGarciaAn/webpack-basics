import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DevServer from 'webpack-dev-server';


const cssRule = (isProduction: boolean): webpack.RuleSetRule => ({
  test: /\.s[ac]ss$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isProduction
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: !isProduction
      }
    }
  ]
});


const rules = (isProduction: boolean): webpack.RuleSetRule[] => ([
  cssRule(isProduction)
]);


const htmlPlugin: HtmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './index.html'
});


const cssPlugin: MiniCssExtractPlugin = new MiniCssExtractPlugin()


const devServer: DevServer.Configuration = {
  port: 4000,
  open: true
};


const config = (env, args): webpack.Configuration => {
  const isProduction = args.mode === 'production';

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
      rules: rules(isProduction)
    },
    devServer,
    devtool: 'source-map'
  }
};


export default config;