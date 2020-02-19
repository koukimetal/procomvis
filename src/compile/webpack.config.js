const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = (env) => {
    if (!env.COMPILE) {
        throw new Error('give --env.COMPILE=<path>');
    }

    return ({
        target: 'node',
        output: {
            path: path.resolve(__dirname, '../../dist'),
            filename: '[name].js'
        },
        externals: [nodeExternals()],
        entry: path.resolve(__dirname, './template.ts'),
        module: {
            rules: [
                { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ }
            ]
        },
        resolve: {
            alias: {
                './dummy': path.resolve(__dirname, '../contest/', `${env.COMPILE}/solve`)
            },
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: path.resolve(__dirname, "./tsconfig.json")
                })
            ],
            extensions: ['.ts']
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: `path:${env.COMPILE}`,
            }),
        ],
        devtool: 'source-map'
    });
};