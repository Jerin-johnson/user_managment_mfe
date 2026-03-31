const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",

  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: {
      index: "/index.html",
    },
    static: {
      directory: path.join(__dirname, "public"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
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
    publicPath: "auto", // ← Changed
    clean: true,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",

      remotes: {
        shared: "shared@/shared/remoteEntry.js", // ← Relative path
      },

      exposes: {
        "./App": "./src/App",
        "./Button": "./src/components/Button",
        "./AuthRoot": "./src/AuthRoot",
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
        zustand: { singleton: true },
        axios: { singleton: true },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
