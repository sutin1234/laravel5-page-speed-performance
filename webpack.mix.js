const mix = require('laravel-mix');
const MinifyHtmlWebpackPlugin = require('minify-html-webpack-plugin');
const purgeCss = require('laravel-mix-purgecss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        alias: {
            '@components': path.resolve('resources/js/components')
        }
    },
    output: {
        chunkFilename: 'js/chunks/[name].js',
    },
    plugins: [
        new MinifyHtmlWebpackPlugin({
            src: 'storage/framework/views/',
            dest: 'storage/framework/views/',
            ignoreFileNameRegex: /\.(gitignore)$/,
            rules: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ]
});
mix.options({
    postCss: [
        require('postcss-discard-comments')({
            removeAll: true
        })
    ],
    uglify: {
        uglifyOptions: {
            comments: false
        },
    },
    cssNano: {
        discardComments: {
            removeAll: true,
        },
    },
});
// mix.minify('public/js/app.js');
mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .postCss('public/css/app.css','public/css')
    .purgeCss({
        enabled: mix.inProduction(),
        extensions: ['html', 'js', 'php'],
    });
