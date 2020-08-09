// $(document).ready(function () {
//     $.ajax("/users/map/data", {
//         dataType: "json",
//         success: function (t, r, a) {
//             return (
//                 (function (t) {
//                     (avg = ((1 * t.oneStar + 2 * t.twoStar + 3 * t.threeStar + 4 * t.fourStar + 5 * t.fiveStar) / t.total).toFixed(1)),
//                         $(".avgRating").each(function () {
//                             $(this).text(avg);
//                         });
//                     let r = ((t.oneStar / t.total) * 100).toFixed(0);
//                     $("#star1Bar").width(r.toString() + "%"), $("#star1").text(t.oneStar.toString());
//                     let a = ((t.twoStar / t.total) * 100).toFixed(0);
//                     $("#star2Bar").width(a.toString() + "%"), $("#star2").text(t.twoStar.toString());
//                     let o = ((t.threeStar / t.total) * 100).toFixed(0);
//                     $("#star3Bar").width(o.toString() + "%"), $("#star3").text(t.threeStar.toString());
//                     let e = ((t.fourStar / t.total) * 100).toFixed(0);
//                     $("#star4Bar").width(e.toString() + "%"), $("#star4").text(t.fourStar.toString());
//                     let i = ((t.fiveStar / t.total) * 100).toFixed(0);
//                     $("#star5Bar").width(i.toString() + "%"), $("#star5").text(t.fiveStar.toString());
//                 })(t),
//                     t
//             );
//         },
//     });
// });
