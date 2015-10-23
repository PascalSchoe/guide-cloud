<?php

abstract class BaseTable
{
    protected $fieldList;
    protected $serverResponse;
    protected $errors;
    protected $dbm;
    protected $signature;

    /*
     * hier  musss ich mal schauen wie ich das hinbekomme:
     *
     * kann man die Where clause als ? substituieren oder nur teile der Where-clause ?
     * Diese Funktion soll für alle  Fälle funktionieren, egal welcher parameter als suchkriterium eingegeben wird
     * egal welche Table abgefragt wird!
     * Hier bei ist zu beachten das die Anzahl an feldern variable ist ....
     *
     * Zu erst müsste eine predesignedQuery ausgewähl und prepared werden, anschließen müssten die variablen Parameter gebunden werden...
     *
     * SELECT * FROM table (WHERE)
     *
     * Um die projektion zu filtern gäbe es zwei möglichkeiten:
     *  > Alles aus der Row zurückgeben lassen und anschließend nur Entsprechende Fields auslesen
     *  > Oder Query : SELECT ? FROM table (WHERE)
     *          > Hierbei wird aber dem zu viele parameter übergeben und die Query lässt zu viele möglichkeiten des missbrauchs zu
     */
    abstract function getData($searchCol, $value);

    abstract function insertRecord($obj);

    abstract function updateRecord($oID, $changeCol,$newValue);

    abstract function deleteRecord($fieldArray);

    public function checkInputs(){

    }
}

?>