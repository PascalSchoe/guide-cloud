<?php
function printArray_recursive($array = array()) 
{
    foreach($array as $key => $node) {
        if (is_array($node)) {
            printArray_recursive($node);
        } else {
            if($key === "id")
                echo "$node<br>";
        }
    }
}

function extractArray($array =array())
{   
    static $newArray = array(); 
    static $counter = 0;
    
    foreach($array as $key => $node)
    {
        if(is_array($node))
        {   
            extractArray($node, $newArray, $counter);
        }
        else
        {
            if($key === "id")
            {
                $newArray[$counter] = $node;
                $counter++;
            }
        }
    }
    return $newArray;
}
function printR($array)
{
    echo'<pre>';
    print_r(json_decode($array, true));
    echo'</pre>';
}