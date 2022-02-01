const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
    entry: [
        "@babel/polyfill",
        path.join(__dirname, "client", "style.css"),
        path.join(__dirname, "client", "src", "start.js"),
    ],
    mode: 'production',
    output: {
        // path: path.join(__dirname, "client", "public"),
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true
    },
    performance: {
        hints: false,
    },
    devServer: {
        writeToDisk: true,
        // contentBase: path.join(__dirname, "client", "public"),
        contentBase: "./dist",
        proxy: {
            "/": {
                target: "http://localhost:3001",
            },
            "/socket.io": {
                target: "http://localhost:3001",
                ws: true,
            },
        },
        port: "3000",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
        }),
    ],
});
