const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

function getBanner(codePath) {
    const lines = [];
    lines.push(`path: ${codePath}`);
    lines.push(`URL: https://github.com/koukimetal/procomvis/tree/master/src/contest/${codePath}`);
    return lines.join('\n');
}

module.exports = (env) => {
    if (!env.COMPILE) {
        throw new Error('give --env.COMPILE=<path>');
    }

    return ({
        target: 'node',
        output: {
            path: path.resolve(__dirname, '../../dist'),
            filename: 'submit.js'
        },
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
                banner: getBanner(env.COMPILE),
            }),
        ],
        node: {
            fs: 'empty',
        },
    });
};