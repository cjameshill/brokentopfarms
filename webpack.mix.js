let mix = require('laravel-mix');

mix.sass('resources/assets/scss/app.scss', 'public/css')
    .version();
