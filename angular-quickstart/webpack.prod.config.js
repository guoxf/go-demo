var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    plugins: [commonsPlugin,new webpack.optimize.UglifyJsPlugin()],
    entry: ['./app/main.ts'],
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
        extends: ['', '.js', '.ts', '.tsx']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.tsx$/, loader: 'webpack-typescript?target=ES5&jsx=react' },
            { test: /\.ts$/, loader: 'ts' }
        ]
    }
}