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
     * Diese Funktion soll f�r alle  F�lle funktionieren, egal welcher parameter als suchkriterium eingegeben wird
     * egal welche Table abgefragt wird!
     * Hier bei ist zu beachten das die Anzahl an feldern variable ist ....
     *
     * Zu erst m�sste eine predesignedQuery ausgew�hl und prepared werden, anschlie�en m�ssten die variablen Parameter gebunden werden...
     *
     * SELECT * FROM table (WHERE)
     *
     * Um die projektion zu filtern g�be es zwei m�glichkeiten:
     *  > Alles aus der Row zur�ckgeben lassen und anschlie�end nur Entsprechende Fields auslesen
     *  > Oder Query : SELECT ? FROM table (WHERE)
     *          > Hierbei wird aber dem zu viele parameter �bergeben und die Query l�sst zu viele m�glichkeiten des missbrauchs zu
     */
    abstract function getData($searchCol, $value);

    abstract function insertRecord($obj);

    abstract function updateRecord($oID, $changeCol,$newValue);

    abstract function deleteRecord($fieldArray);

    public function checkInputs(){

    }
}

?>