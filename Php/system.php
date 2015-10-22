<?php
require_once("../private/serverConfig.php");
include_once("dBManager.php");

class System
{
    private $callOrign;

    //parameter is important to setPW new after reset etc...!
    public function __construct($callOrign = null)
    {
        //$this->callOrign = $callOrgin;

        echo "An object of class: " . __CLASS__ . " has been initialized...<br />";
    }

    public function createPassword($email,$password)
    {
        echo __CLASS__ . " - crypt()<br />";

        $string = hash_hmac('whirlpool', str_pad($password, strlen( $password ) * 4, sha1( $email ), STR_PAD_BOTH), SALT,true);
        $salt = substr(str_shuffle('./0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),0,22);
        return crypt($string,'$2a$' . BC_COST . '$'. $salt );
    }

    public function checkPassword($email,$password)
    {
        $dbm = new DBManager();
        $dbm->prepareQuery("getUserPW",$email);

        $stored=$dbm->doQuery();
        $string = hash_hmac ( "whirlpool", str_pad ( $password, strlen ( $password ) * 4, sha1 ( $email ), STR_PAD_BOTH ), SALT, true );
        unset($dbm);
        echo "gespeichert ist: " . $stored . " und erzeugt wurde: " . crypt($string, substr($stored,0,30)) ."<br />";
        return crypt($string, substr($stored,0,30)) == $stored;

        //Evtl hier das laden ders users
    }
}
?>