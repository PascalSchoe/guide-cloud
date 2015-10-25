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
        const API_URL_F2PC ='https://euw.api.pvp.net/api/lol/euw/v1.2/champion?freeToPlay=true&api_key=bfb0aa10-8915-4713-aa6f-cf24c8a05700';
        const API_URL_ALL_CHAMPIONS_EXTENDED = 'http://ddragon.leagueoflegends.com/cdn/5.20.1/data/de_DE/champion.json';
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
            //return $this->startRequest(self::API_URL_ALL_CHAMPIONS_EXTENDED);
            return file_get_contents(self::API_URL_ALL_CHAMPIONS_EXTENDED);
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
        private function buildURLString($requestItem, $origin=null)
        {
            if($origin === "specificItem")
            {
                return str_replace('{region}', $this->region,$requestItem) . '?locale=de_DE&version=5.8.1&itemData=all&api_key=' . self::API_KEY;
            }
            
            // baut die Url um den request an die riotApi zustellen 
            return str_replace('{region}', $this->region,$requestItem) . '?api_key=' . self::API_KEY;
            
        }
        
        private function startRequest($requestItem, $origin=null)
        {
            // startet request anhand der erzeugten url 
            // returnt apiResponse was z.B. summonerInfos enthält
            
            return file_get_contents($this->buildURLString($requestItem, $origin));
            
        }
        
        public function __construct($region)
        {
            $this->region = $region;
        }

        public function getF2PChampions()
        {
            return file_get_contents('https://euw.api.pvp.net/api/lol/euw/v1.2/champion?freeToPlay=true&api_key=bfb0aa10-8915-4713-aa6f-cf24c8a05700');
        }

        //______________SEARCH_KI__________________________

        /**
         * @param $property string Specifies the desired property
         * @param $condition string Specifies the value of the desired property
         */
        public function getChampionsData($property,$condition)
        {
            /**
             * Diese Funktion lädt ein JSON-Objekt zu Champions und durchsucht dieses nach gewissen Gesichtspunkten...
             */

            switch($property)
            {
                case "key":
            }

            $championsExtended = $this->getChampions();

            $championsExtended= json_decode($championsExtended,true)["data"];

            //print_r($championsExtended);

            foreach($championsExtended as $champion)
            {
                foreach($champion as $prop => $val)
                {
                    /**
                     * Occurs when reaching:  info, image, tags and stats
                     */
                    if(is_array($val))
                    {
                        foreach($val as $k => $v)
                        {
                            echo $k . " : " . $v . "<br />";
                        }
                    }
                    else
                    {
                        echo $prop . " : " . $val . "<br />";
                    }
                }
                echo "___________________________________ <br />";
            }

        }

    }

$riot = new RiotAPI("EUW");
$riot->getChampionsData("key", "266");
?>


