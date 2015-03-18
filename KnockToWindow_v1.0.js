/**
 * KnockToWindow v 1.0 2015-03-18
 */
(function($, window) {
    $.fn.KnockToWindow = function(config) {

        var self = this,

            /**
             * Configuration of plugin
             * @type {Object}
             */
            options = $.extend({
                position: 'bottom-right',
                width: '200px',
                height: '75px',
                addition: 'vertical',
                transition: 'fade',
                timeOpen: 1,
                timeClose: 1,
                duration: 10000,
                actionOpen: 0,
                actionClose: 0,
                content: '',
                closeElement: "<button class='KTWClose'>Close</button>"
            }, config),

            split = options.position.split('-'),

            /**
             * The location of the main block by vertical
             * @returns {object} suite of css-rules for the main block
             */
            verticalRuleBlock = function() {
                switch(split[0]) {
                case 'middle':
                    return {
                        'top': 50 - (self.outerHeight() / 2)
                        / (window.innerHeight / 100) + '%'
                    };
                case 'top':
                    return {
                        'top': '0'
                    };

                default:
                    return {
                        'bottom': '0'
                    }
                }
            },

            /**
             * The location of the main block by horizontal
             * @returns {object} suite of css-rules for the main block
             */
            horizontalRuleBlock = function() {
                switch(split[1]) {
                case 'center':
                    return {
                        'left': 50 - (self.outerWidth() / 2)
                        / (window.innerWidth / 100) + '%'
                    };
                case 'left':
                    return {
                        'left': '0'
                    };
                default:
                    return {
                        right: '0'
                    }
                }
            },

            /**
             * Dimensions of the main block
             * @returns {object} suite of css-rules for the main block
             */
            ruleDimensionsBlock = (function() {
                if(options.addition === 'horizontal') {
                    return {
                        height: options.height,
                        width: 'auto'
                    }
                } else {
                    return {
                        height: 'auto',
                        width: options.width
                    }
                }
            })(),

            /**
             * Dimensions of the notice block
             * @type {object} suite of css-rules for the block notice
             */
            ruleDimensionsNotice = (function() {
                if(options.addition === 'horizontal') {
                    return {
                        width: options.width,
                        height: '100%',
                        'float': 'left'
                    }
                } else {
                    return {
                        height: options.height,
                        width: '100%'
                    }
                }
            })(),

            /**
             * @returns {object} merging suite of css-rules for the main block
             */
            rule = function() {
                return $.extend(verticalRuleBlock(), horizontalRuleBlock());
            },

            /**
             * Defined css-rules of the block notice for animation
             * @type {object} suite of css-rules
             */
            style = (function() {
                switch(options.transition) {
                case 'slide':
                    if(options.addition === 'horizontal') {
                        return {
                            show: {width: options.width},
                            hide: {width: 0}
                        };
                    } else {
                        return {
                            show: {height: options.height},
                            hide: {height: 0}
                        };
                    }
                    break;
                case 'show':
                    var re = /(\d*)([^\d]*)/,
                        replacer = function(str, p1, p2) {
                            return parseInt(p1) / 2 + p2;
                        };
                    return {
                        show: {
                            width: options.width,
                            height: options.height,
                            marginTop: '0',
                            marginLeft: '0'
                        },
                        hide: {
                            marginTop: options.height.replace(re, replacer),
                            marginLeft: options.addition === 'horizontal'
                                ? 0
                                : options.width.replace(re, replacer),
                            width: 0,
                            height: 0
                        }
                    };
                    break;
                default:
                    return {
                        show: {opacity: 1},
                        hide: {opacity: 0}
                    }
                }
            })(),

            callback = function(func) {
                if(typeof func === "function") {
                    func();
                }
            },

            /**
             * Unique ID of the block notice
             * @type {Number}
             */
            id = self.data('counter');

        self.data('counter',
            typeof id === "undefined" ? id = 0 : id = id + 1);

        /**
         * New block notice
         * @type {object|HTMLElement}
         */
        var div = $("<div/>")
            .css('opacity', 0)
            .attr({
                'id': id,
                'class': "KTWNotice"
            })
            .append(options.content)
            .append(options.closeElement);

        //attaches the notice block in depends of location
        if((split[0] === 'bottom') || (split[1] === 'right')) {
            self.prepend(div);
        } else {
            self.append(div);
        }

        /**
         * Current notice block
         * @type {Object|jQuery}
         */
        var notice = $("#" + id);

        //it's deny to appear styles before animation
        if(options.transition !== "fade") {
            setTimeout(function() {
                notice.css({opacity: 1});
            }, 50);
        }

        //Performed opening animation and attached events to the block notice
        notice.css(style.hide)
            .animate(style.show, {
                duration: options.timeOpen,
                step: function() {
                    setTimeout(function() {
                        self.css(rule());
                    }, 50);
                },
                complete: callback(options.actionOpen)
            })
            .css(ruleDimensionsNotice)
            .on('click.KnockToWindow', function() {
                clearTimeout($(this).data('timeout'));
                $(this).css(style.show).stop();
            })
            .on('click.KnockToWindow', '.KTWClose', function() {
                $(this).parent().remove();
                self.css(rule());
            });

        //Assigns time for performed closing animation and remove block notice
        if(options.duration !== 0) {
            var time = setTimeout(function() {
                notice.animate(style.hide, {
                    duration: options.timeClose,
                    step: function() {
                        setTimeout(function() {
                            self.css(rule());
                        }, 50);
                    },
                    complete: function() {
                        callback(options.actionClose);
                        notice.remove();
                    }
                });
            }, options.duration);
        }
        notice.data('timeout', time);
        self.css(ruleDimensionsBlock);

        return this;
    };
})(jQuery, window);