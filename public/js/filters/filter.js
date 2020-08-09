$(document).ready(function() {
    // to close nav on load on devices with smaller width
    if(screen.width < 1200){
        closeNav();
    }
    //for reset in filter page
    $('.clear-all').click(function() {

        $('input[type=checkbox]').each(function() {
            this.checked = false;
        });
        $('#fil-ser').val('');
    });
});


// //co-workring increment dcrement
// function button_inc() {
//     document.getElementById("put").stepUp(1);
// }
//
// function button_dec() {
//     document.getElementById("put").stepDown(1);
// }

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "20rem";
    document.body.style.backgroundColor = "rgba(0,0,0,0.0)";
    document.getElementById("pagecontent").style.filter = "brightness(100%)";
    // document.body.style.filter "brightness(30%)";

}
/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
    document.getElementById("pagecontent").style.filter = "brightness(100%)";
}



// $(document).ready(function(){
//     $(window).on('load' , function(){
//         $('.multiTags').remove();
//         $('.lineBelow').remove();
//     })
// })

// Redirecting Badges
$(document).ready(function(){
$(".badge").on("click" , function(event){
    event.preventDefault();
    window.location.href="/filter3";
})
})

// on clicking x removing the multipurpose tag
// var spanOptions = document.querySelectorAll("span").length;
// $(document).ready(function(){
//     $("span").on("click" , function(){
//        for(var i=0 ; i<spanOptions ; i++){
//            for(var j =0 ; j<spanOptions ; j++){
//                if(document.querySelectorAll("span")[i] === document.querySelectorAll(".tagBtn")[j]){
//                    $(".tagBtn")[j].remove();
//                }
//            }
//        }
//    })   
// })

