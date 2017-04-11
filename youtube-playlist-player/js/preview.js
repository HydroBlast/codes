$(document).ready(function() {
    $("ul.navbar-nav li a").click(function(e) {
        var a = $(this).attr("href");
        var b = a.match(/^#([^\/]+)$/i);
        var c = -72;
        if (b) {
            $.scrollTo($(a), 700, {
                offset: c
            })
        } else {
            window.location = a
        }
        e.preventDefault()
    });
    $("ul.navbar-nav li").click(function() {
        $('ul.navbar-nav li').removeClass("active");
        $(this).addClass("active")
    });
    var d;
    var f = $("ul.navbar-nav");
    var g = f.outerHeight() + 500;
    var h = f.find("a");
    scroll_items = h.map(function() {
        var a = $(this).attr("href");
        var b = a.match(/^#([^\/]+)$/i);
        if (b) {
            var c = $($(this).attr("href"));
            if (c.length) return c
        }
    });
    $(window).scroll(function() {
        var a = $(this).scrollTop() + g;
        var b = scroll_items.map(function() {
            if ($(this).offset().top < a) return this
        });
        b = b[b.length - 1];
        var c = b && b.length ? b[0].id : "";
        if (d !== c) {
            d = c;
            h.parent().removeClass("active").end().filter('[href=\\#' + c + ']').parent().addClass("active")
        }
    });
    if (window.location.hash) {
        var i = window.location.hash;
        window.location.hash = "";
        $(window).load(function() {
            setTimeout(function() {
                window.location.hash = i
            }, 300)
        })
    }
});