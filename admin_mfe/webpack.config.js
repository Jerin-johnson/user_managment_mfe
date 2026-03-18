const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",

  mode: "development",

  devServer: {
    port: 3003,
    hot: true,
    historyApiFallback: {
      index: "/index.html",
    },
    static: {
      directory: path.join(__dirname, "public"),
    },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  output: {
    publicPath: "http://localhost:3003/",
    clean: true,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "admin",
      filename: "remoteEntry.js",

      exposes: {
        "./App": "./src/App",
        "./AdminRoot": "./src/AdminRoot",
      },

      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.2.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.2.0",
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "6.22.3",
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
