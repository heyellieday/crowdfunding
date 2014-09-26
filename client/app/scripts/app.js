/*global require*/
'use strict';

require.config({

    baseUrl: '../bower_components/',

    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    },
    paths: {
        jquery: 'jquery/dist/jquery',
        backbone: 'backbone/backbone',
        underscore: 'lodash/dist/lodash',
        bootstrap: 'sass-bootstrap/dist/js/bootstrap',
        app: '../scripts/app',
        partials: '../scripts/partials',
        hbs: 'require-handlebars-plugin/hbs'

    }
});

require(['jquery', 'backbone', 'app/main'], function ($, Backbone, Main) {
    var main = new Main();
    Backbone.history.start();
});
