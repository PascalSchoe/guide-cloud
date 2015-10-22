<?php

abstract class BaseTable
{
    protected $tablename;
    protected $fieldList;
    protected $serverResponse;
    protected $errors;

    /*
     * hier  musss ich mal schauen wie ich das hinbekomme:
     *
     * kann man die Where clause als ? substituieren oder nur teile der Where-clause ?
     */
    public function getData($where)
    {
        $this->serverResponse = array();

        if(empty($where))
        {
            
        }
    }
    public function insertRecord($fieldArray)
    {
        $evilUwe= "";
        //Hier muss die übergabe des $_POST gefiltert werden mit hilfe der $fieldList
        //---> unset array[now]  if !in_arrayFieldList
        //print_r($fieldArray);
        foreach($fieldArray as $field => $fieldValue)
        {
            if(!in_array($field,$this->fieldList))
            {
                echo "Ne man das  gehört hier echt nicht rein!..." . $fieldArray[$field] ."... raus ey!<br />";
            }
            else
            {
                echo "Moinsen: " . $fieldArray[$field]. "<br />";
            }
        }
    }
    public function updateRecord($fieldArray)
    {

    }
    public function deleteRecord($fieldArray)
    {

    }
}

?>