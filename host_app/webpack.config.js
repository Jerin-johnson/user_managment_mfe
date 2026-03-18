const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",

  mode: "development",

  devServer: {
    port: 3000,
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
    publicPath: "http://localhost:3000/",
    clean: true,
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",

      remotes: {
        auth: "auth@http://localhost:3001/remoteEntry.js",
        user: "user@http://localhost:3002/remoteEntry.js",
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
