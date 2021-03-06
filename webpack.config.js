const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'index':'./src/Index.jsx',
    'ingredients': './src/Ingredients.jsx',
    'results': './src/Results.jsx',
    'cuisinetime':'./src/CuisineTime.jsx',
    'mealtype':'./src/MealType.jsx',
    'search':'./src/Search.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/bundles'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.jpg?$/, //.jpg files are also bundled to allow images to be easily imported into components
        use: 'file-loader',
      },
    ],
  },
};