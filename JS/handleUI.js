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
       $('#registrationPopup').fadeIn();
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
        if ( $('#login_container').is(':visible') && !$('#login_container').is(e.target) && !$('#login_container').has(e.target).length && !$(e.target).is('#login_btn'))
        {
            $('#login_container').fadeOut();
        }
        //Beware of caret !
        else if($('#comp_container').is(':visible') && !$('#comp_container').is(e.target) && !$('#comp_container').has(e.target).length && !$(e.target).is('#league_btn') && !$('#league_btn').has(e.target).length)
        {
            $('#comp_container').fadeOut();
        }
        else if( $('#registrationPopup').is(':visible') && !$('#registrationPopup').is(e.target) && !$('#registrationPopup').has(e.target).length && !$(e.target).is('#reg_btn') && !$('#reg_btn').has(e.target).length && !$(e.target).is('#serverResponse') && !$('#serverResponse').has(e.target).length)
        {
            $('#registrationPopup').fadeOut();
        }
        else if( $('#serverResponse').is(':visible') && !$('#serverResponse').is(e.target) && !$('#serverResponse').has(e.target).length)
        {
            //&& !$(e.target).is('#reg_btn') &&  !$('#reg_btn').has(e.target).length
            $('#serverResponse').fadeOut();
        }
    });

    $('.closeBtn').on('click', function(){
       $(this).parent().fadeOut();
    });




    /**
     * FUNCTIONS
     */
    //__________________User loggt in already ?
    $.ajax({
        url:    'Php/handleRequests.php',
        type:   'post',
        data:
        {
            'isAlreadyLoggedIn': 'wayn'
        },
        success: function(data)
        {
            var srv_response = $.parseJSON( data );
            //console.log(data);
            if(srv_response.success == 1)
            {
                $('#surfaceBtn').show();
                $('#surfaceBtn').html(srv_response['username']);
                //location.reload();
            }

        }
    });

    //__________________Login
    $("#loginForm").on('submit',function(e){
        e.preventDefault();

        $.ajax({
            url:    'Php/handleRequests.php',
            type:   'post',
            data:   $(this).serialize(),
            success: function(data)
            {

                var srv_response = $.parseJSON( data );
                var msg_color = '#';

                $('#msgBox').empty();
                if(srv_response.success == 0)
                {
                    msg_color += 'f00';
                    $.each(srv_response['errors'],function(){
                        $('#msgBox').append("<p>" + this + "</p>");
                    });
                    location.reload();
                }
                else
                {
                    msg_color += '0f0';
                    $('#msgBox').append("<p>" + srv_response['msg'] + "</p>");
                    $('#reg').fadeOut();
                    $('#reg_btn').hide();
                    location.reload();
                }

                $('#msgBox p').css("color",msg_color);
                $('#serverResponse').fadeIn();
            }
        });
    });
    //__________________Registration
    $("#registrationForm").on('submit',function(e){
        e.preventDefault();

        $.ajax({
            url:    'Php/handleRequests.php',
            type:   'post',
            data:   $(this).serialize(),
            success: function(data)
            {

                var srv_response = $.parseJSON( data );
                var msg_color = '#';

                $('#msgBox').empty();
                if(srv_response.success == 0)
                {
                    msg_color += 'f00';
                    $.each(srv_response['errors'],function(){
                        $('#msgBox').append("<p>" + this + "</p>");
                    });
                }
                else
                {
                    msg_color += '0f0';
                    $('#msgBox').append("<p>" + srv_response['msg'] + "</p>");
                    $('#registrationPopup').fadeOut();
                }

                $('#msgBox p').css("color",msg_color);
                $('#serverResponse').fadeIn();
            }
        });
    });
});