const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, './dist'),
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                use:
                    [{ loader: 'babel-loader' }],

                exclude: /node_modules/,

            },
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }
        ],
    },
}