function initMap(){for(var t={zoom:8,center:{lat:12.894643,lng:77.597362},mapTypeId:google.maps.MapTypeId.ROADMAP},e=new google.maps.Map(document.getElementById("map"),t),n=[{coords:{lat:12.894643,lng:77.597362},content:'<h3>SnapFitness</h3><a class="direction-link" target="_blank" href="http://maps.google.com/maps?f=d&amp;daddr=12.894643,77.597362&amp;hl=en"> Get Direction</a>'}],o=0;o<n.length;o++)l(n[o]);function l(t){var n=new google.maps.Marker({position:t.coords,map:e});if(t.iconImage&&n.setIcon(t.iconImage),t.content){var o=new google.maps.InfoWindow({content:t.content});n.addListener("click",function(){o.open(e,n)})}}}let totalAmount;function validate(){totalAmount=0,$.each($("input[class='chk']:checked"),function(){totalAmount+=parseInt($(this).val())}),console.log(typeof totalAmount),$(".chk:checked").length>=1?(console.log(totalAmount),$("#totalPrice").html("").html(totalAmount),document.getElementById("book-form").removeAttribute("disabled")):(totalAmount=0,$("#totalPrice").html("").html(totalAmount),document.getElementById("book-form").setAttribute("disabled","disabled"))}$(function(){$(".checkin").datepicker({showAnim:"slideDown",dateFormat:"yy-mm-dd",duration:"medium",numberOfMonths:1,minDate:0}).on("change",function(){!function(t){let e;try{e=t.value}catch(t){e=null}let n=$("#publicID").val(),o={date:e,id:n};$.ajax({type:"POST",url:"/slots",data:JSON.stringify(o),contentType:"application/json; charset=utf-8",dataType:"json",success:function(t){if(null===t.slotArray){document.getElementById("slots").style.display="none",document.getElementById("map-form").style.height="23rem"}else{document.getElementById("slots").style.display="block",document.getElementById("map-form").style.height="28rem";let e=document.getElementById("result-template").innerHTML,n=Handlebars.compile(e),o=n(t);$("#slots").html(o)}}})}(this)})}),$("#the-textarea").keyup(function(){$("#current").text($(this).val().length)});

//buttons redirecting to particular slide in carosuel
$(document).ready(function () {
    $(".dance").on("click" , function(){
        window.location.href="#dance";
    }) ;
    $(".fitness").on("click" , function(){
        window.location.href="#fitness";
    });
    $(".trainingRoom").on("click" , function(){
        window.location.href="#trainingRoom";
    });
    $(".co-working").on("click" , function(){
        window.location.href="#co-working";
    });
    $(".co-living").on("click" , function(){
        window.location.href="#co-living";
    });
    
})      

//button clicking - color changing
$(document).ready(function(){
    $(".btr").click(function(){
        $(".btr").each(function(){
            $(this).removeClass("btnClicked");
        });
        $(this).addClass("btnClicked");
        // setTimeout(() => {
        //     $(this).removeClass("btnClicked")
        // },5000);
    });
});


//time slot highlighted
$(document).ready(function(){
    console.log(moment().day());
    const today = moment().day();
    if(today > 0){
        console.log($(".timeSlot")[moment().day() - 1]);
        
        const todayElement = $(".timeSlot")[moment().day() -1];
        $(todayElement).addClass("slot");
    } else {
        $(".timeSlot")[6].addClass("slot");
    }
   
})