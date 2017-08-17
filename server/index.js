const path = require('path');
const express = require('express');
const expressVue = require('../src');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser("secret"));

const mix = require('../mix-manifest.json');

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

const prod = process.env.NODE_ENV !== 'development';

const pageTitle = 'Vue with Express running Serverless';

const vueOptions = {
    rootPath: path.join(__dirname, '../resources/assets/js/views'),
    layout: {
        start: '<body><div id="app">',
        end: '</div></body>'
    },
    vue: {
        head: {
            title: 'Express Vue',
            meta: [
                { script: 'https://unpkg.com/vue@2.4.2/dist/vue.js' },
                { style: prod ? 'https://d1bpdjlzpdhhdw.cloudfront.net' + mix['/public/css/app.css'].replace('/public', '') :  mix['/public/css/app.css'].replace('/public', '') },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                }
            ]
        }
    }
};
const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);


app.get('/', function (req, res) {
    const data = {
        message: 'Hello!'
    };

    const vue = {
        head: {
            title: pageTitle + ' | Home'
        }
    };
    res.renderVue('main', data, vue);
});

if(!prod){

    app.use(express.static('public'));

    app.listen(3000);

    console.log('Express server listening on port 3000');
}


module.exports = app;