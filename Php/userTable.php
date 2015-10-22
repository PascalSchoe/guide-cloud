<?php

require_once('baseTable.php');

class UserTable extends BaseTable
{
    public function __construct()
    {
        $this->tablename = 'Users';
        $this->fieldList = array(
            'userID',
            'firstname',
            'lastname',
            'username',
            'dateOfBirth',
            'dateOfReg',
            'gender',
            'country',
            'state',
            'city',
            'zipCode',
            'email',
            'password'
        );
    }
}

?>