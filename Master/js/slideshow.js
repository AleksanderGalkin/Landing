

    (function ($) {
        $.fn.slideshow = function (options) {
            options = $.extend({
                slides: ".slide",
                speed: 3000,
                easing: "swing"

            }, options);

            var timer = null; // ������
            var index = 0;    // ������

            var slideTo = function (slide, element) {
                var $currentSlide = $(options.slides, element).eq(slide);
                var imageUrl = "url(" + $currentSlide.data('image') + ")";
                element.stop(true, true)
                    .css("opacity", 0.1)
                    .css('background-image', imageUrl)
                    .css('background-size', 'cover')
                    .animate({
                        opacity: 1
                    }, options.speed, options.easing) ;
            };

            var autoSlide = function (element) { 	
                // �������������� ������������������
                timer = setInterval(function () {
                        index++; // �������� ������ �� 1
                        if (index == $(options.slides, element).length) {
                            index = 0; // ������� ������
                        }
                        slideTo(index, element);
                    }, options.speed); // ��� �� ��������, ��� � � ������ .animate() 
            };

            var startStop = function (element) {
                    element.hover(function () { // ������������� ��������
                        clearInterval(timer);
                        timer = null;
                    }, function () {
                        autoSlide(element); // ������������ ��������	
                    });
            };

            return this.each(function () {
                var $element = $(this);
                autoSlide( $element );
                startStop( $element );
				slideTo(0, $element);
            });
        }
    })(jQuery);

