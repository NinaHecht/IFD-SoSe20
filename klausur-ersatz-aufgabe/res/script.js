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

$(".accordion").on("keydown", function(event) {
    if(event.keyCode === $.ui.keyCode.ENTER){
        $(event.target).toggleClass("open");
        let id = $(event.target).attr("id");
        $("#" + id + "-content").slideToggle();
    }
})

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
    let id = $(this).attr("id");
    if(!$("body").hasClass("modal-open")) {
        $("#" + id + "-modal").slideDown().addClass("open");
        $("body").addClass("modal-open");
    }else{
        $("#" + id + "-modal").slideUp().removeClass("open");
        $("body").removeClass("modal-open");
    }
});

$(".modal-trigger").on("keydown", function(event) {
    if(event.keyCode === $.ui.keyCode.ENTER){
        $(".accordion.open ~ .accordion-content").slideUp(1);
        $(".accordion.open").removeClass("open");
        let id = $(event.target).attr("id");
        if(!$("body").hasClass("modal-open")) {
            $("#" + id + "-modal").slideDown().addClass("open");
            $("body").addClass("modal-open");
        }else{
            $("#" + id + "-modal").slideUp().removeClass("open");
            $("body").removeClass("modal-open");
        }
    }
});

$(".modal-close").on("click", function() {
    if($("body").hasClass("modal-open")) {
        $(".modal.open").slideUp();
        $("body").removeClass("modal-open");
    }
});

