var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'public/scripts/app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['react']
            }
        },
        {
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
        }
    ]
    }
};