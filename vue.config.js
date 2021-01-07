const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
module.exports = {
    publicPath: '/admin',
    outputDir: 'dist',
    assetsDir: 'assts',
    productionSourceMap: false,
    devServer: {
        port: 80,
        host: '0.0.0.0',
        open: false,
        https: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api/exam': {
                target: process.env.PROXY_HOST,
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },
            '/api/user': {
                target: process.env.PROXY_HOST2,
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },
            '/api/course': {
                target: process.env.PROXY_HOST3,
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },
            '/api/msg': {
                target: process.env.PROXY_HOST4,
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },
            '/api/payment': {
                target: process.env.PROXY_HOST5,
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },
            '/api/shopping': {
                target: process.env.PROXY_HOST5,
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },
            '/api/android': {
                target: process.env.PROXY_HOST5,
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@i': path.resolve(__dirname, './src/assets'),
            }
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

            // 下面是下载的插件的配置
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 5,
                minChunkSize: 100
            })
        ]
    }
};
