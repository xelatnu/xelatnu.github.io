$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight:true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></img></button>',
        // responsive: [
        //     {
        //         breakpoint:600,
        //         settings: {                   
        //             dots: true,
        //             arrows: false,
        //             slidesToShow: 2,
        //             slidesToScroll: 2,
        //         }
        //     }
        // ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    $('.catalog-item__link').each(function(i){
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); 
        }) 
    });
    $('.catalog-item__back').each(function(i){
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); 
        }) 
    });

    //Modal
        //consultation
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });

        //order
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //Form validation with Jquery Plugin

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожайлуста, введите свое имя",
                    minlength: jQuery.validator.format("Пожайлуста, введите минимум {0} символа или свое полное имя"),
                },
                phone:"Пожайлуста, введите свой номер телефона",
                email: {
                  required: "Пожайлуста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
              }
        });
    };
    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    //Masked input
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //Mailer PHP
    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        };

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll and pageup
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        }
        else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //WOW animations
    new WOW().init();

  });