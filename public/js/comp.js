
// ion-rangeslider

let Timwfrom;
let Timeto;

$(document).ready(function () {
    let rangeSlider = $(".js-range-slider");
    let rangeSlider2 = $(".js-range-slider2");

    rangeSlider.ionRangeSlider({
        skin: "big",
        type: "double",
        min: 8,
        max: 20,
        from: 14,
        to: 16,
        drag_interval: true,
        min_interval: null,
        max_interval: null,
        postfix: ':00'
    });
    let slider = rangeSlider.data("ionRangeSlider");
    $("#filterApplied").click(function (e) {
        e.preventDefault();
        Timefrom = slider.result.from
        Timeto = slider.result.to
    });
    rangeSlider2.ionRangeSlider({
        skin: "big",
        min: 0,
        max: 5,
        from: 2
    });
});

//calendar
$(document).ready(function(){
    console.log(moment().add(1,'day').format('ddd'));
    const today = moment().format("ddd")
    $('.calenderDay').each(function(){
        $(this).find(".calenderDayOfWeeek").text(moment().add($(this).index(), 'day').format("ddd"));
        $(this).find(".calenderDate").text(moment().add($(this).index(), 'day').format("Do"));
    });
    $(".calenderDay").click(function(){
        $(".calenderDisplay").hide();
        $(".calenderDisplay").eq($(this).index()).show();
    });
});



  //calender button clicking - color changing
$(document).ready(function(){
    $(".calenderDay").click(function(){
        $(".calenderDay").each(function(){
            $(this).removeClass("calenderColor");
        });
        $(this).addClass("calenderColor");
        // setTimeout(() => {
        //     $(this).removeClass("btnClicked")
        // },5000);
    });
});  
