const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const optimization = () => ({
  splitChunks: {
    chunks: "all",
  },
  minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
});

const cssLoader = (extra) => {
  const loader = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "",
      },
    },
    "css-loader",
  ];

  if (extra) {
    loader.push(extra);
  }

  return loader;
};

const jsLoaders = (extra) => {
  const loader = {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  };

  if (extra) loader.options.presets.push(extra);

  return loader;
};

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const setPlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.png"),
          to: path.resolve(__dirname, "docs"),
        },
      ],
    }),
    new MiniCssExtractPlugin({ filename: filename("css") }),
  ];

  return plugins;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.jsx",
    stat: "./statistics.ts",
  },
  target: "web",
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "docs"),
  },
  resolve: {
    extensions: [".js", ".json", ".png"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@css": path.resolve(__dirname, "src/css"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@model": path.resolve(__dirname, "src/model"),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: false,
  },
  devtool: isDev ? "source-map" : false,
  plugins: setPlugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoader(),
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        type: "asset/resource",
      },
      {
        test: /\.less$/,
        use: cssLoader("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoader("sass-loader"),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders("@babel/preset-typescript"),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: jsLoaders("@babel/preset-react"),
      },
    ],
  },
};
