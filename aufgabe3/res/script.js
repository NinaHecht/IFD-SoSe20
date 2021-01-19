$("#menu-toggle").on("click", function() {
    $("#menu-sub-nav").slideToggle();
    $("#menu-toggle").toggleClass('menu-open');
});
$(document).ready(function() {
    $("#tabs").tabs();
});
$(".accordion").on("click", function(){
    $(this).toggleClass("open");
    let id = $(this).attr("id");
    $("#" + id + "-content").slideToggle();
});
$(".fake-link").on("click", function(event){
    event.preventDefault();
});
$("#search-link").on("click", function(event){
    event.preventDefault();
    $("#search-input").addClass("open");
});

$(".modal-trigger").on("click", function() {
    $(".accordion.open ~ .accordion-content").slideUp(1);
    $(".accordion.open").removeClass("open");
    if(!$("body").hasClass("modal-open")) {
        let id = $(this).attr("id");
        $("#" + id + "-modal").slideDown().addClass("open");
        $("body").addClass("modal-open");
    }
});
$(".modal-close").on("click", function() {
    if($("body").hasClass("modal-open")) {
        $(".modal.open").slideUp();
        $("body").removeClass("modal-open");
    }
});
