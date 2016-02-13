var webpack = require('webpack');
var path = require('path');

var config = {
    entry: path.resolve(__dirname, 'app/scripts/app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        },
        {
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
        }
    ]
    }
};

module.exports = config;