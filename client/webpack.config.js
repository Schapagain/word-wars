const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
 "mode": "none",
 "entry": "./src/index.js",
 "output": {
   "path": __dirname + '/dist',
   "filename": "bundle.js"
 },
devServer: {
  static: {
   directory: path.join(__dirname, 'src')
  },
  hot: true,
 },
 "module": {
  "rules": [
    {
      "test": /\.css$/,
      "use": [
        "style-loader",
        "css-loader"
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
      ],
    },
    {
      "test": /\.js$/,
      "exclude": /node_modules/,
      "use": {
        "loader": "babel-loader",
        "options": {
          "presets": [
            "@babel/preset-env",
          ]
        }
      }
    },
  ]
},
plugins: [new HtmlWebpackPlugin({
  template: "src/index.html"
})]
}