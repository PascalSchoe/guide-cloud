$(document).ready(function(){
    displayF2PChamps();
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
                        "width": this.imageData.w + "px",
                        "height": this.imageData.h + "px"
                    });
                    counter++;
                });
            }
        });
}
