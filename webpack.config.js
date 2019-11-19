const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * @type import('webpack').Configuration
 */
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'app.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.(vs|fs|txt)$/,
                include: [
                    path.resolve(__dirname, "src"),
                ],
                use: 'raw-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: '*.png', context: 'src' },
            { from: '*.jpg', context: 'src' },
            { from: '*.gif', context: 'src' },
        ]),
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8080,
    },
}
