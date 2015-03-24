/**
 * KnockToWindow v 1.5
 * Date: 2015-03-24
 */
(function($) {

    $.fn.KnockToWindow = function(config) {

        var self = this,

            /**
             * Configuration of the plugin
             * @type {Object}
             */
            options = $.extend({
                position: 'bottom-right',
                width: '200px',
                height: 'auto',
                direction: 'bottom-to-top',
                duration: 10000,
                animateOpen: '',
                animateClose: '',
                content: '',
                closeElement: "<button class='KTWClose'>Close</button>",
                actionOpen: null,
                actionClose: null
            }, config),

            ucFirst = function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            callback = function(func) {
                if(typeof func === "function") {
                    func();
                }
            };

        //Adding classes for the main block on the basis of the configuration
        self.addClass(function() {
            var lcString = options.position.toLowerCase(),
                split = lcString.split('-'),
                position = (lcString === 'middle-center')
                    ? 'KTW-MC'
                    :'';

            for(var cur in split) {
                position += " KTW-Position-" + ucFirst(split[cur]);
            }

            return position + " KTW-Direction-" + ucFirst(options.direction);
        });

        /**
         * Unique ID of the block notice
         * @type {String}
         */
        var id = self.data('counter') || 'KTW-1';

        //calculate the number of the block notice
        self.data('counter', 'KTW-' + (parseInt(id.replace("KTW-", "")) + 1));

        /**
         * The new block notice with attached event handlers
         * @type {object|jQuery}
         */
        var notice = $("<div/>")
            .css({
                animation: options.animateOpen, //TODO retain?
                width: options.width,
                height: options.height
            })
            .addClass('KTWNotice KTW-Animation-Open')
            .attr('id', id)
            .append(options.content)
            .append(options.closeElement)
            .appendTo(self)
            .on('animationstart.KTW', callback(options.actionOpen))
            .on('click.KTW', function() {
                $(this).css('animation', 'none') //TODO retain?
                    .addClass('KTW-Animate-None');
            })
            .on('click.KTW', '.KTWClose', function() {
                $(this).parent().remove();
            });

        //Closing and removing the block notice after specified time
        if(options.duration != 0) {
            setTimeout(function() {
                notice.addClass('KTW-Animation-Close');

                if(!notice.hasClass('KTW-Animate-None')) { //TODO retain?
                    notice.css('animation', options.animateClose);
                }

                notice.on('animationend.KTW', function() {
                    callback(options.actionClose);
                    this.remove();
                });
            }, options.duration);
        }
        return this;
    };

})(jQuery);