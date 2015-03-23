/**
 * KnockToWindow v 1.0 2015-03-18
 */
(function($, window) {

    $.fn.KnockToWindow = function(config) {

        var self = this.addClass('KTW-Position-Bottom KTW-Position-Right KTW-Direction-Bottom-to-top');

        var options = $.extend({
            position: 'bottom-right',
            width: '200px',
            height: '75px',
            theme:'',
            addition: 'vertical',
            duration: 10000,
            animationOpen: 0,
            animationClose: 0,
            content: '',
            closeElement: "<button class='KTWClose'>Close</button>"
        }, config);

        //self.css('max-width', ($('.KTWNotice').length +1)*200 + 'px');


        function ucFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        var split = options.position.split('-');


        var id = self.data('counter');

        self.data('counter',
            typeof id === "undefined" ? id = 0 : id = id + 1);

        var div = $("<div/>")
            //.css('opacity', 0)
            .attr({
                'id': id,
                'class': "KTWNotice KTW-AnimationOpen"
            }).append('' + id + '');

        self.append(div);

        var notice = $("#" + id);

        //$("#KnockToWindow").addClass('KTW-TransitionS');


        notice
            .on('click.KnockToWindow', function() {
                $(this).addClass('');
            })
            .on('click.KnockToWindow', '.KTWClose', function() {
                $(this).parent().remove();
                self.css(rule());
            });


    };

})(jQuery, window);


