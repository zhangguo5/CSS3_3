$(function() {

    function setHeight() {
        var screenHeight = window.innerHeight;
        var contentHeight = $(".content_on").height();
        if (contentHeight < (screenHeight - 49 - 160)) {
            $(".content_on").css("minHeight", (screenHeight - 49 - 160) + "px");;
        };
    }
/*    $(window).on('mousewheel', function(event, delta) {
        console.log(delta, $(window).scrollTop())
        if (delta > 0 && $(window).scrollTop() == 0) {
            $("#top").show();
        } else {
            $("#top").hide();
        }
    });
*/
    setHeight();
})
