/*
 * WPBento Bundler
 * A sane and simple Webpack setup for WordPress development
 */

import Webpack from 'webpack';
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {fileURLToPath} from "url";
import BrowserSyncPlugin from "browser-sync-webpack-plugin"
const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

class BrowserSyncInject {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('Replace', (compilation) => {
            compilation.hooks.processAssets.tap({ name: 'BROWSER_SYNC_INJECT', stage: Webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
                () => {
                    if (!compiler.options.watch) {
                        return;
                    }
                    const chunkNames = [...[...compilation.chunks][0].files];
                    const jsChunk = chunkNames.find(item => item.includes('.js'));
                    const browserSyncScript = `
                            (function() {
                                var script = document.createElement('script');
                                if ('async') {
                                  script.async = true;
                                }
                                script.src = 'http://HOST:3000/browser-sync/browser-sync-client.js?v=2.29.2'.replace("HOST", location.hostname);
                                if (document.body) {
                                  document.body.appendChild(script);
                                }
                            })()
                            `
                    compilation.updateAsset(jsChunk, new Webpack.sources.RawSource(compilation.getAsset(jsChunk).source.source() + browserSyncScript));
                }
            );
        });
    }
}

/* General config */
const config = {
    entry: {
        script: [
            "./src/script.js",
            "./src/style.scss"
        ],
    },
    output: {
        path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "assets"),
        filename: "[name].min.js",
        clean: true,
    },
    devtool: "source-map",
    module: {
        rules: [
            /* Enable TypeScript Support */
            /*{
              test: /\.ts(x)?$/,
              loader: "ts-loader",
              exclude: /node_modules/,
            },*/
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: {
                        url: false, /* Enable if 'Resources' bellow */
                    },
                }, "sass-loader"]
            },
            {
              test: /\.?$/,
              exclude: /resources/,
            },
            /* Resources: Definitely not a good ideia in Wordpress */
            /*{
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "./[name]-[hash][ext]",
                },
            },*/
        ],
    },
    /* Enable TypeScript Support */
    /*resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },*/
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.min.css"
        })
    ],
    performance: {
        hints: 'warning',
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
    }
};

/* Dev only config */
if (!isProduction) {
    /* Enable live-reload */
    config.plugins.push(new BrowserSyncPlugin({
        files: [
            '*.php',
            './**/*.php'
        ],
        ui: false,
        logLevel: 'silent'
    }));
    /* Automatically add the live reload JS to script.min.js */
    config.plugins.push(new BrowserSyncInject());
}

export default config;
