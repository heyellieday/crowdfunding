define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        Handelbars          = require('hbs!partials/application'),
        CrowdfunderModel     = require('app/models/crowdfunder'),
        CrowdfundersView = require('app/views/Crowdfunders');


    return Backbone.View.extend({

        initialize: function () {
        },

        render: function () {
            var crowdfunders = new CrowdfunderModel.CrowdfunderCollection();
            crowdfunders.fetch({
                success: function (data) {
                    var crowdfunderView = new CrowdfundersView({collection: crowdfunders, el: $("#content")});
                    crowdfunderView.render();
                }
            });
            this.$el.empty();
            this.$el.html(Handelbars());
            return this;
        },

        events: {
            
        },

    });

});