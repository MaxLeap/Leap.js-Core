define(
    [
        'app',
        'component/highchart/BasicChart/view',
        'U',
        'dispatcher',
        'jquery',
        'underscore',
        'i18n',
        'highcharts',
        'datetimepicker'
    ],
    function (AppCube, BasicChart, U, Dispatcher, $, _, i18n) {
        /**
         * title
         * ranges
         * tabs
         * time
         * stats
         * options (highchart options)
         * compared
         * maxLength
         * storeName
         * stateName
         * valueEventName
         */

        return BasicChart.extend({
            initTimeRange:function (){
                var self = this;
                var times = this.options.timerange;
                var default_time_unit = this.options.default_time_unit;
                this.time_range = times[default_time_unit || 0].value;
                _.forEach(times, function (time, index) {
                    var timeName = self.options.doI18n?i18n.t(time.name):time.name;
                    var node = $('<li class="' + (index == default_time_unit ? 'active' : '') + '" >' +
                        '<a href="javascript:void(0)">' + timeName + '</a></li>');
                    node.attr('data-value',JSON.stringify(time.value));
                    self.$('.tabs>.nav').append(node);
                });
            },
            clickTabs: function (e) {
                if ($(e.currentTarget).hasClass('disabled'))return;
                var time_range = $(e.currentTarget).attr('data-value');
                this.time_range = JSON.parse(time_range);
                var index = $(e.currentTarget).index();
                this.$('.tabs li').removeClass('active');
                this.$('.tabs li:eq('+index+')').addClass('active');
                this.refresh();
            },
            getValue: function(){
                return {
                    time_range:this.time_range,
                    stats:this.stats
                };
            }
        });
    });