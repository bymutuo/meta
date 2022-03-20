var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid var(--black)}";
    document.body.appendChild(css);
};

/* PASS VISIBLE WINDOW HEIGHT TO CSS */
$(window).on('resize',function(){
    $(document).ready(function(){
        $(':root').get(0).style.setProperty('--visibleHeight', document.documentElement.clientHeight + 'px');
    });
}).trigger('resize');

$(function() {
    $('.card .cardContent').each(function(){
        $(this).css('margin-top', $(this).parent().height() - $(this).height() - $(this).siblings().height() + 'px');
    });
});

/* JUMPY TEXT */
$('.bouceAnim').each(function(){
    const $header = $(this);
    const text = $header.text().split("");
    $header.html(""); // epmty it
    $.each(text, (i,v) => {
        if( v == " " ) v = '\xa0';
        $header.append($("<span>").text(v));
    })
    $(this).parent().on('touchend', () => {
        $(this).toggleClass('touched');
    })
});

/* BRACKET TYPE TOOLTIPS */
$('.details').html(function(i, h) {
    return h.replace(/(\[.+\])/g, '<span class="entity" title="entity">$1</span>').replace(/(\{.+\})/g, '<span class="kind" title="kind">$1</span>').replace(/(\(.+\))/g, '<span class="year" title="year">$1</span>').replace(/(\〈.+\〉)/g, '<span class="lang" title="language">$1</span>');
});

/* BIO PHOTO HEIGHT SAME AS PARAGRAPH */
$(window).on('resize',function(){
    $('.bioImg').css('height', parseInt($('.bioTextWrapper').css('height')) - $('.bioTextWrapper h2').outerHeight(true) + "px" );
    
    $('.tourImg').css('height', parseInt($('.tour .topBlock > *:first-child').css('height')) - $('.tour .concerts h2').outerHeight(true) * 4 + "px" );
}).trigger('resize');

/* FOOTER LINE BREAKS */

var timeout;
$(window).on("load resize", function(){
    
    if(timeout){
        window.clearTimeout(timeout);
    }
    
    timeout = setTimeout(function(){
        
        $('.footerItem').removeClass('first last').each(function(){
            if($(this).next().length && $(this).offset().top < $(this).next().offset().top){
                $(this).addClass('last');
            }
            
            if ($(this).prev().length && $(this).offset().top > $(this).prev().offset().top){
                $(this).addClass('first');
            }
        });
    }, 100);
});

/* Console Tag */
console.log("M" + '\n' + "Ů T U — was here" + '\n' + "O");