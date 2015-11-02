<?php
require_once("../private/serverConfig.php");
include_once("dBManager.php");

class System
{
    private $callOrign;

    public function __construct($callOrign = null)
    {
        $this->callOrign = $callOrign;

       // echo "An object of class: " . __CLASS__ . " has been initialized...<br />";
    }

    public function createPassword($email,$password)
    {
        //echo __CLASS__ . " - crypt()<br />";

        $string = hash_hmac('whirlpool', str_pad($password, strlen( $password ) * 4, sha1( $email ), STR_PAD_BOTH), SALT,true);
        $salt = substr(str_shuffle('./0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),0,22);
        return crypt($string,'$2a$' . BC_COST . '$'. $salt );
    }

    /**
     * This one is not that secure cuz if you know the email of someone you get all other Data.
     *
     *
     * @param $email
     * @param $password
     * @return bool
     */
    public function checkPassword($email,$password)
    {
        //echo $email . "<br />";
        //echo $password . "<br />";
        $response = array();

        $string = hash_hmac ( "whirlpool", str_pad ( $password, strlen ( $password ) * 4, sha1 ( $email ), STR_PAD_BOTH ), SALT, true );

        $ut = new UserTable($this->callOrign);
        $ut-> getData("Email",$email);

        if($this->callOrign->getPassword() === crypt($string, substr($this->callOrign->getPassword(),0,30)))
        {
           // echo "pw ist das gleiche yay!";
            //session_start();
            $response['success'] = intval(true);
            $response['msg'] = 'Willkommen du hast dich erfolgreich eingeloggt';
            $_SESSION['user']= $this->callOrign->getUserID();
            $_SESSION['username'] =  $this->callOrign->getUsername();
           echo json_encode($response);
            //return $response;
        }
        else
        {
            $response['success'] = intval(false);
            $response['errors'] = 'Die angegebene Password/Email - Kombination ist uns unbekannt';
            //destroying userObject which holds private Data
            unset($this->callOrign);
            echo json_encode($response);
            //return $response;

        }

        /**
         * Look for a User with used Email, if  found load his Data !
         * Afterwards check if the Password of this user is the same as the generated one
         *
         * If it fails the calling userobject is destroyed
         */
        unset($ut);
    }

    /**
        * This method checks several scenarios:
     *          > Input holds values
     *          > Input contains no tags
     *          > Input contains no unnecessary whitespace
     *          > Input does not exceed column length
     *
     *  After this tests it returns the sanitized Data or an error message.
     *
     * @param $rawData / Userinput which will be checked and sanitized
     * @param $dbCol string Name of Database column, which will host the input
     * @param $type  string  Type of input
     * @param null $call
     * @return array
     */
    public function checkUserInput($rawData,$dbCol, $type, $call=null)
    {
        $colMaxLength = 150;
        $_rawData = null;
        $type  = 'is_' .$type;
        $response = array();
        $response['success'] = intval(true);
        $response['errors'] = array();
        /*
         * HARDCODED ...
         * Later I mma fix this and get me the col length from the right *Table class obj
         */
        switch ($dbCol) {
            case "firstname":
            case "lastname":
            case "username":
                $colMaxLength = 50;
                break;
            case "country":
            case "state":
            case "city":
                $colMaxLength = 100;
                break;
            case "zip":
                $colMaxLength = 11;
                break;
            case "email":
                $colMaxLength = 256;
                break;
            case "password":
            case "dateOfBirth":
                //wayn
                break;
            default:
                echo __METHOD__ . " - Error when setting length of column: " .$dbCol ."<br/>";
                break;

        }

        if (!(isset($rawData)))
        {
            $response['success'] = intval(false);
            $response['errors'][] = 'Es wurde kein Wert für: ' . $dbCol . ' angegeben!';
        }

        /**
         * Does Input have correct DataType?
         */
        if (!($type($rawData)))
        {
            $response['success'] = intval(false);
            $response['errors'][] = 'Der Datentyp für Ihre Eingabe:'. $rawData .' entspricht nicht dem geforderten Format.';
        }

        /**
         * Does the input exceed column length?
         */
        if (!(strlen($rawData) <= $colMaxLength))
        {
            $response['success'] = intval(false);
            $response['errors'][] = 'Ihre Eingabe: ' . $rawData .' ist zu lang, maximal zulässing sind ' . $colMaxLength . ' Zeichen.';

        }

        /**
         * Is value already taken?
         */
        if(($call === "registration")&& ($dbCol === "username"|| $dbCol === "email"))
        {
            $ut = new UserTable();
            if (!($ut->isAvailable($dbCol, $rawData)))
            {
                $response['success'] = intval(false);
                $response['errors'][] =  $dbCol . " wird schon verwendet.";
            }
        }

        if($response['success']== intval(true))
        {
            //Striptags
            $_rawData = strip_tags($rawData);
            $_rawData = trim($_rawData);

            //trim and return clean Input
            $response['data'] = $_rawData;

        }

        return $response;
    }
}

//$s = new System();
//$s->checkUserInput("pascggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggal","firstname", "string");
//$s->checkUserInput( 13345435457485748577845788888888888555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555558888888888888888888888888888888888888888888888888888888888888888888,"firstname","string");
//$s->checkUserInput("mToTheIcky","username","int");
//$s->checkUserInput("micky","firstname","string");
?>