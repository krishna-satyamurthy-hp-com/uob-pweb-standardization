function initDropdownSelectCardCompare() {

    $('.dropdown-select ul li').off('click').on('click', function () {
        var me = $(this),
            dataTabCard = me.attr('data-uob-tab-card'),
            dropdownOpen = me.closest('.dropdown'),
            buttonDropDown = dropdownOpen.find('.btn-dropdown-select'),
            spanText = buttonDropDown.find('span:first-child');

        if (spanText.text() !== me.text()) {
            $(spanText).animate({opacity: 0})
                .queue(function () {
                    $(this).text(me.text()).dequeue();
                    buttonDropDown.trigger('change', dataTabCard);
                })
                .animate({opacity: 1}, 350);
        }
    });
}


function scrollToElement(selector, time, verticalOffset) {
    var element = $(selector),
        offset = element.offset(),
        offsetTop = offset.top + verticalOffset;

    time = typeof (time) !== 'undefined' ? time : 1000;
    verticalOffset = typeof (verticalOffset) !== 'undefined' ? verticalOffset : 0;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
}

$(document).ready(function () {

//     .click(function() {
//         console.log("aksdjf;lasdf");
//         var el = $(this),
//             target = $(el.find('a').attr('href')),
//             heading = target.find('> .heading2'),
//             navbar = $('.sticky-nav'),
//             top = navbar.height();
//
//         heading.attr('tabindex', '1'); // Web Accessibility
//         if (top === null || top === 0 || undefined) {
//             top = 0;
//         }
//         if (!(navbar).hasClass('affix')) {
//             top += top + (navbar.outerHeight(true) - navbar.innerHeight());
//         }
//         el.addClass('active').siblings().removeClass('active');
// ;
//     });

    var cardfilter = $('#cardfilter');
    var compare_cards_list = $('.compare-cards-list');
    var compare_cards_result = $('.compare-cards-result');
    var card_add_plus_hidden = $('.card-add-plus.hidden');
    var compare_card_clear_all = $('#compare-card-clear-all');
    var compare_card_action = $('#compare-card-action');
    var compare_card_action_mobile = $('#compare-card-action-mobile');
    var listCompare = $('.list-compare-card');
    var iconX = $('.icon-X');
    var compareCards = $('.compare-cards');
    var filterCardsMobile = $('.filter-cards');

    function updateButtonCompare() {
        var count = $('#compare-card-action .count'),
            countMobile = $('#compare-card-action-mobile .count'),
            cardAdded = compare_cards_result.find('.card-item').not('.card-add-plus'),
            countStr = cardAdded.length + "/4";

        if (isMobile.phone) {

            countStr = cardAdded.length + "/2";
            countMobile.text(countStr);
        } else {
            count.text(countStr);
        }


        return cardAdded.length;
    }

    function initViewMoreCard() {
        $('body').on('click', '.view-more-cards-btn', function (e) {
            var me = $(this),
                tabPane = me.closest('.tab-pane'),
                cardItem = tabPane.find('.card-row > div');

            $(cardItem).fadeIn();
            me.fadeOut();
        });
    }

    function initForNonMobileCompare() {
        $('body').on('click', '.compare-cards-list .onoffswitch-checkbox', function (e) {
            var me = $(e.target),
                id = me.attr('id'),
                cardItem = me.closest(".card-item"),
                cardAdded = compare_cards_result.find('.card-item').not('.card-add-plus');

            if (cardAdded.length == 4 && !compare_cards_result.find(".card-item").hasClass(id)) {
                me.prop('checked', false);
                return;
            }

            cardItem.toggleClass('active');

            if (compare_cards_result.find(".card-item").hasClass(id)) {
                var duplicateCard = compare_cards_result.find('.' + id);
                duplicateCard.html(card_add_plus_hidden.html());
                duplicateCard.attr('class', 'card-item card-add-plus');
            } else {
                var cardrowret = compare_cards_result.find('.card-add-plus').not('.hidden');
                var cardAddplus = cardrowret.eq(0);
                if (cardAddplus.length > 0) {
                    cardAddplus.html(cardItem.html());
                    cardAddplus.removeClass('card-add-plus');
                    cardAddplus.addClass(id);
                    cardAddplus.addClass('active');
                    cardAddplus.find('.fixed-bottom').removeClass('fixed-bottom');

                    var onoffswitch_checkbox = $(cardAddplus.find('.onoffswitch-checkbox')),
                        onoffswitch_label = $(cardAddplus.find('.onoffswitch-label')),
                        newId = onoffswitch_checkbox.attr('id') + "-compare-result";

                    onoffswitch_checkbox.prop('checked', true);
                    onoffswitch_checkbox.attr('id', newId);
                    onoffswitch_label.attr('for', newId);
                }
            }

            updateButtonCompare();
        });
    }

    function initForMobileCompare() {
        $('body').on('click', '.compare-cards-list .onoffswitch-checkbox', function (e) {
            var me = $(e.target),
                id = me.attr('id'),
                cardItem = me.closest(".card-item"),
                cardAdded = compare_cards_result.find('.card-item').not('.card-add-plus');

            if (cardAdded.length == 2 && !compare_cards_result.find(".card-item").hasClass(id)) {
                me.prop('checked', false);
                return;
            }

            cardItem.toggleClass('active');
            var cardName = cardItem.find('.card-name').text();


            if (compare_cards_result.find(".card-item").hasClass(id)) {
                var duplicateCard = compare_cards_result.find('.' + id);
                duplicateCard.html(card_add_plus_hidden.html());
                duplicateCard.attr('class', 'card-item card-add-plus');

                var idCardCompare = listCompare.find('.' + id);
                idCardCompare.animate({opacity: 0})
                    .queue(function () {
                        $(this).text("").dequeue();
                    })
                    .animate({opacity: 1}, 350);

                idCardCompare.removeClass(id).addClass('empty');

            } else {
                var cardrowret = compare_cards_result.find('.card-add-plus').not('.hidden');
                var cardAddplus = cardrowret.eq(0);
                if (cardAddplus.length > 0) {
                    cardAddplus.html(cardItem.html());
                    cardAddplus.removeClass('card-add-plus');
                    cardAddplus.addClass(id);
                    cardAddplus.addClass('active');
                    cardAddplus.find('.fixed-bottom').removeClass('fixed-bottom');

                    var onoffswitch_checkbox = $(cardAddplus.find('.onoffswitch-checkbox')),
                        onoffswitch_label = $(cardAddplus.find('.onoffswitch-label')),
                        newId = onoffswitch_checkbox.attr('id') + "-compare-result";

                    onoffswitch_checkbox.prop('checked', true);
                    onoffswitch_checkbox.attr('id', newId);
                    onoffswitch_label.attr('for', newId);
                }
                var emptyList = listCompare.find('.empty'),
                    emptyItem = emptyList.eq(0);

                if (emptyItem.length > 0) {
                    emptyItem.text(cardName);
                    emptyItem.addClass(id);
                    emptyItem.removeClass('empty');
                }

            }

            updateButtonCompare();
        });

    }

    // end function

    initViewMoreCard();
    $('.onoffswitch-checkbox').prop('checked', false);
    $('body').addClass('cards-compare-page');

    // var group = $('.cards-list').find('.card-row');
    // for (var i = 0, len = group.length; i < len; i++) {
    //     var items = $(group[i]).find('.card-item');
    //     items.setAllToMaxHeight();
    // }

    if (!isMobile.phone) {

        $('.card-item .card-name').setAllToMaxHeight();
        $('.card-item .card-desc').setAllToMaxHeight();

        setTimeout(function () {
            $('.cards-list .card-item').not('.card-add-plus').setAllToMaxHeight();
            $('.card-item .apply-btn').addClass('fixed-bottom');
        }, 350);



    }


    if (!isMobile.phone) {
        initForNonMobileCompare();
    } else {
        initForMobileCompare();
        $('#footer').css('padding-bottom', '67px');
    }

    $('body').on('click', '.compare-cards-result .onoffswitch-checkbox', function (e) {
        var me = $(e.target),
            cardItem = me.closest(".card-item"),
            parentCardItem = cardItem.parent();


        var checkboxId = $(cardItem).attr('class').replace('card-item', '').replace('active', '').trim();

        $('#' + checkboxId).click();

        $(cardItem).attr('class', 'card-item card-add-plus');
        $(cardItem).html(card_add_plus_hidden.html());

        compare_cards_result.find('.card-row').find('.hidden').before(parentCardItem.clone());
        parentCardItem.remove();

        if (updateButtonCompare() <= 0) {
            compare_cards_result.fadeOut();
            compareCards.fadeIn();
            compare_cards_list.fadeIn();
            cardfilter.fadeIn();
        }
    });

    //compare button function
    $('#compare-card-action, #compare-card-action-mobile').click(function () {
        if (updateButtonCompare() < 2) {
            if (isMobile.phone) {
                alert("Please select 2 to compare.");
            } else {
                alert("Please select 2 to 4 cards to compare.");
            }
            return;
        }

        compareCards.fadeOut();

        compare_cards_result.fadeIn(function(){
            $('.compare-cards-result .card-item .card-name').setAllToMaxHeight();
            $('.compare-cards-result .card-item .card-desc').setAllToMaxHeight();

            // var compareCardItem = $('.compare-cards-result .card-item').not('.card-add-plus');
            var compareCardItem = $('.compare-cards-result .card-item');
            var applyButton = $('.compare-cards-result .card-item .apply-btn');
            applyButton.removeClass('fixed-bottom');

            // $('.compare-cards-result .card-add-plus').height('auto');

            setTimeout(function(){
                compareCardItem.height('auto');
                compareCardItem.setAllToMaxHeight();
            },350);

            if (!isMobile.phone) {
                compare_cards_list.fadeOut();
                setTimeout(function(){
                    applyButton.addClass('fixed-bottom');
                }, 450);
                cardfilter.fadeOut();
            }

            if (isMobile.phone) {
                filterCardsMobile.fadeOut();
            }

            $('html, body').animate({
                scrollTop: $('.compare-cards-result').offset().top
            }, 350);

        });

    });

    compare_card_clear_all.click(function () {
        var chekedBtn = compare_cards_result.find('.onoffswitch-checkbox');
        chekedBtn.click();
        compare_cards_result.fadeOut();
        compareCards.fadeIn();
        compare_cards_list.fadeIn();
        cardfilter.fadeIn();
    });

    $('#compare-card-arrow').on('click', function () {

        if (listCompare.find('.empty').length == 2) {
            return;
        }

        listCompare.slideToggle();

        $(this).find('.icon-button-double-arrow').toggleClass('active');
    });

    $('body').on('click', '.add-credit-card', function () {
        compare_cards_result.fadeOut();
        compareCards.fadeIn();
        compare_cards_list.fadeIn();
        cardfilter.fadeIn();
        // compare_cards_list.fadeIn();
    });

    $('.btn-dropdown-select').on('change', function (e, dataTabCard) {
        var me = $(this);
        $('.nav-tabs a[href="' + dataTabCard + '"]').tab('show');
    });

    iconX.click(function () {
        var me = $(this),
            cardname = me.parent().find('.card-name'),
            switchId = cardname.attr('class').replace('card-name', '').trim();

        $('#' + switchId).click();
        setTimeout(function () {
            if (updateButtonCompare() === 0) {
                compare_cards_result.fadeOut();
                compareCards.fadeIn();
                compare_cards_list.fadeIn();
                cardfilter.fadeIn();
                filterCardsMobile.fadeIn();

                listCompare.slideToggle();
                $('.icon-button-double-arrow').toggleClass('active');

            }
        }, 350);
    })
});

$(window).load(function () {
    $('.tabs-card-type .nav-heading').off('click.scr', 'li');
    $('.tabs-card-type').removeClass('affix-top');
    initDropdownSelectCardCompare();
});

$(window).resize(function () {
    if(isMobile.phone) {
        var cardItem = $('.compare-cards-result').find('.card-item');
        var cardName = $('.compare-cards-result').find('.card-name');
        var cardDesc = $('.compare-cards-result').find('.card-desc');
        cardDesc.height('auto');
        cardName.height('auto');
        cardItem.height('auto');
        setTimeout(function () {
            cardDesc.setAllToMaxHeight();
            cardName.setAllToMaxHeight();
            cardItem.setAllToMaxHeight();
        }, 350);

    }
    // $('.cards-list .card-item').height('auto');
    // $('.card-item .card-name').setAllToMaxHeight();
    // $('.card-item .card-desc').setAllToMaxHeight();
    // $('.card-item .apply-btn').addClass('fixed-bottom');
});
