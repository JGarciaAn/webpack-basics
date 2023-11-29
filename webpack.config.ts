import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DevServer from 'webpack-dev-server';
import CopyPlugin from 'copy-webpack-plugin';




const typescriptRule = (): webpack.RuleSetRule => ({
  test: /\.ts$/i,
  loader: 'ts-loader',
  exclude: '/node_modules/'
});


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


const assetsRule = (): webpack.RuleSetRule => ({
  test: /\.(woof|woff2|ttf|eot|otf|png)$/i,
  type: 'asset/resource'
});


const rules = (isProduction: boolean): webpack.RuleSetRule[] => ([
  cssRule(isProduction),
  assetsRule(),
  typescriptRule()
]);


const htmlPlugin: HtmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  scriptLoading: 'blocking'
});


const cssPlugin: MiniCssExtractPlugin = new MiniCssExtractPlugin();


const copyPlugin = (mode: string): CopyPlugin => {
  return new CopyPlugin({
    patterns: [
      {
        from: 'assets/**/*.json',
        to: '[path][name][ext]'
      },
      {
        from: `environment/${mode}`,
        to: `environment`
      }
    ]
  })
};


const devServer = (port: number): DevServer.Configuration => ({
  port,
  open: true,
  hot: true,
  watchFiles: ['./index.html', './assets/i18n/*']
});


const config = (env, args): webpack.Configuration => {
  const isProduction = args.mode === 'production';
  const port = args.port || 4000;
  const environment = Object.keys(env)
    .filter(key => ['development', 'preproduction', 'production'].includes(key))[0];

  return {
    entry: './src/index.ts',
    cache: false,
    mode: isProduction ? 'production' : 'development',
    output: {
      filename: 'bundle-test.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: '[path][hash][ext]'
    },
    plugins: [
      htmlPlugin,
      cssPlugin,
      copyPlugin(environment)
    ],
    module: {
      rules: rules(isProduction)
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devServer: devServer(port),
    ...(!isProduction ? {
      devtool: 'source-map',
    } : {
      optimization: {
        minimize: true,
        sideEffects: true,
        usedExports: true,
      }
    }),

  }
};

export default config;
