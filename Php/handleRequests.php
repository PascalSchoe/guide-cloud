<?php

    include('usefulStuff.php');
    include('riotAPI.php');
    include('user.php');
    include('userTable.php');
    
    $rApi = new RiotApi("euw");

    if(isset($_POST['loginBtn']))
    {
        $user = new User();
        $user->login($_POST['email'],$_POST['password']);
        //header("Location: ../home.html");
        exit;
    }

    if(isset($_POST['regBtn']))
    {
        echo " hier war ich aber auch drinne";
        $user = new User();
        $user->registerUser(
            $_POST['firstname'],
            $_POST['email'],
            $_POST['password'],
            $_POST['username'],
            $_POST['lastname'],
            $_POST['dateOfBirth'],
            $_POST['gender'],
            $_POST['country'],
            $_POST['state'],
            $_POST['city'],
            $_POST['zipCode']
        );
    /*
        $userT = new UserTable();

        $userT->insertRecord($_POST);
		*/
    }




/*
    //$request = $rApi ->getStaticData("specificItem","3089");
    $request = $rApi ->getStaticData("items","");
    
    $response = file_get_contents($request);
   
    printR($response);
 
    
    function showTooltipOf($object,$itemID)
    {
        switch($obeject)
        {
            case'item':
                break;
            case'summonerSpell':
                break;
            case'mastery':
                break;
            case'rune':
                break;
            case'item':
                break;
            
        }
    }


    if(isset($_GET["getStaticData"]))
    {
       $request = $_GET["getStaticData"];
       
       $request2;
       
       if(isset($_GET["itemID"]))
       {
           $request2 = $_GET["itemID"];
       }
       
       switch($request)
       {
           case 'allItems':
               $apiRequest = $rApi -> getStaticData("items", "");
               $response = file_get_contents($apiRequest);
               echo $response;
              
               break;
           case 'specificItem':
               $apiRequest = $rApi ->getStaticData("specificItem",$request2);
               $response = file_get_contents($apiRequest);
               echo $response;
               break;
           default:
               echo'Es kam zu nem Fehler im HandleRequest-script!';
               break;
       }
    }
  */
?>