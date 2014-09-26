define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        CrowdfunderTemplate = require('app/views/CrowdfunderItem');

    return Backbone.View.extend({

        render: function () {
            this.$el.empty();
            _.each(this.collection.models, function (crowdfunder) {
                this.$el.append(new CrowdfunderTemplate({model:crowdfunder}).render().el);
            }, this);
            return this;
        }
    });
});