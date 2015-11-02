<?php
    session_start();
    include('usefulStuff.php');
    include('riotAPI.php');
    include('user.php');
    include('userTable.php');


    $rApi = new RiotApi("euw");
    $sys = new System();
    $response = array();
    $errors = array();
    if(isset($_POST['loggOut']))
    {
        session_destroy();
        echo "pewpew";
    }

    if(isset($_POST['isAlreadyLoggedIn']))
    {
        if(isset($_SESSION['user']) != "")
        {
            $response['success'] = true;
            $response['username'] = $_SESSION['username'];

        }
        else
        {
            $response['success'] = false;
        }
        echo json_encode($response);
    }

/**
 *  TODO maybe rework code cuz it only checks for length, type etc but the input wont be stored to db anyways and we just need  trimming
 */
    if(isset($_POST['login_email']))
    {
        $response['success'] = intval(true);

        $email = $sys->checkUserInput($_POST['login_email'],"email","string");
        $pw = $sys->checkUserInput($_POST['login_password'],"password","string");

        //Occurs if the input is not valid
        if($email['success'] == intval(false))
        {
            $response['success'] =intval(false);
            foreach($email['errors'] as $error)
            {
                $errors[] = $error;
            }
        }
        //Occurs if the input is not valid
        if($pw['success'] == intval(false))
        {
            $response['success'] =intval(false);
            foreach($pw['errors'] as $error)
            {
                $errors[] = $error;
            }
        }


        if($response['success'] == intval(true))
        {
            $user = new User();
            $response = $user->login($email['data'], $pw['data']);
            //if success
                // contains success, msg
            //if failure
                // contains success, errors
            //echo json_encode($response);
        }
        else
        {
            //$response['errors'] = $errors;
            //echo json_encode($response);
        }
    }

    if(isset($_POST['firstname']))
    {
        $response['success'] =intval(true);

        $fname = $sys->checkUserInput($_POST["firstname"],"firstname", "string");
        $lname;
        // ,"registration" is  important because email and username should only be used once !
        $uname = $sys->checkUserInput($_POST["username"],"username", "string","registration");
        $email = $sys->checkUserInput($_POST["email"],"email", "string","registration");
        $pw = $sys->checkUserInput($_POST["password"],"password", "string");

        $dob;
        if(isset($_POST["dateOfBirth"]))
        {
            $dob = $sys->checkUserInput($_POST["dateOfBirth"],"dateOfBirth", "string");
        }
        else
        {
            $dob = null;

        }
        if(isset($_POST["lastname"]))
        {
            $lname = $sys->checkUserInput($_POST["lastname"],"lastname", "string");
        }
        else
        {
            $lname = null;
        }

        /**
         * At this point we have to check whether all Data is valid or not
         *      > If valid register user with given values
         *          > if registration is a success display success to user
         *      > If not valid display errors
         */
        if($fname['success'] == intval(false))
        {
            $response['success'] =intval(false);
            foreach($fname['errors'] as $error)
            {
                $errors[] = $error;
            }
        }

        if($lname['success'] == intval(false))
        {
            $response['success'] =intval(false);
            foreach($lname['errors'] as $error)
            {
                $errors[] = $error;
            }
        }

        if($uname['success'] == intval(false))
        {
            $response['success'] =intval(false);
            foreach($uname['errors'] as $error)
            {
                $errors[] = $error;
            }
        }

        if($email['success'] == intval(false))
        {
            $response['success'] = intval(false);
            foreach($email['errors'] as $error)
            {
                $errors[] = $error;
            }
        }

        if($pw['success'] == intval(false))
        {
            $response['success'] =intval(false);
            foreach($pw['errors'] as $error)
            {
                $errors[] = $error;
            }
        }

        if($dob['success'] == intval(false))
        {
            $response['success'] =intval(false);
            foreach($dob['errors'] as $error)
            {
                $errors[] = $error;
            }
        }

        if($response['success'] == intval(false))
        {
            $response['errors'] = $errors;
        }
        else
        {
            $user = new User();
            $user->registerUser(
                $fname['data'],
                $email['data'],
                $pw['data'],
                $uname['data'],
                $lname['data'],
                $dob['data']
            );

            $response['msg'] = "Du bist nun registriert";
        }
        echo json_encode($response);
    }

    if(isset($_GET['getRiotContents']))
    {
        $answer="";

        switch($_GET['getRiotContents'])
        {
            case "F2PC":
                echo $rApi->getF2PChampions();
                break;
            case "allChampImages":
                echo $rApi->getAllChampionIcons();
                break;
            default:
                return __FILE__ . "Fehler in der getRiotContents Abfrage...";
        }
    }

    /*
        $userT = new UserTable();

        $userT->insertRecord($_POST);
		*/





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