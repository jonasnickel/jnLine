/*!
 * jnLine.js v1.0.0 (http://github.com/jonasnickel/jnLine)
 * @copyright Jonas Nickel
 * @license GNU (http://github.com/jonasnickel/jnLine/blob/master/LICENSE)
 */
(function ($) {
    $.fn.jnLine = function (options) {
        var viewportwidth = this.width(),
            viewportHeight = this.height();
        var settings = $.extend({
            svgId: 'jnLine',
            strokeColor: "#000",
            strokeWidht: 2,
            animateTime: 1000,
            interval: 600,
            fadeOutTime: 800,
            lifeTime: 2000,
            width: viewportwidth,
            height: viewportHeight,
            easing: 'swing',
        }, options);
        
        function creatLine(width, height) {
            var startItemsWidth = Array(0, width);
            var ramdomItemWidth = startItemsWidth[Math.floor(Math.random() * startItemsWidth.length)];
            var startItemsHeight = Array(0, height);
            var ramdomItemHeight = startItemsHeight[Math.floor(Math.random() * startItemsHeight.length)];
            const svgns = "http://www.w3.org/2000/svg";
            var x1 = ramdomItemWidth,
                y1 = Math.random() * height,
                x2,
                y2 = Math.random() * height;
            if (ramdomItemWidth === 0) {
                x2 = width;
            } else {
                x2 = 0
            }
            //var line = document.createElementNS(svgns, 'line');
            var line = document.createElementNS(svgns, 'line');
            line.setAttributeNS(null, 'x1', x1);
            line.setAttributeNS(null, 'y1', y1);
            line.setAttributeNS(null, 'x2', x2);
            line.setAttributeNS(null, 'y2', y2);
            line.setAttributeNS(null, 'stroke-width', settings.strokeWidht);
            line.setAttributeNS(null, 'stroke', settings.strokeColor);
            line.setAttributeNS(null, 'class', "line off");
            if (settings.motionBlur === true) {
                line.setAttributeNS(null, 'filter', 'url(#directional-blur)')
            }
            document.getElementById(settings.svgId).appendChild(line);
            var length = line.getTotalLength();
            line.setAttributeNS(null, 'stroke-dasharray', length);
            line.setAttributeNS(null, 'stroke-dashoffset', length);
        }

        function animate() {
            jQuery('.line.off').each(function () {
                jQuery(this).addClass('on').removeClass('off');
                jQuery(this).animate({
                    'stroke-dashoffset': 0
                }, settings.animateTime, settings.easing);
                var $this = jQuery(this);
                setTimeout(function () {
                    $this.fadeOut(settings.fadeOutTime, function () {
                        jQuery(this).remove();
                    });
                }, settings.lifeTime)

            });
        }
        setInterval(function () {
            creatLine(settings.width, settings.height);
            animate();
        }, settings.interval);
    };
}(jQuery));
