$(document).ready(function() {
var slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    navPosition: 'bottom',
    controls: false,
    nav: false
});
    document.querySelector('.prev').onclick = function () {
        slider.goTo('prev');
      };
      document.querySelector('.next').onclick = function () {
        slider.goTo('next');
      };

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
    //modal
    $('[data-modal=consultation]').on('click',function() {
        $('.overlay, #consult').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consult, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq (i).text());
            $('.overlay, #order').fadeIn('slow');
        });
        //close anywhere
    $(window).on('click', function(e) {
            if (e.target.classList.contains('overlay')) {
                $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
            }
        });
        //close esc
    $(document).keyup(function(e) {
            if (e.keyCode === 27) {   // esc
               $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
            }
          });

    });
    function ValidateForm (form) {
        $(form).validate ({
            rules: {
                name: {
                    required: true,
                    minlength:2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    ValidateForm ('#consultation-form');
    ValidateForm ('#consult form');
    ValidateForm ('#order form');

    $('input[name=phone]').mask('+3 (999) 999 99 99');
//formsender
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consult, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#']").click(function(){
            const _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });

});