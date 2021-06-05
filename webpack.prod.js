const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const buildPath = path.resolve(__dirname, 'docs')
const glob = require("glob");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const zlib = require("zlib");
const CompressionPlugin = require("compression-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, 'src')
}


module.exports = {

    // https://webpack.js.org/configuration/mode/
    mode: 'production',

    // This option controls if and how source maps are generated.
    // https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: './src/index.js',
    },

    // how to write the compiled files to disk
    // https://webpack.js.org/concepts/output/
    output: {
        filename: '[name].[contenthash].js',
        path: buildPath,
        assetModuleFilename: 'assets/[hash][ext][query]'
    },

    // https://webpack.js.org/concepts/loaders/
    module: {
        rules: [
            {
                // https://webpack.js.org/loaders/babel-loader/#root
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-runtime',
                            {
                                "regenerator": true
                            }]
                        ]
                    }
                }
            },
            {
                // https://webpack.js.org/loaders/css-loader/#root
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                // https://webpack.js.org/guides/asset-modules/#resource-assets
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
            },
            {
                // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
                resourceQuery: /raw/,
                type: 'asset/source'
            },
            {
                // https://webpack.js.org/loaders/html-loader/#usage
                resourceQuery: /template/,
                loader: 'html-loader'
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(pdf)$/,
                type: 'asset/resource',
            }
        ]
    },

    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html',
            favicon: './src/favicon.ico'
        }),
        new MiniCssExtractPlugin(),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
        new ImageMinimizerPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true, optimize: true, quality: 80 }],
                    ["optipng", { optimizationLevel: 5 }],
                    // Svgo configuration here https://github.com/svg/svgo#configuration
                    [
                        "svgo",
                        {
                            plugins: extendDefaultPlugins([
                                {
                                    name: "removeViewBox",
                                    active: false,
                                },
                                {
                                    name: "addAttributesToSVGElement",
                                    params: {
                                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                    },
                                },
                            ]),
                        },
                    ],
                ],
            },
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '!CNAME',
            ],
        }),
        new CompressionPlugin({
            filename: "[path][base].br",
            algorithm: "brotliCompress",
            test: /\.js$|css$|html$|svg$|ttf$|woff2$|woff$|eot$|pdf$|map$/,
            compressionOptions: {
                params: {
                    [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                },
            },
            minRatio: 0.8,
            deleteOriginalAssets: false,
        }),
        new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.(js|css|html|svg|ttf|woff2|woff|eot|pdf|map)$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false,
        }),
    ],

    // https://webpack.js.org/configuration/optimization/
    optimization: {
        minimize: true,
        minimizer: [
            // https://webpack.js.org/plugins/terser-webpack-plugin/
            new TerserPlugin({
                parallel: true
            }),
            // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
            new CssMinimizerPlugin(),
        ]
    }
}
