function changeImg(ele) {
    $("#gCarTop").attr("src", $(ele).find("img.gCarImg").attr("src").toString());
}
$(document).ready(function () {
    $("#gCarVMWrapper").hide();
    $(".gCarImgBarItem").mouseenter(function() {
        if(!$(this).hasClass("viewMore")){
            changeImg($(this));
        }
    });
    $(".gCarImgBarItem").click(function() {
        if(!$(this).hasClass("viewMore")){
            changeImg($(this));
        }
    });
    $(".viewMore").click(function(e){
        e.preventDefault();
        $("#gCarVMWrapper").fadeIn();
    });
    $(".closeIcon").click(function() {
        $("#gCarVMWrapper").fadeOut();
    });
});