var serviceInfo;
onSubmitForm = function() {
    var canSubmit = true;
    var dataToSub = {};
    console.log('...');

    $('#c-form').find('input, textarea').each(function() {
        var info = [$(this).attr('name'), $(this).val()];
        console.log(info);
        var validate = inputVal(info[0], info[1]);
        console.log(validate);
        dataToSub[info[0]] = info[1];
        if (!validate) {
            canSubmit = false;
        }
        // console.log(info);
    });

    console.log(canSubmit + " : " + JSON.stringify(dataToSub));
    // return false;
    if (canSubmit) sendContactForm(dataToSub, 'contact_form.php');
}
inputVal = function(type, inpt) {
    switch (type) {
        case 'email':
            return (inpt.indexOf('@') > -1 && inpt.lastIndexOf('.') > inpt.indexOf('@')) ? true : false;
            break;
        case 'first_name':
        case 'last_name':
            return (inpt.length > 0);
            break;
        case 'message':
            return true;
            break;
        case 'phone':
            return (inpt.length >= 10)
            break;
    }
}
sendContactForm = function(fInfo, url, cb) {
    sendingForm = setTimeout(function() {
        canSendForm = true;
    }, 10000);
    $.ajax({
        type: 'post',
        url: url,
        data: fInfo,
        encode: true,
        success: function(result) {
            $('#contact').find('input, textarea').val('');
            canSendForm = true;
        }
    });
};
getServiceData = function() {
    $.getJSON("js/data.json", function(json) {
        serviceInfo =  json.services;
    });
}
$('.fadein').each(function(i) {

});

$(document).on('click', '#close', function() {
    $('.service-content-right.selected, #services').removeClass('selected');
    $('#service-info, #services .overlay').removeClass('expanded');
    var p = $('#services').position().top;
    $("html, body").animate({
        scrollTop: p
    }, 1000);
    document.getElementById('services-vid').stop();

});
$(document).on('click', '.service-content-right', function(ev) {
    console.log('click');
    ev.preventDefault();
    var p = $('#service-info').position().top;
    var num = parseInt($(this).attr('service-num'));
    var d = serviceInfo[num];
    console.log(d);
    $('#service-text').html(d.txt);
    $('#service-img').html(d.img);
    $('.service-content-right.selected').removeClass('selected');
    $('#si-fill').html($(this).find('.service-head').html().split('<br>')[0]);
    $(this).addClass("selected");
    if ($('#service-info').hasClass('expanded')) {
        $("html, body").animate({
            scrollTop: p
        }, 1000);
        return;
    }

    var pos = $(this).position();
    $('#services .overlay').css('top', pos.top + 75).css('left', pos.left + 125);
    $('#services').addClass("selected");
    $('#service-info').addClass("expanded");
    setTimeout(function() {
        $('#services .overlay').addClass('expanded');
    }, 500);

    setTimeout(
        function() {

            // $('.video-wrapper.overlay').addClass("hide");
            $("html, body").animate({
                scrollTop: p
            }, 1000);
        }, 200);


});
$(document).on('click', '.left-arrow', function() {
    $('#inner-img-slider').addClass('left');
});
$(document).on('click', '.port-sort-btn', function() {
    var s = $(this).attr('sort-sel');

    var allSel = ($('.port-sort-btn.selected').length == 4) ? true : false;
    console.log(allSel);
    if (allSel) {
        $('.port-box-wrap').not('.port-box-wrap[sort=' + s + ']').addClass("remove");
        $('.port-sort-btn').not('.port-sort-btn[sort-sel=' + s + ']').removeClass("selected");

        return false;
    }

    if ($(this).hasClass('selected')) {
        $('.port-box-wrap[sort=' + s + ']').addClass("remove");
        $(this).toggleClass("selected");
        return;
    } else {
        // var s = $(this).attr('sort-sel');
        $('.port-box-wrap[sort=' + s + ']').removeClass("remove");
        $(this).toggleClass("selected");
        return;
    }
    $(this).toggleClass("selected");
    var s = $(this).attr('sort-sel');
    console.log(s);
    $('.port-box-wrap').not('.port-box-wrap[sort=' + s + ']').addClass('remove');
    setTimeout(function() {
        $('.port-box-wrap.remove').hide();
    }, 1000);
});
$(document).on('click', '.port-box a', function() {
    console.log('fdsf');
    var i = $(this).attr('site-img');
    var l = $(this).attr('site-link');
    setTimeout(function() {
        $('#site-img').html("<img style='border:1px solid rgba(0,0,0,0.2);border-radius: 3px;' src='" + i + "'>");
        $('#site-link').attr('href', l);

    }, 100);
    if (l == 'false') {
        setTimeout(function() {
            $('#site-img').fadeIn('slow');
        }, 700);
    } else {
        setTimeout(function() {
            $('#site-img,#site-link').fadeIn('slow');
        }, 700);
    }
    // $("#port-popup").addClass('show');
    // $('#port-highlight').addClass("expanded");
    // $('.port-box-wrap').addClass('remove');

});

$(document).on('click', '.video-wrapper', function() {
    
    $(".video-wrapper .overlay").addClass("hide");
    document.getElementById('services-vid').play();
});
$(document).ready(function() {
    webApp = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ? false : true;
    $('#header-animate').addClass('show');
    $('.an-icon').addClass('red');
    // setTimeout(function(){$('.an-icon.i1').removeClass('red');},2000);
    // setTimeout(function(){$('.an-icon.i2').removeClass('red');},3000);
    // setTimeout(function(){$('.an-icon.i3').removeClass('red');},4000);
    setTimeout(function(){$('.an-icon').removeClass('red');},10000);
    if (!webApp) $('#vid-wrap').hide();
    $(document).on('scroll', function() {
        var pos = window.pageYOffset;
        var ser = $('#services').position().top - 100;
        console.log('pos: '+ pos);
        console.log('ser: '+ser);
        if (pos >= ser) {
            $('.ic-wrap').addClass('show');
        }else if ( pos < (ser+100) && $('#service-info').hasClass('expanded')){
        	// $('#close').click();
        	$('.service-content-right.selected, #services').removeClass('selected');
    	$('#service-info, #services .overlay').removeClass('expanded');
        }

    });
    getServiceData();
});