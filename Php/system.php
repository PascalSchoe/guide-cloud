<?php
require_once("../private/serverConfig.php");
include_once("dBManager.php");

class System
{
    private $callOrign;

    public function __construct($callOrign = null)
    {
        $this->callOrign = $callOrign;

        echo "An object of class: " . __CLASS__ . " has been initialized...<br />";
    }

    public function createPassword($email,$password)
    {
        echo __CLASS__ . " - crypt()<br />";

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

        $string = hash_hmac ( "whirlpool", str_pad ( $password, strlen ( $password ) * 4, sha1 ( $email ), STR_PAD_BOTH ), SALT, true );

        //echo "gespeichert ist: " . $stored . " und erzeugt wurde: " . crypt($string, substr($stored,0,30)) ."<br />";

        $ut = new UserTable($this->callOrign);
        $ut-> getData("Email",$email);
        unset($ut);
        if($this->callOrign->getPassword() == crypt($string, substr($this->callOrign->getPassword(),0,30)))
        {
            echo "Willkommen du hast dich erfolgreich eingeloggt...";
        }
        else
        {
            echo "Die angegebene Password/Email - Kombination ist uns unbekannt...";
            unset($this->callOrign);
        }

        /**
         * Look for a User with used Email, if  found load his Data !
         * Afterwards check if the Password of this user is the same as the generated one
         *
         * If it fails the calling userobject is destroyed
         */


    }

    public function checkUserInput($rawData, $dbCol)
    {
        $colMaxLength = 0;
        $_rawData = null;

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
            default:
                echo __METHOD__ . " - Error when setting length auf column";
                break;

        }



        if (isset($rawData))
        {
            $_rawData = $rawData;
            //stl check
            if (strlen($_rawData) <= $colMaxLength)
            {
                //Striptags
                if (true)
                {
                    //$data = new
                    //trim
                    if (true)
                    {
                        //$data = new
                        //return data

                    }
                }
            }

            return false;
        }
    }
}
?>