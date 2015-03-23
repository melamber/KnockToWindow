/**
 * KnockToWindow v 1.5 2015-03-24
 */
(function($, window) {

    $.fn.KnockToWindow = function(config) {
    var time = (new Date()).getMilliseconds();

        var options = $.extend({
                position: 'bottom-right',
                width: '200px',
                height: '75px',
                direction: 'bottom-to-top',
                duration: 5000,
                animateOpen: 'fade-in 2s',
                animateClose: 'fade-out 2s',
                content: '',
                closeElement: "<button class='KTWClose'>Close</button>",
                actionOpen: 0,
                actionClose: 0
            }, config),

            ucFirst = function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            callback = function(func) {
                if(typeof func === "function") {
                    func();
                }
            },

            position = (function() {
                var split = options.position.split('-'),
                    pos = '';
                for(var i in split) {
                    pos += " KTW-Position-" + ucFirst(split[i]);
                }
                return pos;
            })(),

            direction = " KTW-Direction-" + ucFirst(options.direction),


            self = this.addClass(position + direction);

        if(self.hasClass("KTW-Position-Middle")
            && self.hasClass("KTW-Position-Center")) {
            self = this.addClass('KTW-MC');
        }

        var id = self.data('counter');

        self.data('counter',
            typeof id === "undefined"
                ? id = 'KTW1'
                : id = 'KTW' + (parseInt(id.replace("KTW",""))+1));

        var notice = $("<div/>")
            .css({
                animation : options.animateOpen,
                width: options.width,
                height: options.height
            })
            .addClass('KTWNotice KTW-Animation-Open')
            .attr('id', id)
            .appendTo(self)
            .append(options.content)
            .on('animationstart', callback(options.actionOpen));

        setTimeout(function(){
            notice
                .css('animation', options.animateClose)
                .addClass('KTW-Animation-Close');

            notice.on('animationend', function(){
                callback(options.actionClose);
                this.remove();
            });
        }, options.duration);

        notice
            .on('click.KnockToWindow', function() {
                $(this).addClass('');
            })
            .on('click.KnockToWindow', '.KTWClose', function() {
                $(this).parent().remove();
            });

        var time2 = (new Date()).getMilliseconds();
        console.log(time2-time);
    };

})(jQuery, window);

