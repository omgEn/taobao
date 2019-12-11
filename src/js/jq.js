// $(function(){
//     $(document).scroll(function(){
//         if($(document).offsetTop()>600){
//             $('#slidebar').addClass('slideScroll');
//             console.log(1);
//         } else {
//             $('#slidebar').removeClass('slideScroll');
//         }
//     })
// })
$(function(){
    $.ajax({
        type: "POST",
        url: "../php/menu.php",
        data: "name=John&location=Boston",
        success: function(msg){
          alert( "Data Saved: " + msg );
        }
     });
})