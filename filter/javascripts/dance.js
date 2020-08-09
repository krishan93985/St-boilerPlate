let Pricefrom;
let Priceto;

$(document).ready(function () {
    let rangeSlider = $(".js-range-slider");
    let rangeSlider2 = $(".js-range-slider2");

    rangeSlider.ionRangeSlider({
        skin: "big",
        type: "double",
        min: 0,
        max: 7000,
        from: 2000,
        to: 4000,
        drag_interval: true,
        min_interval: null,
        max_interval: null,
        prefix: '₹ '
    });
    let slider = rangeSlider.data("ionRangeSlider");
    $("#filterApplied").click(function (e) {
        e.preventDefault();
        Pricefrom = slider.result.from
        Priceto = slider.result.to
    });
    rangeSlider2.ionRangeSlider({
        skin: "big",
        min: 0,
        max: 5,
        from: 2
    });
});

$(document).ready(function () {
    $('#filterApplied').click(function () {

        let danceType = [];
        $.each($("input[name='option1']:checked"), function () {
            danceType.push($(this).val());
        });
        let danceFeatures = [];
        $.each($("input[name='option2']:checked"), function () {
            danceFeatures.push($(this).val());
        });

        // console.log(fitnessOptions.join(", ") + " " + dances + "from" + rooms + "to" + to);
        let filterData = {
            dances: danceType,
            danceFeatures: danceFeatures,
            priceFrom: Pricefrom,
            priceTo: Priceto,
        }

        let city = $('#city').val();
        $("#initialRes").animate({'opacity': '0.0'}, 1000, function(){
            $.ajax({
                type: 'POST',
                url: "/filter/"+city+"/dance",
                data: JSON.stringify(filterData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if(data.searchResults.length === 0){
                        $("#initialRes").css('display', 'none');
                        $("#filterRes").html(
                            `<div class="container" style="text-align: center">
                <img src="../../images/filter/noresult.png" width="500px" height="500px">
            </div>`
                        ).fadeIn('fast', function(){
                            // $("filterRes").css('display', 'flex');
                        });

                    }else{
                        console.log(data);
                        $("#initialRes").css('display', 'none');
                        let source = document.getElementById('result-template').innerHTML;
                        let template = Handlebars.compile(source);
                        let html = template(data);

                        $("#filterRes").fadeIn('fast', function(){
                            $("#filterRes").html(html);
                        });
                        // $("#filterRes").css('display', 'block').html(html).animate({'opacity': '1.0'}, 1000);
                    }
                }
            });
        });
    });
});
