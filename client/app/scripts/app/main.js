define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        ApplicationView   = require('app/views/Application')

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "/:screen_name": "crowdfunder"
        },

        home: function () {
        	require(["app/views/Application"], function (ApplicationView) {
            	var view = new ApplicationView({model: "" , el: $("#application")});
                view.render();
            });
        },
        crowdfunder: function (screen_name) {
            require(["app/views/Crowdfunder", "app/models/Crowdfunder"], function (CrowdfunderView, models) {
                var crowdfunders = new models.CrowdfunderCollection;
                crowdfunders.fetch({
                    success: function (data) {
                        var crowdfunder = crowdfunders.findWhere({ screen_name: screen_name });
                        var view = new CrowdfunderView({model: crowdfunder, el: $content});
                        view.render();
                    }
                });
            });
        }

    });

});