$(document).ready(function () {

    // SLICK SLIDER
    $('.watch-slider__content').slick({
        prevArrow: '<img class="watch-slider__arrow watch-slider__arrow_prev" src="img/icons/icon-arrow-slider.svg" alt="prev"></img>',
        nextArrow: '<img class="watch-slider__arrow watch-slider__arrow_next" src="img/icons/icon-arrow-slider.svg" alt="prev"></img>',
        slidesToShow: 1,

        responsive: [{
            breakpoint: 769,
            settings: {
                arrows: false,
                dots: true
            }

        }]
    });

    // CATALOG TABS AND MORE
    $('.catalog__triggers-mobile').change(function () {
        $('.catalog__content-item').removeClass('catalog__content-item_active');
        $('.catalog__card-more').removeClass('catalog__card-more_active');

        $(`#${$('.catalog__triggers-mobile option:selected').val()}`).addClass('catalog__content-item_active');
    });

    $('.catalog__triggers-item').click(function () {
        $('.catalog__triggers-item').removeClass('catalog__triggers-item_active');
        $('.catalog__content-item').removeClass('catalog__content-item_active');
        $('.catalog__card-more').removeClass('catalog__card-more_active');

        $(this).addClass('catalog__triggers-item_active');
        $(`#${$(this).attr('data-tab-ibdex')}`).addClass('catalog__content-item_active');
    });

    $('.catalog__card-link-more').click(function (e) {
        e.preventDefault();
        $('.catalog__card-more').removeClass('catalog__card-more_active');
        $(this)
            .parents('.catalog__card-wrap-info')
            .children('.catalog__card-more')
            .addClass('catalog__card-more_active');
    })

    $('.catalog__card-link-back').click(function (e) {
        e.preventDefault();
        $(this)
            .parents('.catalog__card-more')
            .removeClass('catalog__card-more_active');
    })


    // MODAL:
    $('.modal__close').click(function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('[data-modal=consultation]').click(function () {
        $('.overlay, #consultation').fadeIn();
    });

    $('.catalog__card-button').each(function (i) {
        $(this).click(function () {
            $('#order .modal__descr').text($('.catalog__card-title').eq(i).text())
            $('.overlay, #order').fadeIn();
        })
    })


    // VALIDATE FORMS
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: {
                    required: true,
                    minlength: 18,
                },
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: {
                    required: "Пожалуйста введите свое имя!",
                    minlength: jQuery.validator.format("Требуется как минимум {0} символов!"),
                },
                phone: {
                    required: "Пожалуйста введите номер телефона!",
                    minlength: jQuery.validator.format("Требуется как минимум 11 символов!"),
                },
                email: {
                    required: "Пожалуйста укажите свою почту!",
                    email: "Не верный формат. Пример: exemple@email.com",
                },
            }
        })
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask('+7 (000) 000-00-00');
});