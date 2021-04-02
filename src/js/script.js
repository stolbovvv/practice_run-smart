$(document).ready(function () {

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


});