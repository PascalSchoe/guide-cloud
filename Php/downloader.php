<?php
    include('riotAPI.php');
    include('usefulStuff.php');
    
    $test = new RiotApi("euw");
    $ausgabe = $test->getStaticData(); 
    
    $content = file_get_contents($ausgabe);
    $contentNew = json_decode($content, true);
    
    //var_dump($contentNew["data"]);
    $items = $contentNew["data"];
    
    $allIDs = extractArray($items);
    
   // var_dump($allIDs);
    
    function savingImages($ids = array(), $startCounter, $maxCounter)
    {
        for($counter = $startCounter; $counter < $maxCounter; $counter++)
        {
                $image = file_get_contents("http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/" . $ids[$counter] . ".png");
                $fp = fopen("../RES/IMG/items2/" . $ids[$counter] . ".png", "w");
                fwrite($fp, $image);
                fclose($fp);
            
        }
    }
    
    savingImages($allIDs, 0, 150);
    //savingImages($allIDs, 150, 239);
    /*
    //Store in the filesystem.
     * 
    $fp = fopen("../RES/IMG/items/image.json", "w");
    fwrite($fp, $content);
    fclose($fp);
    */
   ?>