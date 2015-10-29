$(document).ready(function(){

    /**
     * BUTTONS
     */




    /**
     * OPENING Elements
     */
    $('#login_btn').on('click',function() {
        $('#login_container').fadeIn();
    });

    $('#league_btn').on('click', function() {
        $('#comp_container').fadeIn();
    });

    $('#reg_btn').on('click', function(){
       $('#registrationPopup').show();
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
        //Beware of caret !
        else if($('#comp_container').is(':visible') && !$('#comp_container').is(e.target) && !$('#comp_container').has(e.target).length && !$(e.target).is('#league_btn') && !$('#league_btn').has(e.target).length)
        {
            $('#comp_container').fadeOut();
        }
        else if( $('#registrationPopup').is(':visible') && !$('#registrationPopup').is(e.target) && !$('#registrationPopup').has(e.target).length && !$(e.target).is('#reg_btn') &&  !$('#reg_btn').has(e.target).length)
        {
            $('#registrationPopup').fadeOut();
        }

    });


    $('#cancelLogin').on("click",function(){
            $('#login_container').hide();
    });
    $('.closeBtn').on('click', function(){
       $(this).parent().hide();
    });




    /**
     * FUNCTIONS
     */
});