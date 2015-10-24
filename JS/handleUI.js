$(document).ready(function(){
    /**
     * BUTTONS
     */

    /**
     * OPENING Elements
     */
    $('#login_btn').on('click',function() {
        $('#login_container').fadeIn();
        console.log("Es wird das login fenster geöffnet!");
    });

    $('#league_btn').on('click', function() {
        $('#comp_container').fadeIn();
        console.log("Es wird das League fenster geöffnet!");
    });




    /**
     * CLOSING Elements
     */

    $(document).on('click', function (e) {
        /*
            Here  you have to check if:
             > a pop-up is visible
             > e.target is not one of its childs
             > e.target is not the pop-up's calling element
         */
        console.log("Es wurde aufs Fenster geklickt!");
        if ( $('#login_container').is(':visible') && !$('#login_container').is(e.target) && !$('#login_container').has(e.target).length && !$(e.target).is('#login_btn'))
        {
            $('#login_container').fadeOut();
        }
        else if($('#comp_container').is(':visible') && !$('#comp_container').is(e.target) && !$('#comp_container').has(e.target).length && !$(e.target).is('#league_btn'))
        {
            $('#comp_container').fadeOut();
        }

    });


    $('#cancelLogin').on("click",function(){
            $('#login_container').hide();
    });

});