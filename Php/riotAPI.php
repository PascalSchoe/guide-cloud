<?php
    class RiotApi
    {
        const API_URL_1_1 = 'https://{region}.api.pvp.net/api/lol/{region}/v1.1/';
        const API_URL_1_2 = 'https://{region}.api.pvp.net/api/lol/{region}/v1.2/';
        const API_URL_1_3 = 'https://{region}.api.pvp.net/api/lol/{region}/v1.3/';
        const API_URL_1_4 = 'https://{region}.api.pvp.net/api/lol/{region}/v1.4/';
        const API_URL_2_1 = 'https://{region}.api.pvp.net/api/lol/{region}/v2.1/';
        const API_URL_2_2 = 'https://{region}.api.pvp.net/api/lol/{region}/v2.2/';
        const API_URL_2_3 = 'https://{region}.api.pvp.net/api/lol/{region}/v2.3/';
        const API_URL_2_4 = 'https://{region}.api.pvp.net/api/lol/{region}/v2.4/';
        const API_URL_2_5 = 'https://{region}.api.pvp.net/api/lol/{region}/v2.5/';
        const API_URL_STATIC_1_2 = 'https://global.api.pvp.net/api/lol/static-data/{region}/v1.2/';
        
        const API_KEY ='bfb0aa10-8915-4713-aa6f-cf24c8a05700';
        
        private $region;
        
        public function getSummonerID($name)
        {
            // nimmt den Summonernamen entgegen und gibt die Id des Spielerers zurück
        }
        
        public function getSummonerInfo($sId, $filter= null)
        {
            //gibt wenn nicht anders spezifiziert durch $filter alle informationen  zu einem 
            // Summoner aus 
        }
        public function getChampions()
        {
            // gibt alle Champs aus 
            $requestItem = 'champion';
            
            $requestItem = self::API_URL_1_2 . $requestItem;
            return $this->startRequest($requestItem);
           
        }
        public function getStaticData($filter = null, $id)
        {
            // gibt alle Statischen Daten aus wenn, falls $filter übergeben wird werden nur 
            //Daten zu $filter ausgegeben 
             
            switch($filter)
            {
                case'items':
                    $requestItem = 'item';
                    $requestItem = self::API_URL_STATIC_1_2 . $requestItem;
                    return $this->startRequest($requestItem,"");
                case'specificItem':
                    $requestItem = 'item/' . $id;
                    $requestItem = self::API_URL_STATIC_1_2 . $requestItem;
                    return $this->startRequest($requestItem, "specificItem");
                default:
                    return'Fehler beim ausgeben der statischen Daten...';
                    
            }
        }
        private function buildURLString($requestItem, $origin)
        {
            if($origin === "specificItem")
            {
                return str_replace('{region}', $this->region,$requestItem) . '?locale=de_DE&version=5.8.1&itemData=all&api_key=' . self::API_KEY;
            }
            
            // baut die Url um den request an die riotApi zustellen 
            return str_replace('{region}', $this->region,$requestItem) . '?api_key=' . self::API_KEY;
            
        }
        
        private function startRequest($requestItem, $origin)
        {
            // startet request anhand der erzeugten url 
            // returnt apiResponse was z.B. summonerInfos enthält
            
            return $this->buildURLString($requestItem, $origin);
            
        }
        
        public function __construct($region)
        {
            $this->region = $region;
        }
    }
?>


