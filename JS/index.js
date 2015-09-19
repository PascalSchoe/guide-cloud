
$(document).ready(function(){
    $(".champIcon").click(function(){
    window.sessionStorage.setItem("selectedChamp", $(this).attr("id"));
    window.location = "guideEditor.html";
  });
});
