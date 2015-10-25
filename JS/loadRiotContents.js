$(document).ready(function(){
    $.ajax(
        {
            url: 'Php/handleRequests.php',
            data:
            {
                'getRiotContents': 'F2PC'
            },
            type: 'POST',
            timeout: 2000,
            dataType: 'text',
            success: function(data)
            {
                /**
                 * Hier muss abgefragt werden welche Champs diese woche f2p sind
                 * anschließend muss anhand der id der name aufgelöst und
                 *
                 * @type {any}
                 */

                var d = JSON.parse(data);
                //console.log("Die Daten wurden angefordert und auch erhalten... " + d.data.Warwick.image.sprite + " ist das zu verwendende Sprite und ");
                //$('#f2p_container').html(d);
            }
        });
});