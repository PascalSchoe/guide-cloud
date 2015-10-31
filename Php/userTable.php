<?php

require_once('baseTable.php');
require_once('dBManager.php');

class UserTable extends BaseTable
{

    private $retrievedUserID;
    private $retrievedFname;
    private $retrievedLname;
    private $retrievedUname;
    private $retrievedDOB;
    private $retrievedDOR;
    private $retrievedGender;
    private $retrievedCountry;
    private $retrievedState;
    private $retrievedCity;
    private $retrievedZIP;
    private $retrievedEmail;
    private $retrievedPassword;

    private $userInstance;

    public function __construct($uInstance=null)
    {
        $this->userInstance = $uInstance;
        $this->dbm = new DBManager();
        $this->tablename = 'Users';
        $this->fieldList = array(
            'userID' => array(
                "pk"    =>  "y",
                "type"  =>  "i"
            ),
            'firstname' => array(
                "type"  =>  "s"
            ),
            'lastname' => array(
                "type"  =>  "s"
            ),
            'username' => array(
                "type"  =>  "s"
            ),
            'dateOfBirth' => array(
                "type"  =>  "s"
            ),
            'dateOfReg' => array(
                "type"  =>  "s"
            ),
            'gender' => array(
                "type"  =>  "s"
            ),
            'country' => array(
                "type"  =>  "s"
            ),
            'state' => array(
                "type"  =>  "s"
            ),
            'city' => array(
                "type"  =>  "s"
            ),
            'zipCode' => array(
                "type"  =>  "s"
            ),
            'email' => array(
                "type"  =>  "s"
            ),
            'password' => array(
                "type"  =>  "s"
            )
        );
    }

    public function __destruct()
    {
        unset($this->dbm);
    }

    public function isAvailable($col,$value)
    {
        $uID = null;

        $this->dbm->stmt = $this->dbm->mysqli->prepare($this->dbm->getPredesignedQueries()["UserQueries"]["already_in_use_" . $col]);
        $this->signature = 's';
        $this->dbm->stmt->bind_param(
            $this->signature,
            $value
        );
        $this->dbm->stmt->execute();

        $this->dbm->stmt->bind_result(
            $this->retrievedUserID
        );

        if($this->dbm->stmt->fetch())
        {
            return false;
        }

        return true;
    }

    public function getData($searchCol, $value)
    {
        if($searchCol == "ID")
        {
            $this->signature = 'i';
        }
        else if($searchCol == "Username" || $searchCol == "Email")
        {
            $this->signature = 's';
        }
        else
        {
            //echo __CLASS__ . " - getData()... Wrong searchCol: " .$searchCol;
        }

        $this->dbm->stmt = $this->dbm->mysqli->prepare($this->dbm->getPredesignedQueries()['UserQueries']['findUserBy' . $searchCol]);
        $this->dbm->stmt->bind_param(
            $this->signature,
            $value
        );
        $this->dbm->stmt->execute();

        $this->dbm->stmt->bind_result(
             $this->retrievedUserID,
             $this->retrievedFname,
             $this->retrievedLname,
             $this->retrievedUname,
             $this->retrievedDOB,
             $this->retrievedDOR,
             $this->retrievedGender,
             $this->retrievedCountry,
             $this->retrievedState,
             $this->retrievedCity,
             $this->retrievedZIP,
             $this->retrievedEmail,
             $this->retrievedPassword
        );

        if($this->dbm->stmt->fetch())
        {
            $this->userInstance->remoteAccess = true;
            $this->userInstance->setUserID($this->retrievedUserID);
            $this->userInstance->setDor($this->retrievedDOR);
            $this->userInstance->setEmail($this->retrievedEmail);
            $this->userInstance->setUsername($this->retrievedUname);
            $this->userInstance->setFirstname($this->retrievedFname);
            $this->userInstance->setLastname($this->retrievedLname);
            $this->userInstance->setCountry($this->retrievedCountry);
            $this->userInstance->setState($this->retrievedState);
            $this->userInstance->setCity($this->retrievedCity);
            $this->userInstance->setZip($this->retrievedZIP);
            $this->userInstance->setGender($this->retrievedGender);
            $this->userInstance->setPassword($this->retrievedPassword);
            $this->userInstance->setDob($this->retrievedDOB);
            $this->userInstance->remoteAccess = false;

        }
    }


    public function insertRecord($obj=null)
    {
        //echo __METHOD__. "<br />" .$obj ."<br />";

        if(isset($obj))
        {
            $this->userInstance = $obj;
        }
        $this->signature ="sssssss";
        $this->dbm->stmt = $this->dbm->mysqli->prepare($this->dbm->getPredesignedQueries()['UserQueries']['addUser']);
        $this->dbm->stmt->bind_param(
            $this->signature,
            $this->userInstance->getFirstname(),
            $this->userInstance->getLastname(),
            $this->userInstance->getUsername(),
            $this->userInstance->getDob(),
            $this->userInstance->getDor(),
            $this->userInstance->getEmail(),
            $this->userInstance->getPassword()
        );

        $this->dbm->stmt->execute();
    }

    public function updateRecord($uID, $changeCol,$newValue)
    {
        $this->signature ="si";
        $this->dbm->stmt = $this->dbm->mysqli->prepare($this->dbm->getPredesignedQueries()['UserQueries']['modifyUser'.$changeCol]);
        $this->dbm->stmt->bind_param(
            $this->signature,
            $newValue,
            $uID
        );

        $this->dbm->stmt->execute();

    }

    public function deleteRecord($fieldArray)
    {
        // Unused for now...
    }

}
/*
$uT = new UserTable();
$uT_2 = new UserTable();
$uT_3 = new UserTable();
$uT_4 = new UserTable();
$uT->getData("ID",15);
$uT_4->getData("Username","aclau");
$uT_2->getData("Email","kamus.foryou@gmx.net");
$uT_3->getData("Email","aclau@guide-cloud.de")
*/
/*
$uT = new UserTable();
$uT->updateRecord(11,"Country","eineAnderesLand");
*/
?>