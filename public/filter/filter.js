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
    // document.body.style.backgroundColor = "rgba(0,0,0,0.7)";
    document.getElementById("pagecontent").style.filter = "brightness(100%)";
    // document.body.style.filter "brightness(30%)";

}
/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
    document.getElementById("pagecontent").style.filter = "brightness(100%)";
}
