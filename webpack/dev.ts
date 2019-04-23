import {resolve} from "path";
import {Configuration} from "webpack";

const config: Configuration = {
    entry: "./src/index.ts",
    devtool: "source-map",
    mode: "development",
    cache: false,
    output: {
        path: resolve("./build/"),
        publicPath: "/",
        filename: "dist.js",
        pathinfo: true
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [resolve(__dirname), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            },
        ]
    }
};
module.exports = config;
