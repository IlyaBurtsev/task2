const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = (env, argv = {}) => {
  const { mode = 'development' } = argv;
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  const pagesDir = path.resolve(__dirname, 'src', 'pages');
  const pages = [];
	const entries = {};
  fs.readdirSync(pagesDir).forEach((file) => {
    pages.push(file);
  });
  const htmlPlugins = pages.map((fileName) => {

		entries[fileName] =`${pagesDir}/${fileName}/${fileName}.js`;

    return new HtmlWebpackPlugin({
      filename: `${fileName}.html`,
      template: `${pagesDir}/${fileName}/${fileName}.pug`,
      inject: 'body',
      chunks: [fileName],
      hash: true,
      minify: isProduction
        ? {
            html5: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: false,
            removeAttributeQuotes: false,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: false,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributese: true,
            useShortDoctype: true,
          }
        : false,
    });
  });

  const getStyleLoaders = () => {
    return [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ];
  };
  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jquery': 'jquery',
        'window.jQuery': 'jquery',
        noUiSlider: 'nouislider',
      }),
      ...htmlPlugins,
      // new HtmlWebpackPlugin({
      //   template: `${pagesDir}/cards/cards.pug`
      // }),
    ];
    if (isProduction) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].css?version=[contenthash]',
          chunkFilename: '[id].css?version=[contenthash]',
        })
      );
    }
    return plugins;
  };
  return {
    mode: isProduction ? 'production' : 'development',
    output: {
      filename: '[name].js?version=[hash]',
      assetModuleFilename: 'assets/[name][ext]',
      clean: true,
    },
    entry: entries,
    // entry: `${pagesDir}/index/index.js`,
    resolve: {
      alias: {
        '@theme': path.resolve(__dirname, 'src/styles/theme-custom'),
        '@assets': path.resolve(__dirname, 'src/assets'),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: getStyleLoaders(),
        },
        {
          test: /\.scss$/,
          use: [...getStyleLoaders(), 'sass-loader'],
        },
        {
          test: /\.pug$/,
          use: {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        },
        {
          test: /\.(png|jpg|svg|gif)$/i,
          //TODO add favicon
          exclude: /(fonts)/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name]-[contenthash].[ext]',
          },
        },
        {
          test: /\.(ttf|woff|woff2|eot|svg)$/i,
          include: /fonts/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          },
        },
      ],
    },

    plugins: getPlugins(),

    devServer: {
      open: '/index.html',
      hot: false,
      open: false,
    },
  };
};
