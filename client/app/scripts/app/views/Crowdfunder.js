define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Handlebars          = require('hbs!partials/crowdfunder');

    return Backbone.View.extend({

        render: function () {
            this.$el.html(Handlebars(this.model.attributes));
            return this;
        },
        makeDonation: function (crowdfunder) {
            var donationView  = new DonationView({model: crowdfunder, el: $("#donation")});
            donationView.render();
        }
    });

});