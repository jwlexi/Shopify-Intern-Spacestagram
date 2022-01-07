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

 $(".generateLink").click(function(event){
     $(".imageLink").text("https://bit.ly/3t6wOwE")
     $(".imageLink").css("display", "block");
 });
    
    
});

