<?php
include_once("dBManager.php");
include_once("system.php");

/**
 *
 * Diese Klasse dient als Schnittstelle zwischen der Datenbank und der Clientside bezüglich der User-Interaktionen
 *
 */
class User
{
    private $uID;
    private $fname;
    private $lname;
    private $uname;
    private $dob;
    private $dor;
    private $gender;
    private $country;
    private $state;
    private $city;
    private $zip;
    private $email;
    private $password;

    public $remoteAccess=false;

    private $userTable;
    private $sys;

    public function __construct()
    {
        echo "An object of class: " . __CLASS__ . " has been initialized...<br />";
    }

    /**
     * This method stores the guide within database.
     *
     * @author pschoe
     * @param STRING gType This param is important because it differentiate between the possible guides(different tables in DB)
     */
    public function storeGuide($gType){
        //test
    }
    public function resetPassword(){}
    public function newPassword(){}
    public function commentOn($subject, $comment){}
    public function sendMessage(){}
    public function vote($subject,$evaluation){}
    public function createTeam(){}
    public function assignToTeam(){}

    public function registerUser($fname,$email,$pw,$uname,$lname,$dob,$gender,$country,$state,$city,$zip)
    {
        $this->fname = $fname;
        $this->lname= $lname;
        $this->uname= $uname;
        $this->dob = $dob;
        $this->dor = date("d-m-Y H:i:s");
        $this->gender = $gender;
        $this->country = $country;
        $this->state = $state;
        $this->city = $city;
        $this->zip = $zip;
        $this->email = $email;

        $sys = new System();
        $this->password = $sys->createPassword($email,$pw);
        unset($sys);

        $ut = new UserTable($this);
        $ut->insertRecord($this);
        unset($ut);
    }

    public function login($email,$password)
    {
        $sys = new System($this);
        $sys->checkPassword($email,$password);
        unset($sys);

    }

    // Eig sollte hier die ID verwendet  werden da diese den Pk darstellt
    public function loadUserData($email)
    {
        $this->userTable = new UserTable($this);
        $this->userTable->getData("Email",$email);
        unset($this->userTable);
    }
    public function saveUserData($changedCol,$newValue)
    {
        if(!$this->remoteAccess)
        {
            echo __CLASS__ . " - saveUserData()<br />";

            $this->userTable = new UserTable();
            $this->userTable->updateRecord($this->uID, $changedCol, $newValue);
            unset($this->userTable);
        }
    }
    public function __toString()
    {
        $this->printInfo();
        return "";
    }

    public function printInfo()
    {
        echo "Class " . __Class__ . " PRINTING USER....<br />";
        echo "UserID: " . $this->uID . "<br />";
        echo "firstname: " .$this->fname . "<br />";
        echo "lastname: " .$this->lname . "<br />";
        echo "username: " .$this->uname . "<br />";
        echo "date of birth: " .$this->dob . "<br />";
        echo "date of registration: " .$this->dor . "<br />";
        echo "gender: " .$this->gender . "<br />";
        echo "country: " .$this->country . "<br />";
        echo "city: " .$this->city . "<br />";
        echo "state: " .$this->state . "<br />";
        echo "zicode: " .$this->zip . "<br />";
        echo "email: " .$this->email . "<br />";
        echo "password: " .$this->password . "<br />";
    }

    //__________Setter

    /**
     * TODO Additionally I have to ask for some of the Setter if the field is unset if it is go on, if not denial(for example dob!)
     *
     * There are several cases:
     *                              -   User do specify Information after the regristration (allow once!)
     *                              -   User was forced to set an information and will never again be able to reset (username, email and Dob)
     *                              -   User can change indefinitely the value of this field (for example: country, state...etc)
     *                              -   There are information the user does not see and will not manipulate (userID, Dor)
     */

    public function setUserID($id)
    {
        $this->uID = $id;
    }
    public function setDor($dor)
    {
        $this->dor = $dor;

    }
    public function setEmail($eml)
    {
        $this->email = $eml;
    }
    public function setUsername($un)
    {
        $this->uname= $un;
    }
    public function setFirstname($fn)
    {
        $this->fname = $fn;

        $this->saveUserData("Firstname", $fn);
    }
    public function setLastname($ln)
    {
        $this->lname = $ln;
        $this->saveUserData("Lastname",$ln);
    }
    public function setCountry($ctry)
    {
        $this->country = $ctry;
        $this->saveUserData("Country",$ctry);
    }
    public function setState($st)
    {
        $this->state = $st;
        $this->saveUserData("State",$st);

    }
    public function setCity($c)
    {
        $this->city = $c;
        $this->saveUserData("City",$c);

    }
    public function setZip($z)
    {
        $this->zip = $z;
        $this->saveUserData("ZIP",$z);
    }
    public function setGender($g)
    {
        $this->gender = $g;
        $this->saveUserData("Gender",$g);
    }
    public function setPassword($pw)
    {

        if(!$this->remoteAccess)
        {
            $sys = new System();
            $this->password = $sys->createPassword($this->email, $pw);
            unset($sys);

            $this->saveUserData("Password", $this->password);
        }
        else
        {
            $this->password = $pw;
        }
    }
    public function setDob($dob)
    {
        //ONLY ONCE !
        if($this->dob == null) {
            $this->dob = $dob;
            if (!$this->remoteAccess) $this->saveUserData("DOB");
        }
        else
        {
            echo __CLASS__ . " - setDob()... You can only set your Birthday once !";
            return false;
        }
    }



    //__________Getter
    public function getUserID()
    {
        return $this->uID;
    }
    public function getFirstname()
    {
        return $this->fname;
    }
    public function getLastname()
    {
        return $this->lname;
    }
    public function getCountry()
    {
        return $this->country;
    }
    public function getUsername()
    {
        return $this->uname;
    }
    public function getState()
    {
        return $this->state;
    }
    public function getCity()
    {
        return $this->city;
    }
    public function getGender()
    {
        return $this->gender;
    }
    public function getZip()
    {
        return $this->zip;
    }
    public function getEmail()
    {
        return $this->email;
    }
    public function getPassword()
    {
        return $this->password;
    }
    public function getDob()
    {
        return $this->dob;
    }
    public function getDor()
    {
        return $this->dor;
    }

}

/*
$ps = new User();
$ms = new User();

$ms->registerUser("Micky","micky@guide-cloud.de","ohio2020","mToTheIcky","Schönfeld",null,null,null,null,null,null);
//$user->setFirstname("Micky");
$ps->loadUserData("pschoe");
$ms->loadUserData("mToTheIcky");

echo $ps;
echo $ms;
*/
/*
$andrew = new User();
$andrew->login('aclau@guide-cloud.de','a');
$andrew->setFirstname("andy");
*/
$nU = new User();

?>