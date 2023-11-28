import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DevServer from 'webpack-dev-server';
import CopyPlugin from 'copy-webpack-plugin';



const assetsRule = (): webpack.RuleSetRule => ({
  test: /\.(woof|woff2|ttf|eot|otf|png)$/i,
  type: 'asset/resource'
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


const rules = (isProduction: boolean): webpack.RuleSetRule[] => ([
  cssRule(isProduction),
  assetsRule()
]);


const htmlPlugin: HtmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './index.html'
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
  open: true
});


const config = (env, args): webpack.Configuration => {
  const isProduction = args.mode === 'production';
  const port = args.port || 4000;
  const environment = Object.keys(env)
    .filter(key => ['development', 'preproduction', 'production'].includes(key))[0];

  return {
    output: {
      filename: 'bundle-test.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: (path, asset) => {
        const ext = path.filename.split('.').pop();
        return `[path]${ext === 'json' ? '[name]' : '[hash]'}[ext]`;
      }
    },
    plugins: [
      htmlPlugin,
      cssPlugin,
      copyPlugin(environment)
    ],
    module: {
      rules: rules(isProduction)
    },
    devServer: devServer(port),
    ...(!isProduction ? { devtool: 'source-map' } : {})
  }
};

export default config;
