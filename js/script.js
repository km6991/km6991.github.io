$(document).ready(function(){
    $('.carousel__item').slick({
        speed: 300,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icon/left.png" alt="left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icon/right.png" alt="right"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                dots: true,
                centerMode: true
              }
            }
          ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        console.log('1236')
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlade (item){
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    }

        toggleSlade('.catalog-item__list-back');
        toggleSlade('.catalog-item__link');
        // toggleSlade('.button_submit');

    $('[data-modal=consultation]').on('click',function(){
        $('.overlay, #consultation').fadeIn('clow');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut();

    });

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__subtittle').text($('.catalog-item__subtittle').eq(i).text());
            $('.overlay, #order').fadeIn('clow');
        })
    });
    
    function validForm(form){
        $(form).validate({
            rules:{
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите имя",
                    minlength: jQuery.validator.format("Поле должно содержать не менее {0} символов")
                },
                phone: "Пожалуйста, введите телефон",
                email: {
                    required: "Пожалуйста, введите Email",
                    email: "Email должен содержать @"
                }
            }
        });
    };
    validForm('#consultation form');
    validForm('#order form');
    validForm('#cons-form');
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        if(!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='=']").click(function(){
        const _href = $(this).attr("href");
        $("html,body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

  });