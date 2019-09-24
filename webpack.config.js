const path = require('path');

module.exports = {
    entry: './core/main.js',
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'main-bundle.js'
    },
    mode: 'production'
};