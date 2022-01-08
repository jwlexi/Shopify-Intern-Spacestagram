$(document).ready(function() {
 
 $(".like-button").click(function(event){
     if($(this).text() == "Like") {
         $(this).html("Unlike");
         $(this).css("background-color","#1a53ff");
     }
     else {
         $(this).html("Like");
         $(this).css("background-color","transparent");
     }
 });

 $(".getImageLink").click(function(){
    let imgname = $(this).closest('div').find(".cardsImages").attr('src');
    $(this).closest('div').find(".imageLink").text(imgname);
    $(this).closest('div').find(".imageLink").css("display", "block");
    $(this).closest('div').find(".imageLink").css("width", "20em");
     $(this).closest('div').find(".imageLink").css("margin", "0 auto");
 });

});

