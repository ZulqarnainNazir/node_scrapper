$(window).load(function() {
    $('.bwWrapper').BlackAndWhite({
        hoverEffect: true, // default true
        // set the path to BnWWorker.js for a superfast implementation
        webworkerPath: false,
        // for the images with a fluid width and height
        responsive: true,
        speed: {//this property could also be just speed: value for both fadeIn and fadeOut
            fadeIn: 200, // 200ms for fadeIn animations
            fadeOut: 800 // 800ms for fadeOut animations
        }
    });
    $('.bwWrapper').addClass('handled');
});

$(document).ready(function() {
    "use strict";
    
    renderMenu();

    // fancybox
    fancybox();
    handleDatepicker();
    handleTooltip();

    // jquery_links
    jquery_links();
    //Handler

    filterProperties();
    handleSlider();
    handleProgressBar();
    togglePasswordFields(); //Passwortfelder ein/ausblenden bei Gastuzugang
    handleLogout();
    validateStep2Submit();
    handleShippingCosts();
    handleDelete();//Löschen von Einträgen im Schritt 4
    validateDiscountCode();//Wird nicht mehr gebraucht
    handleAddress();//Adressänderung im Confirm-Prozess
    handleTabs();
    filterJournal(); //Filtern von Journaleinträgen im Partnerbereich
    handleAccordion(); //FAQ
    menu($("ul.menu li"));
    handleParentClick();
    styleButtons();


    // background
    if ($('#subnavi').length > 0) {
        var htmlSubnavi = $.trim($('#subnavi').html());
        if (htmlSubnavi.length > 0) {
            $('body').addClass('bg2');
            $('#breadcrumb').addClass('small');
            $('#toolbar_content').addClass('small');
        }
    }
});

/**
 * Oeffnet als extern deklarierte Links in einem neuen Fenster
 */
function jquery_links() {
    $(document).on("click", "a.extern, a.external, .external a, .extern a", function() {
        window.open($(this).attr("href"));
        return false;
    });
}

function fancybox() {
    $(".fancybox").fancybox({
        autoSize: true,
        keys: {
            close  : [27], // escape key
        }
    });
    //Eingesetzt im Zeichentool
    $('.fancybox_no_close').fancybox({
        closeBtn: false,
        closeClick: false,
        autoScale: true,
        afterLoad: function() {
            //Komisches Focus-Problem
            if ($('#question').length > 0)
            {
                $('#question').find('#length').focus();
            }
        },
        helpers: {
            overlay: {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
        }
    });
}



function handleTooltip()
{
    $('.tooltip.external').tooltip({
        content: $('#tooltip_content').html(),
//        hide: {duration: 400000 }
    });
    $('.tooltip.title').tooltip();
    $('.tooltip.id').tooltip({
        content: function() {
            //Materialliste
            var id = $(this).children('input').attr('id');
            //Sonst
            if (id === undefined)
            {
                id = $(this).attr('id');
            }
            var content = $('#tooltip_content_' + id).html();
            return content;
        },
//        hide: {duration: 400000 },
    });
}

function handleProgressBar()
{
    if($('#progress_bar').length > 0)
    {
        var active = $('#progress_bar li.active');
        var bar = $('#progress_bar');
        if(active.hasClass('first')){
            bar.css('background-image' ,' url("/images/dwt/step1.jpg")');
            bar.css('background-size', '100% 100%');
        }
        if(active.hasClass('second')){
            bar.css('background-image',' url("/images/dwt/step2.jpg")');
            bar.css('background-size', '100% 100%');
        }
        if(active.hasClass('third')){
            bar.css('background-image',' url("/images/dwt/step3.jpg")');
            bar.css('background-size', '100% 100%');
        }
        if(active.hasClass('fourth')){
            bar.css('background-image','url("/images/dwt/step4.jpg")');
            bar.css('background-size', '100% 100%');
        }
    }
}

function handleAccordion()
{
    if ($('.click.upload').length > 0 && $('div.content_upload').length > 0)
    {
        toggle($('.click.upload'), $('div.content_upload')); //Beim Upload das Aufklappdings aufklappen
    }
    if ($('.faq.headline').length > 0)
    {
        toggle($('.faq.headline')); //FAQ
    }
}
function handleDatepicker() {
    $('.datepicker').datepicker({
        prevText: '&#x3c;zurück', prevStatus: '',
        prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
        nextText: 'Vor&#x3e;', nextStatus: '',
        nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
        currentText: 'heute', currentStatus: '',
        todayText: 'heute', todayStatus: '',
        clearText: '-', clearStatus: '',
        closeText: 'schließen', closeStatus: '',
        monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
            'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        showMonthAfterYear: false,
        showOn: 'both',
        buttonImageOnly: true,
        dateFormat: "yy-mm-dd"
    });
}

function renderMenu() {
    // menu naviH
    $("ul.menu .level_2").each(function(index, element) {
        //        var col4 = $('<div class="col4"></div>');
        var col3 = $('<div class="col col3"></div>');
        var col2 = $('<div class="col col2"></div>');
        var col1 = $('<div class="col col1"></div>');

        var jthis = $(this);
        if (!jthis.is('.columns.three') && !jthis.is(':first-child')) {
            return;
        }

        // divs hinzufuegen
        jthis.prepend('<div class="level1_arrow"></div>');

        //                $(this).append(col4);

        // eltern element
        var parent = jthis.parent();

        // position
        var position = parent.position();
        var width = parseInt((parent.width() / 2) - 14.5);
        // pfeil setzen
        jthis.find('.level1_arrow').css('left', (position.left + width) + 'px');

        if (jthis.is(':first-child')) {
            return '';
        }

        // elemente einblenden um die hoehe auszulesen
        jthis.css('overflow', 'hidden');
        jthis.show();

        jthis.append(col1);
        jthis.append(col2);
        jthis.append(col3);

        var sum_col1 = 0;
        var sum_col2 = 0;
        var sum_col3 = 0;

        var cols = [col1, col2, col3];
        var current_col = 0;
        var current_sum = 0;
        // elemente verteilen
        jthis.find(' > li').each(function(index, ielem) {
            var jelem = $(ielem);
            var height_element = jelem.height();
            if (isset(typeof(cols[current_col])) && (current_sum + height_element) <= cols[current_col].height()) {
            } else {
                log(isset(typeof(cols[current_col])));
                if (isset(typeof(cols[current_col + 1]))) {
                    current_col += 1;
                    current_sum = 0;
                }
            }
            jelem.appendTo(cols[current_col]);
            current_sum += height_element;
            return true;
        });
        jthis.css('overflow', '');
        jthis.css('display', '');
    });
}


function handleSelection() {
    var container = $('#material_container');
    if (container.length <= 0) {
        return false;
    }

    var lis = container.find('ul.material_list > li:not(.handled)');

    if (lis.length <= 0) {
        return;
    }


    var form = $('form.material.selection');
    var form_filter = $('form.filter');
    if (form.length <= 0 || form_filter.length <= 0) {
        return false;
    }

    lis.addClass('handled');
    var delay = 250;
    var timer = null;
    var dblclick = false;

    lis.click(function(e, options) {
        var jthis = $(this);
        var ajaxHandle = container.data('ajaxHandle');
        var selectNext = false;

        if($.isPlainObject(options)) {
            if(options.next.length > 0) {
                selectNext = options.next;
            }
        }

        //Parent ist die Liste
        var parent = jthis.parent();

        //Jetzt den umgebenden Div ermitteln, aus dem wir die spalte herausbekommen.
        var div = parent.parent();

        var column = 1;
        var tc = div.attr('data-column');
        if (tc && parseInt(tc) > 0) {
            column = parseInt(tc);
        }

        var tech_id = parent.attr('id');

        var filter = new Array();
        $('div#property input:checked').each(function(index, element) {
            filter[index] = $(this).val();
        });

        lis.removeClass('checked');
        lis.find('input[type="radio"]').prop('checked', false);
        var radio = jthis.find('input[type="radio"]');
        radio.prop('checked', true);
        jthis.toggleClass('checked');
        var data = form.serializeArray();


        data.push({
            name: 'A',
            value: 'json'
        });
        data.push({
            name: 'column',
            value: column
        });
        data.push({
            name: 'checked',
            value: radio.val()
        });
        data.push({
            name: 'type',
            value: tech_id
        });
        data.push({
            name: 'filter',
            value: filter
        });
        container.children().each(function(index, element) {
            var $element = $(element);
            if ($element.attr('data-column') && parseInt($element.attr('data-column')) > column) {
                $element.remove();
            }
        });
        var nofloat = container.children('.nofloat');
        if (typeof(ajaxHandle) === 'object') {
            ajaxHandle.abort();
        } else {
            //Nichts tun, alles ok!
        }


        container.data('ajaxHandle', $.ajax({
            url: '/dwt/order/json',
            dataType: 'json',
            type: 'post',
            data: data,
            success: function(data) {

                var html = '';
                var detail = '';
                var description = '';
                if (data && data.detail) {
                    detail = data.detail;
                }
                if (data && data.list) {
                    html = data.list;
                }
                if (data && data.description)
                {
                    description = '<p>' + data.description + '</p>';
                }

                nofloat.before(html);
                $('#selection_details').empty().html(detail);
//                $('#tab-1').empty().html(description);

                var tmp = $('body > .temp.container');
                if (tmp.length <= 0) {
                    var tmp = $('<div class="temp container">');
                    tmp.appendTo();
                }

                tmp.empty().html(html).show('slow');

//                var tech_id = tmp.find(':first').attr('data-tech-id');
//                if (tech_id.length <= 0) {
//                    //mist keine ahnung was passieren soll
//                }
//                var list = container.children('.list.' + tech_id);

                //Ausblenden des Hintergrunds
                $('form.material.selection').css('background', 'none');


                if(selectNext) {
                    var next = selectNext.pop();
                    var objNext = {next: selectNext};
                    $('#'+next).trigger('click', objNext);

                }
                return true;
            }
        }));

        return false;
    });
    return true;
}

function filterProperties() {
    $('div#property input[type=checkbox]').change(function() {
        $('#material_container .list').remove();
        var filter = new Array();
        $('div#property input:checked').each(function(index, element) {
            filter[index] = $(this).val();
        });

        $.post(location.href, {
            A: 'json',
            filter: filter}, function(data) {
            var nofloat = $('#material_container .nofloat');
            if (nofloat.length > 0) {
                if (data && data.list) {
                    var html = '';
                    html = data.list;
                    nofloat.before(html);
                }
            }
        }, 'json');
    });
}

function validateStep1Submit() {
    if ($('li.checked.leaf').length === 0)
    {
        alert('Bitte treffen Sie eine Auswahl. ');
        return false;
    }
    return true;
}
//Wird auch bei Schritt 4 nochmal benutzt.
function validateStep2Submit() {
    $('input[name=weiteres_blech]').click(function() {
        var form = $('form.submit');
        form.attr('action', '/dwt/order/material');
        form.submit();
    });

}
function validateStep4Submit() {
    var working_titles = $('table.overview input.working.title');
    var discount = $('#coupon_code');
    var status = true;


    working_titles.each(function() {
        if ($(this).val() == "")
        {
            status = false;
            $(this).css('border', '1px solid red');
            $(this).addClass('tooltip title');
            $(this).attr('title', 'Bitte geben Sie einen Verwendungszweck ein. ');

        }
        else {
            $(this).css('border', '');
            $(this).removeClass('tooltip title');
            $(this).attr('title', '');

        }



    });
    //Prüfen ob das Rabatt-Code gültig ist
    if(discount.val() != '')
    {
        var data = {
            M: 'dwt',
            C: 'order',
            A: 'checkDiscount',
            code: discount.val(),
        };
        $.ajax({
            url: '/',
            dataType: 'json',
            type: 'post',
            data: data,
            success: function(data) {
                status = false;
                //Code ist ungültig
                if(!data)
                {
                    discount.css('border', '1px solid red');
                    discount.addClass('tooltip title');
                    discount.attr('title', 'Dieser Rabattcode ist leider ungültig. ');
                    status = false;
                }
                else {
                    discount.css('border', '');
                    discount.removeClass('rooltip title');
                    discount.attr('title', '');
                }

            }
        });
    }
    else {
        discount.css('border', '');
        discount.removeClass('rooltip title');
        discount.attr('title', '');
    }
    if (!status)
    {
        alert('Bitte geben sie in den rot markierten Felder gültige Daten ein. ');
    }

    if (status) {

        enableLoadingScreen();
    }

    return status;
}

function validateDiscountCode()
{
    $('input.discount.cash').click(function() {

        value = $('input.discount.code').val();
        netto = $('.netto.number span').text();
        tax = $('.tax.number span').text();
        total = $('.total.number span').text();
        order = $('input[name=order]').val();

        if (value.length > 0)
        {

            var data = {
                code: value,
                netto: netto,
                tax: tax,
                total: total,
                order: order,
            }
            $.ajax({
                url: '/dwt/confirm/discount',
                dataType: 'json',
                type: 'post',
                data: data,
                success: function(data) {
                    var percent = 100 * data.amount;
                    if (percent > 0 && percent <= 100)
                    {
                        //Gültiger Code
                        $('td.discount.result').empty();
                        $('td.discount.result').text(percent + ' % auf Materialkosten');
                        $('.number span').empty();
                        $('.netto.number span').text(data.netto);
                        $('.tax.number span').text(data.tax);
                        $('.total.number span').text(data.total);
                        if ($('.rabatt.number span').length > 0)
                        {
                            $('.rabatt.number span').text(data.rabatt);
                        }

                    }
                    else if (percent < 0) {
                        $('td.discount.result').empty();
                        $('input.discount.code').val('');
                        $('td.discount.result').text('Dieser Code wurde bereits verwendet.');
                    }
                    else
                    {
                        //Ungültiger Code
                        $('td.discount.result').empty();
                        $('input.discount.code').val('');
                        $('td.discount.result').text('Ungültiger Code');
                    }
                }

            });
        }
    });
}
function togglePasswordFields()
{

    $("input[name='register_type'][value='2']").click(function() {

        $('input[type=password]#password2').hide('slow');
        $('input[type=password]#password_confirm').hide('slow');
        $('label[for=password2]').hide('slow');
        $('label[for=password_confirm]').hide('slow');
    });
    $("input[name='register_type'][value='1']").click(function() {

        $('input[type=password]#password2').show('slow');
        $('input[type=password]#password_confirm').show('slow');
        $('label[for=password2]').show('slow');
        $('label[for=password_confirm]').show('slow');
    });



}

function handleLogout() {
    $('a#logout').on('click', function() {
        var status = confirm('Wollen Sie sich wirklich abmelden? ');
        if (status)
        {

            window.location.href = window.location.hostname + '/?logout=t';
        }



    });
}

/**
 * Löschen von Einträgen im Schritt overview
 * und bei der Bestätigung
 */
function handleDelete()
{
    var tbody = $('tbody tr');
    $('td div.delete.order').click(function() {
        var status = window.confirm('Wollen Sie den Artikel wirklich löschen?');
        if (status)
        {
            if (!$('td div.delete.order').hasClass('confirm'))
            {
                id = $(this).attr('id');
                var data = {
                    id_delete: id,
                };
                $.ajax({
                    url: '/dwt/order/deleteOrder',
                    dataType: 'json',
                    type: 'post',
                    data: data,
                    success: function(data) {
                        //Ist weg, neu laden
                        $(this).parent().remove();
                        window.location.reload(true);

                    }
                });
            }
            else if ($('td div.delete.order').hasClass('confirm')) {
                id = $(this).attr('id');
                 var data = {
                    id_delete: id,
                };
                $.ajax({
                    url: '/dwt/confirm/deleteCustomerProduct',
                    dataType: 'json',
                    type: 'post',
                    data: data,
                    success: function(data) {
                        //Ist weg, neu laden
                        $(this).parent().remove();
                        window.location.reload(true);

                    }
                });

            }
        }

    });
    if (tbody.length == 0) {
        $('input.send_request').hide();
    }
}
//Addressänderungen bei der Bestätigung
function handleAddress() {
    var changeForm = $('#address-form dl.forms');
    if (changeForm.length > 0) {
        $('.speichern').click(function() {
            $('dd.name').empty();
            $('dd.name').text($('#forename').val() + ' ' + $('#name').val());
            $('dd.telephone').empty();
            $('dd.telephone').text($('#telephone').val());
//            $('dd.shipping').empty();
//            $('dd.shipping').html($('#street').val() + '<br/> ' + $('#zip').val() + ' ' + $('input[name=city]').val() + '<br />' + $('#country').val());
            if ($('input#equal').prop('checked') == false)
            {
                //Adressen sind nicht gleich
                $('dd.billing').empty();
                $('dd.billing').html($('#street2').val() + '<br/> ' + $('#zip2').val() + ' ' + $('input[name=city2]').val() + '<br />' + $('#country2').val());
            }
            else if ($('input#equal').prop('checked') == true)
            {
                //Adressen sind gleich
                $('dd.billing').empty();
                $('dd.billing').html('an die Lieferadresse');
            }




            $.fancybox.close();
        });
        $('input#equal').click(function() {
            $('div.addr_billing').toggle();
        });
    }
}
//Anzeigen der Versandkosten bei Auswahl im Confirm-Prozess
function handleVersandkosten() {
    $('input[name=shipping]').change(function() {

    });
}

function validateStep8Submit() {
    if ($('#street').val().length < 3)
    {
        alert('Bitte geben Sie eine vollständige Anschrift an');
        return false;
    }
    enableLoadingScreen();
    return true;
}
/*
 * Listing 5.8 aus dem jQuery Buch.
 */
function handleTabs() {
    var tabs = $('.tabs');
    tabs.each(function(index, elem) {
        var $elem = $(elem);
        var pages = $elem.children('.tab');
        if (pages.length == 0)
        {
            return;
        }
        pages.addClass("dyn-tabs");
        pages.first().show();
        var tabNavigation = $('<ul class="tabs_menu" />').insertBefore(pages.first());
        pages.each(function() {
            var listElement = $("<li />");
            var label = $(this).attr("title") ? $(this).attr("title") : "Kein Label";
            listElement.text(label);
            tabNavigation.append(listElement);
        });
        var items = tabNavigation.find("li");
        items.first().addClass("current");
        items.click(function() {
            items.removeClass("current");
            $(this).addClass("current");
            pages.hide();
            pages.eq($(this).index()).fadeIn("slow");
        });
    });
}

function filterJournal()
{
    var $filter = $('.json.filter');
    if ($filter != undefined && $filter.length > 0) {
        var $freitext = $('input.sales.json.filter.freitext');
        if ($freitext.keyup(function(e) {
            if ($freitext.val().length > 3)
            {
                $freitext.trigger('change');
            }
            else if (e.keyCode == 8)
            {
                //Beim Löschen wird immer getriggert
                $freitext.trigger('change');
            }
        }))
            ;
        $filter.change(function() {

            //Journalansicht
            if ($('.json.filter.sales').length > 0) {

                var date_from = $('.json.filter.date_from').val();
                var date_to = $('.json.filter.date_to').val();
                var saleType = $('select.sale_type').val();
                var freitext = $freitext.val();

                var data = {
                    date_from: date_from,
                    date_to: date_to,
                    sale_type: saleType,
                    keywords: freitext,
                    html: true,
                }
                $.ajax({
                    url: '/dwt/partner/filterJournal',
                    dataType: 'html',
                    type: 'post',
                    data: data,
                    success: function(data) {
                        $('tbody.sales').empty();
                        $('tbody.sales').html(data);

                    }
                });
            }

            //Statistikansicht
            else if ($('.json.filter.stats').length > 0) {
                var year = $('select.year').val();
                $('#online_container').empty();
                $('#direct_container').empty();
                $('#online_container').css('background', '#ffffff url("/images/dwt/loading_small.gif") no-repeat center center');
                $('#direct_container').css('background', '#ffffff url("/images/dwt/loading_small.gif") no-repeat center center');
//                $('span.empty').empty();
                var data = {
                    year: year,
                    html: false,
                    random: random,
                }

                $.ajax({
                    url: '/dwt/partner/filterJournal',
                    dataType: 'json',
                    type: 'post',
                    data: data,
                    success: function(data) {
//
                        var dataDirect = [data.direct_month_last, data.direct_month];
                        var dataOnline = [data.online_month_last, data.online_month];

                        //Statistiken schreiben
                        updateStats(dataDirect, dataOnline);
                        $('#online_container').css('background', '#ffffff url("/images/dwt/loading_small.gif") no-repeat 0px 200px');
                        $('#direct_container').css('background', '#ffffff url("/images/dwt/loading_small.gif") no-repeat 0px 200px');

                        //Zahlen schreiben
                        $('span.year').html(year);
                        $('span.year_last').html(year - 1);

                        $('span.turnover_year_online').html(data.online_total.formatMoney(2));
                        $('span.turnover_year_direct').html(data.direct_total.formatMoney(2));
                        $('span.turnover_year_last_online').html(data.online_total_last.formatMoney(2));
                        $('span.turnover_year_last_direct').html(data.direct_total_last.formatMoney(2));
                        $('span.provision_year_online').html((data.online_total * prov_onl).formatMoney(2));
                        $('span.provision_year_direct').html((data.direct_total).formatMoney(2));
                        $('span.provision_year_last_online').html((data.online_total_last * prov_onl).formatMoney(2));
                        $('span.provision_year_last_direct').html((data.direct_total_last * prov_dir).formatMoney(2));
                    }
                });
            }
            //SuFu für offene Anfragen
            else if ($('.json.filter.opensales').length > 0)
            {
                var date_from = $('.json.filter.date_from').val();
                var date_to = $('.json.filter.date_to').val();
                var saleType = $('select.sale_type').val();
//                var freitext = $freitext.val();

                var data = {
                    date_from: date_from,
                    date_to: date_to,
                    sale_type: saleType,
//                    keywords: freitext,
                    html: true,
                }
                $.ajax({
                    url: '/dwt/partner/filterOpenSales',
                    dataType: 'html',
                    type: 'post',
                    data: data,
                    success: function(data) {
                        $('tbody.sales').empty();
                        $('tbody.sales').html(data);

                    }
                });
            }
        });
    }
}
//Gehört zum Accordion
function toggle(click, hide) {
    //Verstecken anhand der ID des Click Elements
    if (click.length > 0 && hide == undefined)
    {
        //Allen die Klasse Handled setzen
        $('.faq.content').addClass('handled');

        click.click(function() {

            var id = $(this).attr('id');
            var hide = $('#answer-' + id);
            hide.slideToggle('fast');
            if (!$(this).hasClass('open'))
            {
                $(this).addClass('open');
                $(this).children('span').removeClass('plus');
                $(this).children('span').addClass('minus');
            }
            else {
                $(this).removeClass('open');
                $(this).children('span').removeClass('minus');
                $(this).children('span').addClass('plus');

            }

        });
    }
    else if (hide.length > 0 && click.length > 0)
    {
        click.click(function() {
            hide.slideToggle('fast');
        });
    }

}
$(function() {
    var ret = handleSelection();
});

//Benötigen die Raphael.js Scripte (werden im Header geladen
function updateStats(dataDirect, dataOnline) {
    var custom_colors = ["#0aaba4", "#172983"];
    var paperOnline = Raphael('online_container', '100%', 140);
    var paperDirect = Raphael('direct_container', '100%', 140);


    //Hover-Effekte für die Werte
    fin = function() {
        if (this.bar.value > 0)
        {
            this.flag = paperOnline.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
        }
    }
    finDir = function() {
        if (this.bar.value > 0)
        {
            this.flag = paperDirect.popup(this.bar.x, this.bar.y, this.bar.value || "0").insertBefore(this);
        }
    }
    fout = function() {
        if (this.bar.value > 0) {
            this.flag.animate({opacity: 0}, 10, function() {
                this.remove();
            });
        }
    }
    if (dataDirect.length > 0)
    {
        var chartDirect = paperDirect.barchart(0, 0, 240, 140, dataDirect, {colors: custom_colors}).hover(finDir, fout);
        chartDirect.customLabel = customLabel;
        chartDirect.customLabel(months, paperDirect);
    }
    if (dataOnline.length > 0)
    {
        var chartOnline = paperOnline.barchart(0, 0, 240, 140, dataOnline, {colors: custom_colors}).hover(fin, fout);
        chartOnline.customLabel = customLabel;
        chartOnline.customLabel(months, paperOnline);
    }
}
//Erweiterung, damit man Labels anzeigen kann
function customLabel(labels, container) {
    labels = labels || [];
    this.labels = container.set();
    var i = 0;
    for (var j = 0; j < this.bars[0].length; j++) {
        var totX = 0;
        for (i = 0; i < this.bars.length; i++) {
            totX += this.bars[i][j].x;
            y = this.bars[0][j].y + this.bars[0][j].h + 10;
        }
        x = totX / this.bars.length;
        container.text(x, y, labels[j]).attr("font", "10px Arial");
    }
    return this;
}
//zeigt den Ladebildschirm
function enableLoadingScreen() {
    $('body .loading_screen').css('background-color', 'black');
    $('body .loading_screen').css('z-index', '1000');
    $('body .loading_screen').css('background-position', 'center center');
}
function menu(obj) {
    if (!obj.length)
        return;
    $("div.page.menu").removeClass("use_hover");
    $(obj).hover(function() {
        $(this).find('ul').slideDown(300);
    }, function() {
        $(this).find('ul').slideUp(300);
    });
}

/**
* Geld formatieren

 * @param {type} c
 * @param {type} d
 * @param {type} t
 * @returns {String|@exp;@exp;i@call;substrt|@exp;i@pro;substr@pro;r@call;eplace@exp;@@call;exp;i@call;substrt|@exp;@exp;Math@pro;abs@pro;t@call;oFixed@pro;s@call;lice@exp;@@call;exp;i@pro;substr@pro;r@call;eplace@exp;@@call;exp;i@call;substrt|@exp;i@call;substr|@exp;@exp;i@pro;substr@pro;r@call;eplace@exp;@@call;exp;i@call;substrt|@exp;Math@pro;abs@pro;t@call;oFixed@pro;s@call;lice@exp;@@call;exp;i@pro;substr@pro;r@call;eplace@exp;@@call;exp;i@call;substrt} */
Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "," : d,
    t = t == undefined ? "." : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

/**
 * Sucht alle Container mit den Klassen use slideshow.
 * Die Funktion kann mehrfach aufgerufen werden, ohne dass sie
 * doppelt angewandt wird.
 * Es können am overlay div mehrere Steuerelemente vorhanden sein:
 *	autoplay: Slideshow startet automatisch.
 *	autopause: Slideshow hält automatisch an wenn die Maus sich darüber bewegt.
 *	circular: Slideshow kann unendlich in beide Richtungen  gescrollt werden.
 * @returns {Boolean}
 */
function handleSlider() {
    var overlay_slider = $('.use.slideshow .overlay:not(.handled)');
//return false;
    if (overlay_slider.length <= 0) {
        return false;
    }
    overlay_slider.each(function(index_elem, element) {
        var autoplay = true;
        var autopause = false;
        var circular = false;
        var hide_arrows = true;
        var scollItemsInViewport = 1;
        var overlay = $(element);

        var speed = 700;
        var interval = 5000;

        overlay.addClass('handled');
        if (overlay.hasClass('autoplay')) {
            autoplay = true;
        }

        if (overlay.hasClass('autopause')) {
            autopause = true;
        }

        if (overlay.hasClass('circular')) {
            circular = true;
            hide_arrows = false;
        }

        overlay.find('.nofloat').remove();

        var scrollItems = overlay.find('.scrollItem');
        var scollItemsInViewport = 0;
        if (scrollItems.width() > 0) {
            scollItemsInViewport = parseInt(overlay.width() / scrollItems.width());
        }
        if (scrollItems.length <= scollItemsInViewport) {
            return false;
        }
        var scrollItems_length = scrollItems.length;
        var scrollable_api = false;
        overlay.scrollable({
            circular: circular,
            speed: speed,
            size: 1,
            items: overlay.find('.overview'),
            itemsPerFrame: scollItemsInViewport,
            prev: '.prevv',
            next: '.nextt',
            onSeek: function() {
                var scrollable_api = overlay.scrollable();
                var index = scrollable_api.getIndex();
            }
        }).autoscroll({
            autoplay: autoplay,
            autopause: autopause,
            interval: interval
        });

//		var scrollable_api = overlay.scrollable();
        if (overlay.is('.use.arrows')) {
            var $next = $('<a>');
            var $prev = $('<a>');
            $next.addClass('next-' + index_elem);
            $prev.addClass('prev-' + index_elem);
            overlay.parent().css('position', 'relative');

            var click = function() {
                var $this = $(this);
                var scrollable_api = overlay.data('scrollable');
                var size = scrollable_api.getSize();
                var index = scrollable_api.getIndex();
                var items = scrollItems_length;

                if ($this.is('.next')) {
                    scrollable_api.next();
                    if (hide_arrows) {
                        if ((index + items) > size) {
                            $next.hide();
                            $prev.show();
                        } else {
                            $prev.show();
                            $next.show();
                        }
                    }
                } else if ($this.is('.prev')) {
                    scrollable_api.prev();
                    if (hide_arrows) {
                        if (index - 1 <= 0) {
                            $prev.hide();
                            $next.show();
                        } else {
                            $prev.show();
                            $next.show();
                        }
                    }
                }
                return false;
            }

            $next.addClass('arrow')
                    .appendTo(overlay.parent())
                    .addClass('next')
                    .click(click);
            $prev.addClass('arrow')
                    .appendTo(overlay.parent())
                    .addClass('prev')
                    .click(click);
            if (hide_arrows) {
                $prev.hide();
            }
        }
    });
}

function roundToFive($pAmount, $pCurrency) {
    if ($pCurrency === null) {
        $pCurrency = "chf";
    }
    console.log($pCurrency);
    console.log($pCurrency.toLowerCase());
    if ($pCurrency.toLowerCase() === "chf") {
        return (Math.round(($pAmount * 20), 0) / 20).toFixed(2);
    } else {
        return ($pAmount).toFixed(2);
    }
}

/**
 * Berechnet alles neu, sobald man eine Versandart wählt
 */
function handleShippingCosts()
{
    var $shipping = $('input.shipping_method');

    $shipping.change(function()
    {
        // Erstmal die ganzen werte holen
        // Das sind die Werte der vorher ausgewählten Shipping-Method
        var currency = $('.currency').html();
        var $tax = $('dd.tax.number span');
        var $summe = $('dd.total.number span');
        var $rabatt = $('dd.rabatt span.number');
        var $netto = $('dd.netto span.number');
        var $shippingCosts = $('dd.shipping.number span');//Zielelement für die Versandkosten-Zahl
        
        // Aktuell ausgewählte Shipping-Costs
        var costs = $(this).parent().find('span.costs.info span.number').text();
        
        
        var newShippingCosts = costs * 1; //*1, damit es eine Zahl ist
        if (newShippingCosts > 0)
        {
            //Versandkosten
            $shippingCosts.empty().html(roundToFive(newShippingCosts,currency));
            $('dd.shipping.number').show();

            if ($('input:radio:checked[name=shipping]').val() == 5)
            {
                $('dt.shipping').html('Versandkosten');
            }
            else
            {
                $('dt.shipping').html('Versandkosten');
            }
            $('dt.shipping').show();
        }
        //Selbstabholung
        else if(newShippingCosts == 0)
        {
            $shippingCosts.empty().html(roundToFive(newShippingCosts,currency));
            $('dt.shipping').html('Selbstabholung');
//            $('dd.shipping.number').hide();
//            $('dt.shipping').hide();
        }
        else
        {
            $('dd.shipping.number').hide();
            $('dt.shipping').hide();

        }
        //Steuer
        var rabatt = 0;
        if ($rabatt.html() !== undefined)
        {
            rabatt = $rabatt.html();
//            rabatt = roundToFive(rabatt,currency);
        }
        
        // korrekte tax holen, nix hardcode
        var taxVat = $('.taxvat-info').html() / 100;
        
//        console.log("taxVat");
//        console.log(taxVat);
        
        var tax = ($netto.html() - rabatt + newShippingCosts) * taxVat;
        tax = tax;
        
        
        $tax.html(roundToFive(tax,currency));
        //Endbetrag
        var summe = ($netto.html() - rabatt + newShippingCosts) + tax;
        
        $summe.html(roundToFive(summe,currency));




    });
}
//Startseite, Klick auf das Video
function handleParentClick()
{
    $('.cm_elem.startseite.cm_video').click(function(e) {
        if (!e.isTrigger)
        {
            var $link = $(this).find('a.fancybox');
            $link.trigger('click');
        }
    });
}
//Starten der Schnellwahl - Rest macht handleSelection;
function handleQuickSelect()
{
    var quickselect = $('#quickselect_content .quickselect');

    quickselect.click(function(){
        var jthis = $(this);

        var ids = jthis.find('*[data-quickselect]').attr('data-quickselect');
        var ids_obj = $.parseJSON(ids);
        ids_obj.reverse();

        if(ids_obj.length > 0)
        {
            var first = ids_obj.pop();
            var obj = {next: ids_obj};
            $('#'+first).trigger('click', obj);
        }
    });
}
function styleButtons()
{
    $('input[type=submit]:not(.back, .zip), input[type=button]:not(.back)').each(function(k, input){
        var value = $(this).val();
        $(this).attr('value', value+' >');
    });
    $('input[type=submit].back, input[type=button].back').each(function(k, input){
        var value = $(this).val();
        $(this).attr('value', '< '+value);
    });
}