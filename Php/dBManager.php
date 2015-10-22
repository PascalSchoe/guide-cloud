<?php
require_once("../private/serverConfig.php");

class DBManager
{
    private $mysqli;
    private $sql;

    private $callOrign;
    private $operation;

    //Shitty I know!
    private $rTemp_1;
    private $rTemp_2;
    private $rTemp_3;
    private $rTemp_4;
    private $rTemp_5;
    private $rTemp_6;
    private $rTemp_7;
    private $rTemp_8;
    private $rTemp_9;
    private $rTemp_10;
    private $rTemp_11;
    private $rTemp_12;
    private $rTemp_13;
    private $rTemp_14;
    private $rTemp_15;

    /**
     * Maybe I have to find a better way for the Queries  'modifyUserFName'...etc
     *
     * @var array This Array contains a bunch of Sql-Queries, it saves processing time and prevents SQL-Injection
     */
    private $predesignQueries = array(
        "addUser"           => "INSERT INTO Users (firstname, lastname,username,dateOfBirth,dateOfReg,gender,country,state,city,zipCode,email,password) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
        "modifyUserFName"   => "UPDATE Users SET firstname = ? WHERE userID = ?",
        "modifyUserLName"   => "UPDATE Users SET lastname = ? WHERE userID = ?",
        "modifyUserDOB"     => "UPDATE Users SET dateOfBirth = ? WHERE userID = ?",
        "modifyUserGender"  => "UPDATE Users SET gender = ? WHERE userID = ?",
        "modifyUserCountry" => "UPDATE Users SET country = ? WHERE userID = ?",
        "modifyUserState"   => "UPDATE Users SET state = ? WHERE userID = ?",
        "modifyUserCity"    => "UPDATE Users SET city = ? WHERE userID = ?",
        "modifyUserZIP"     => "UPDATE Users SET zipCode = ? WHERE userID = ?",
        "modifyUserPW"      => "UPDATE Users SET password = ? WHERE userID = ?",
        "loadUserData"      => "SELECT * FROM Users WHERE email = ?",
        "getUserPW"         => "SELECT password FROM Users WHERE email = ?"
    );

    public $stmt;

    public function __construct($callOrign=null)
    {
        $this->callOrign = $callOrign;

        $this->mysqli = new MySQLi(
            DB_SERVER,
            DB_USER,
            "",
            DB_NAME
        );

        if($this->mysqli->connect_errno)
        {
            die("Es ist ein Fehler beim Aufbauen der Datenbankverbindung aufgetreten..." . $this->mysqli->connect_error);
        }

        echo "Ein Objekt der Klasse: ". __CLASS__ . " wurde erfolgreich erzeugt...<br />";
    }

    public function __destruct()
    {
        $this->stmt->close();
        $this->mysqli->close();
    }


    public function prepareQuery($queryToDo,$search_key=null)
    {
        $this->stmt = $this->mysqli->prepare($this->predesignQueries[$queryToDo]);
        $this->operation = $queryToDo;
        echo $queryToDo . " wurde übergeben, Suchkriterium ist: $search_key<br />";
        switch($queryToDo) {
            case "addUser":
                $this->stmt->bind_param("ssssssssssss",
                    $this->callOrign->getFirstname(),
                    $this->callOrign->getLastname(),
                    $this->callOrign->getUsername(),
                    $this->callOrign->getDob(),
                    $this->callOrign->getDor(),
                    $this->callOrign->getGender(),
                    $this->callOrign->getCountry(),
                    $this->callOrign->getState(),
                    $this->callOrign->getCity(),
                    $this->callOrign->getZip(),
                    $this->callOrign->getEmail(),
                    $this->callOrign->getPassword()
                );
                break;
            case "modifyUserFName":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getFirstname(),
                    $search_key
                    );
                break;
            case "modifyUserLName":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getLastname(),
                    $this->callOrign->getUserID()
                );
                break;
            case "modifyUserDOB":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getDob(),
                    $this->callOrign->getUserID()
                );
                break;
            case "modifyUserGender":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getGender(),
                    $this->callOrign->getUserID()
                );
                break;
            case "modifyUserCountry":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getCountry(),
                    $this->callOrign->getUserID()
                );
                break;
            case "modifyUserState":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getState(),
                    $this->callOrign->getUserID()
                );
                break;
            case "modifyUserCity":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getCity(),
                    $this->callOrign->getUserID()
                );
                break;
            case "modifyUserZIP":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getZip(),
                    $this->callOrign->getUserID()
                );
                break;
            case "modifyUserPW":
                $this->stmt->bind_param(
                    "si",
                    $this->callOrign->getPassword(),
                    $this->callOrign->getUserID()
                );
                break;
            case "loadUserData":
                $this->callOrign->remoteAccess = true;
                $this->stmt->bind_param(
                    "s",
                    $search_key
                );
                break;
            case "getUserPW":
                echo __CLASS__ . " - retrieving userPW <br />";
                $this->stmt->bind_param(
                    "s",
                    $search_key
                );
                $this->operation = $queryToDo;
                break;
            default:
                echo"Error - PrepareQuery!...";
        }
    }

    /**
     * Used to do the actual query on database.
     *
     * TODO implement return!
     *
     * @author pschoe
     * @return BOOLEAN Returns whether the Query was a success or not, to react appropriate.
     */
    public function doQuery()
    {
        echo __CLASS__ . " doQuery()<br />";

        $this->stmt->execute();

        switch($this->operation)
        {
            case "loadUserData":
                $this->stmt->bind_result(
                    $this->rTemp_1,
                    $this->rTemp_2,
                    $this->rTemp_3,
                    $this->rTemp_4,
                    $this->rTemp_5,
                    $this->rTemp_6,
                    $this->rTemp_7,
                    $this->rTemp_8,
                    $this->rTemp_9,
                    $this->rTemp_10,
                    $this->rTemp_11,
                    $this->rTemp_12,
                    $this->rTemp_13
                );

                if($this->stmt->fetch())
                {
                    $this->callOrign->setUserID( $this->rTemp_1 );
                    $this->callOrign->setFirstname($this->rTemp_2);
                    $this->callOrign->setLastname($this->rTemp_3);
                    $this->callOrign->setUsername($this->rTemp_4);
                    $this->callOrign->setDob($this->rTemp_5);
                    $this->callOrign->setDor($this->rTemp_6);
                    $this->callOrign->setGender($this->rTemp_7);
                    $this->callOrign->setCountry($this->rTemp_8);
                    $this->callOrign->setState($this->rTemp_9);
                    $this->callOrign->setCity($this->rTemp_10);
                    $this->callOrign->setZip($this->rTemp_11);
                    $this->callOrign->setEmail($this->rTemp_12);
                    //der zeit noch private $this->callOrign->setPassword($this->rTemp_13);
               }
                $this->callOrign->remoteAccess = false;
                break;
            case "getUserPW":
                echo "doQuery für pw fast fertig!";
                $this->stmt->bind_result(
                    $this->rTemp_1
                );

                if($this->stmt->fetch())
                {
                    echo "doQuery für pw fertig!";
                    return $this->rTemp_1;
                }
                break;
            default:
                echo"Error - Pimmelgewitter!...";
        }
    }
}
?>