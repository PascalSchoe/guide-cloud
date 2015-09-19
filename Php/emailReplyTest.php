<?php
    $empfaenger = "pschoe@guide-cloud.de";
    $absender = "pschoe@guide-cloud.de";
    $betreff = "Das ist die ERSTE Email die Guide Cloud verschickt !";
    $mailtext = "Ich weiß nicht was ich sagen soll,bin halt schuechtern... wie waere es mit pewpew !";
    $antwortan = "pschoe@guide-cloud.de";

mail($empfaenger, $betreff, $mailtext, "From: $absender\nReply-To: $antwortan");

echo "Deine Email wurde verschickt!";