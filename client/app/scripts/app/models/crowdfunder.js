define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        serverUrl   = require('app/serverUrl'),

        Crowdfunder = Backbone.Model.extend({

        urlRoot: serverUrl + "/crowdfunders",

        initialize: function () {
            
        }

    }),

    CrowdfunderCollection = Backbone.Collection.extend({

        model: Crowdfunder,

        url: function() {
            return serverUrl + '/crowdfunders';
        },
        parse: function(response) {
            var crowdfunders= [];
            for(var crowdfunder in response){
                    crowdfunders.push(response[crowdfunder]);
            }
            return crowdfunders;
        }   

    }),

    originalSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        if (method === "read") {
            options.dataType = "jsonp";
            return originalSync.apply(Backbone, arguments);
        }
    };

    return {
        Crowdfunder: Crowdfunder,
        CrowdfunderCollection: CrowdfunderCollection
    };

});