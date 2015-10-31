$(document).ready(function(){
    if($("#f2p_container").length)
    {
        displayF2PChamps();
    }
    if($(".champIcon").length)
    {
        displayChampions(null);
    }

});

function displayF2PChamps()
{
    $.ajax(
        {
            url: 'Php/handleRequests.php',
            data:
            {
                'getRiotContents': 'F2PC'
            },
            type: 'get',
            timeout: 10000,
            dataType: 'text',
            success: function(data)
            {
                var counter = 0;
                var JSONArray = $.parseJSON( data );
                $.each(JSONArray, function(){
                    $("#champ_" + counter).css({
                        "background-image":"url('RES/IMG/champIcons/" + this.imageData.sprite +"')",
                        "background-repeat":"no-repeat",
                        "background-position": "-" + this.imageData.x + "px -" + this.imageData.y + "px",
                        "width": this.imageData.w  + "px",
                        "height": this.imageData.h + "px"
                    });
                    $("#champ_" + counter).addClass("icon-small");
                    counter++;
                });
            }
        });
}

function displayChampions(filter)
{
    var championDivs = $(".champIcon");
    var championImages;
    var counter = 0;

    $.ajax(
        {
            url:'Php/handleRequests.php',
            data:
            {
                'getRiotContents': 'allChampImages'
            },
            type: 'get',
            timeout: 10000,
            dataType: 'text',
            success: function(data)
            {
                var championImages = $.parseJSON( data );
                $(".champIcon").each(function(){
                    $(this).css({
                        "background-image":"url('RES/IMG/champIcons/" +championImages[counter].sprite +"')",
                        "background-repeat":"no-repeat",
                        "background-position": "-" + championImages[counter].x + "px -" + championImages[counter].y + "px",
                        "width": championImages[counter].w+5 + "px",
                        "height": championImages[counter].h+5 + "px"
                    });
                    counter++;

                });
            }
        }
    );
    if(filter === "all")
    {

    }
}
