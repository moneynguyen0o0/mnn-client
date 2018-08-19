import path from 'path';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

const getPlugins = () => {
  const plugins = [
    // https://github.com/danethurber/webpack-manifest-plugin
    new ManifestPlugin({
      fileName: path.resolve(process.cwd(), 'public/webpack-assets.json'),
      filter: file => file.isInitial,
      // Customize the asset manifest
      generate: (seed, files) => files.reduce((manifest, {name, path}) => {
        const generateManifestByTag = (tag) => {
          if (manifest[tag]) {
            manifest[tag].push(path);
          } else {
            manifest[tag] = [path];
          }
        };

        if (name.substr(name.length - 2) === 'js') {
          generateManifestByTag('scripts');
        } else if (name.substr(name.length - 3) === 'css') {
          generateManifestByTag('styles');
        }

        return ({ ...manifest });
      }, seed)
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(nodeEnv) }),
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev
    }),
    new FriendlyErrorsWebpackPlugin()
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(
      new webpack.HashedModuleIdsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.jsx?$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new LodashModuleReplacementPlugin(),
      new ImageminPlugin({
        pngquant: { quality: '95-100' }
      })
    );
  }

  return plugins;
};

const getEntry = () => {
   const entry = ['babel-polyfill', './src/client.js'];

  return entry;
};

export default {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  context: path.resolve(process.cwd()),
  entry: getEntry(),
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: isDev ? 'async' : 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: path.resolve(process.cwd(), 'public/assets'),
    publicPath: '/assets/',
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[id].chunk.js' : '[id].[chunkhash:8].chunk.js',
    pathinfo: isDev
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: isDev,
            babelrc: false,
            presets: [
              ['env', { modules: false, useBuiltIns: 'usage' }],
              'react'
            ],
            plugins: [
              ['styled-components', { ssr: true }],
              'loadable-components/babel',
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      },
      {
        test: /\.(ico|svg|gif|jpg|png|woff|woff2|eot|otf|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10240, name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: getPlugins(),
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.json']
  },
  cache: isDev,
  // https://webpack.js.org/configuration/node/
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
