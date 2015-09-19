$(document).ready(function()
{
    if(window.sessionStorage.getItem("role") === null)
    {
        askForRole();
    }

    doTimeStamp();
    loadContentsOnReload();
    registerHandlers();

    if(sessionStorage.getItem("alreadyVisited") === null)
    {
        sessionStorage.setItem("alreadyVisited", "true");
    }

    var prereqs=[];

    loadMasteries();

    //provisorischer Bugfix der verhindert wenn die seite neu geladen wird das die texte nicht mehr editiert werden können
    $(window).unload(editTexts);

    function askForRole()
    {
        //Text der nach der Rolle fragt die dieser Guide erfüllen soll
        var msg = $("<p>Bitte gib die <b>Rolle</b> die dieser Guide beschreibt an...</p>");
        //4 Button "ADC", "Supp", "jungler" und "dd"
        var adcBtn = $("<button class='roleBtn' id='adc'>Adc</button>");
        var suppBtn = $("<button class='roleBtn' id='supporter'>Supporter</button>");
        var junglerBtn = $("<button class='roleBtn' id='jungler'>Jungler</button>");
        var ddBtn = $("<button class='roleBtn' id='dd'>DD</button>");

        adcBtn.css("background", "#222 url('./RES/IMG/adc_Symbol_icons.png') no-repeat top left");
        suppBtn.css("background", "#222 url('./RES/IMG/supp_Symbol_icons_2.png') no-repeat top left");
        junglerBtn.css("background", "#222 url('./RES/IMG/jungler_Symbol_icons_3.png') no-repeat top left");
        ddBtn.css("background", "#222 url('./RES/IMG/dd_Symbol_icons.png') no-repeat top left");

        $("#iContentWrapper").append(msg);
        $("#iContentWrapper").append(adcBtn);
        $("#iContentWrapper").append(suppBtn);
        $("#iContentWrapper").append(junglerBtn);
        $("#iContentWrapper").append(ddBtn);


        $("#interactiveContent").fadeIn("fast");

        $(".roleBtn").click(function(){
            window.sessionStorage.setItem("role", $(this).attr("id"));
            $("#iContentWrapper").empty();
            $("#interactiveContent").fadeOut("fast");
        });
            // Jungler wird aber erstmal nicht beachtet sollte später ein jungler guide erstellt werden wird eine zusätzliche Komponente geladen --> Karte mit laufrota


        //role in sessionStorage laden
    }

    function toggleSynergyRow(element)
    {
        if($(element).children().attr("class") === "downArrows")
        {
            $(element).parent().attr("class", "synergyRowWrapper maximized");

            $(element).children().attr("src", "Res/IMG/arrowUp_.png");

            $(element).children().attr("alt", "Arrow up");

            $(element).children().attr("class", "upArrows");

            $(element).siblings("img").show();
        }
        else if($(element).children().attr("class") === "upArrows")
        {
            $(element).parent().attr("class", "synergyRowWrapper minimized");

            $(element).children().attr("src", "Res/IMG/arrowDown_.png");

            $(element).children().attr("alt", "Arrow down");

            $(element).children().attr("class", "downArrows");

            $(element).siblings("img").hide();
        }
    }

    function registerHandlers() {
        //Texte anklick und veränderbar
        $(".editables").click(editTexts);
        //$(".matchUps_synergiesDescription.editables").click(editTexts);

        //Ausklappen der Synergyrows
        $(".minimizeMaximizeSynergyBtns").click(function () {
            toggleSynergyRow($(this));
        });

        //SummonerSpells
        $(".summonerSpellContainer").click(requestData);

        //Vllt.mit  Timer sodass nach 2 sek der Tooltip erst erscheint...
        $(".summonerSpellContainer").hover(function () {
            console.log("Bald werden hier Tooltips erscheinen..");
        });



        $(".sliderSuitable").mouseenter(setSynergy);



        //no good
        $("#qRow").children().each(function(){

        });
    }
    function closeElement()
    {
        //iwie dumm eig  nehme ich das nur  für interactiveContent was adneres wird nicht geschlosssen..
        $(this).parent().parent().fadeOut(300);
    }
    function doTimeStamp()
    {
        var  datum  = new Date();
        var month = datum.getMonth()+ 1;
        var year = datum.getFullYear();
        var day = datum.getUTCDate();
        var hour = datum.getHours();
        var min = datum.getUTCMinutes();


        $("#timeStamp").html(day + "." +month+"." + year +"&emsp;"+hour + ":" + min);
    }

    function setSynergy()
    {
        var oldSelection;

        //Bei mousenter
            //ist schon etwas eines  der childes mit active gesetzt ?
                //wenn ja raus ehy !
                //altes objekt aus dem SessionStorage speichern

        if( window.sessionStorage.getItem($(this).attr("id")) !== null)
        {
            oldSelection = window.sessionStorage.getItem($(this).attr("id"));

            $(this).children(".active").each(function(){
                $(this).removeClass("active");
            });

            console.log($(this).attr("id") + " hat einen eintrag im SessionStorage");
        }


        //Bei click
            //klasse 'active' hinzufügen
            //speichern der Auswahl im SessionStorage
        $(".sliderSteps").click(function(){
            $(this).addClass("active");
            window.sessionStorage.setItem($(this).parent().attr("id"), $(this).attr("class"));

            console.log($(this).parent().attr("id") + " wurde an " + $(this).attr("class") + " geklickt");
        });


        //Bei mouseleave
            // vergleichen der alten Auwahl und der Jetzige Auwahl
                // wenn gleich Reset to old
        $(".sliderSuitable").mouseleave(function(){
            console.log($(this).attr("id") + " wurde mit der Maus verlassen..");
            if(window.sessionStorage.getItem($(this).attr("id")) === oldSelection)
            {
                var index = window.sessionStorage.getItem($(this).attr("id")).indexOf(' ');
                var className = window.sessionStorage.getItem($(this).attr("id")).substring(0, index +1);

                console.log($(this).attr("id") + " hat kein neues activeElement und wurde wieder auf ");

                $(this).children("."+className).addClass("active");
            }
        });
    }
    function editTexts()
    {
        var elementID = $(this).attr("id");
        var oldElement = window.sessionStorage.getItem("editObject");

            //Altes input wieder umwandeln!! Später mit dbinhalten nun erstmal sessionstorage
            //maxlength  noch einstellen später

            if (oldElement !== elementID) {
                window.sessionStorage.setItem("editObject", elementID);

                var textArea = $("<textArea></textArea>");
                $(this).replaceWith(textArea);
                textArea.css({
                    background: "#000",
                    color: "#FFCD03",
                    padding: ".5em 1.5em",
                    fontSize: "1.2em"
                });
                textArea.attr({
                    id: elementID,
                    rows: "4",
                    cols: "100"
                });

                // Sollte der Nutzer  schon etwas in das Betreffende Feld geschrieben haben Text ins Feld laden
                if (window.sessionStorage.getItem(elementID) !== null)
                {
                    textArea.val(window.sessionStorage.getItem(elementID));
                }

                textArea.focus();
                textArea.keypress(function (e)
                {
                    if (e.which == 13)
                    {

                        window.sessionStorage.setItem(elementID, $("#" + elementID).val());

                        window.sessionStorage.setItem("editObject", "");

                        if (elementID === "guideTitle")
                        {
                            $("#" + elementID).replaceWith($("<h2 id='" + elementID + "' class='editables'>" + window.sessionStorage.getItem(elementID) + "</h2>"));
                        }
                        else
                        {
                            $("#" + elementID).replaceWith($("<p id='" + elementID + "'>" + window.sessionStorage.getItem(elementID) + "</p>"));
                            $("#" + elementID).attr("class", "editables");
                        }

                        $(".editables").click(editTexts);
                    }
                });

            }
    }
    function loadMasteries()
    {
        var masteriesJSON;
        var masteryTree;

        $.getJSON("http://ddragon.leagueoflegends.com/cdn/5.2.1/data/de_DE/mastery.json", function( data ){
            masteriesJSON = data;
            masteryTree = masteriesJSON["tree"];
            //console.log(masteriesJSON);
            console.log(masteryTree);
        });
    }
    function loadContentsOnReload()
    {
        //Überschrift laden ?? eventuell vor aufbau der seite reinballern ?
        $("h1").text("Hier entsteht dein " + window.sessionStorage.getItem("selectedChamp")+"-Guide");

        //Name des Autors laden

        //lastTime edited laden wenn nicht vorhanden aktuelle zeit reinpacken

        //Titel des Guides laden

        //Texte laden
        $(".editables").each(function(){
            if(window.sessionStorage.getItem($(this).attr("id"))!== null)
                $(this).html(window.sessionStorage.getItem($(this).attr("id")));
        });

        //SummonerSpells laden
        $(".summonerSpellContainer").each(function(){
            if(window.sessionStorage.getItem($(this).attr("id")) !== null)
            {
                var spell = window.sessionStorage.getItem($(this).attr("id"));
                $(this).html("<img alt='" + spell + " spell' src='RES/IMG/summonerSpells/" + spell + ".png'>");
            }
        });
        //Runen laden

        //Masteries laden

        // Items laden

        //SkillPrio laden

        //Synergien laden
        $(".sliderSuitable").each(function(){
           if(window.sessionStorage.getItem($(this).attr("id")) !== null)
           {
               var index = window.sessionStorage.getItem($(this).attr("id")).indexOf(' ');
               var className = window.sessionStorage.getItem($(this).attr("id")).substring(0, index +1);

               $(this).children("."+className).addClass("active");
           }
        });

    }

    function setSkillPriority()
    {
        $(this).html("&#1004;");
    }
    //Lädt angeforderte Inhalte via Ajax von der Riot Api
    function requestData()
    {
        //Hier wird NOCH direkt von der Api geladen
        // später wird zwischen statischen und dynamischen Daten unterschieden und entsprechend der Unterscheidung
        //entweder über die Riot-Api oder von der Datenbank der geforderte Inhalt geladen


        var requester = $(this).attr("class");

        // Hier die Untescheidung
        var dynamicData;

        switch(requester)
        {

            case "summonerSpellContainer":
                window.sessionStorage.setItem("summonerSpell", $(this).attr("id"));
                $("#iContentWrapper").empty();


                var barrierSp = $("<img>");
                var claritySp =  $("<img>");
                var cleanseSp =  $("<img>");
                var exhaustSp = $("<img>");
                var flashSp =  $("<img>");
                var igniteSp = $("<img>");
                var ghostSp =  $("<img>");
                var healSp = $("<img>");
                var reviveSp = $("<img>");
                var teleportSp =  $("<img>");

                barrierSp.attr({
                    id:         "barrier",
                    class:      "spell",
                    alt:        "barrier Spell"
                });
                claritySp.attr({
                    id:         "clarity",
                    class:      "spell",
                    alt:        "clarity Spell"
                });
                cleanseSp.attr({
                    id:         "cleanse",
                    class:      "spell",
                    alt:        "cleanse Spell"
                });
                exhaustSp.attr({
                    id:         "exhaust",
                    class:      "spell",
                    alt:        "exhaust Spell"
                });
                flashSp.attr({
                    id:         "flash",
                    class:      "spell",
                    alt:        "flash Spell"
                });
                igniteSp.attr({
                    id:         "ignite",
                    class:      "spell",
                    alt:        "ignite Spell"
                });
                ghostSp.attr({
                    id:         "ghost",
                    class:      "spell",
                    alt:        "ghost Spell"
                });
                healSp.attr({
                    id:         "heal",
                    class:      "spell",
                    alt:        "heal Spell"
                });
                reviveSp.attr({
                    id:         "revive",
                    class:      "spell",
                    alt:        "revive Spell"
                });
                teleportSp.attr({
                    id:         "teleport",
                    class:      "spell",
                    alt:        "teleport Spell"
                });


                $("#iContentWrapper").append(barrierSp);
                $("#iContentWrapper").append(claritySp);
                $("#iContentWrapper").append(cleanseSp);
                $("#iContentWrapper").append(exhaustSp);
                $("#iContentWrapper").append(flashSp);
                $("#iContentWrapper").append(igniteSp);
                $("#iContentWrapper").append(ghostSp);
                $("#iContentWrapper").append(healSp);
                $("#iContentWrapper").append(reviveSp);
                $("#iContentWrapper").append(teleportSp);
                $("#iContentWrapper").append($("<hr>"));
                $("#iContentWrapper").append($("<p>Bitte w\344hle einen der oben aufgelisteten Beschw\366rerzauber aus.</p>"));

                $(".spell").each(function() {
                    if (spellAvailable($(this).attr("id")))
                    {
                        $(this).attr("src", "RES/IMG/summonerSpells/" + $(this).attr("id") + ".png");

                        $(this).click(function(){

                            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), $(this).attr("id"));
                            $("#interactiveContent").fadeOut(500);

                            //Setzen des ausgewählten Spells...
                            var chosenSpell = $("<img>");
                            chosenSpell.attr({
                                src:        "RES/IMG/summonerSpells/" + $(this).attr("id") + ".png",
                                alt:        $(this).attr("id") + " Spell"
                            });
                            $("#" + window.sessionStorage.getItem("summonerSpell")).html(chosenSpell);
                        });
                    }
                    else
                    {
                        $(this).attr({
                            src: "RES/IMG/summonerSpells/" + $(this).attr("id") + "Gray.png",
                            class: "spell grayed"
                        });

                    }

                });
                var  closeBtn = $("<button class='closeBtns' type='button'>X</button>");
                closeBtn.click(closeElement);
                $("#iContentWrapper").append(closeBtn);
                $("#interactiveContent").fadeIn(500);
                break;
            case "runen":
                //yadadada
                break;
            case "masteries":
                //yadadada
                break;
            case "items":
                //yadadada
                break;
            case "skills":
                //yadadada
                break;
            case "synergyChamps":
                //yadadada
                break;
            case "toolTip":
                //yadadada
                break;
            case "icons":
                //yadadada
                break;
            case "author":
                //yadadada
                break;
            default:
                console.log("Diesen Requester kenne ich nicht!...");
                break;

        }

    }
    function spellAvailable(spell)
    {
        var testSpell1;
        var testSpell2;

        if(window.sessionStorage.getItem("summonerSpell") === "summonerSpell1" || window.sessionStorage.getItem("summonerSpell") === "summonerSpell2")
        {
            testSpell1 = "summonerSpell1";
            testSpell2 = "summonerSpell2";
        }
        else
        {
            testSpell1 = "summonerSpell3";
            testSpell2 = "summonerSpell4";
        }

        /*
        if($(testSpell1).hasChildNodes())
        {
            if(($(testSpell1).firstChild.getAttribute("id") === spell+"SpellUsed"))
            {
                return false;
            }
        }
        if($(testSpell2).hasChildNodes())
        {
            if(($(testSpell2).firstChild.getAttribute("id") === spell+"SpellUsed"))
            {
                return false;
            }

        }
        */

        if(window.sessionStorage.getItem(testSpell1) === spell || window.sessionStorage.getItem(testSpell2) === spell)
        {
            return false;
        }
        return true;
    }
    //Wird nicht mehr gebraucht
    function setGuideTitle()
    {
        //erstellen aller  Elemente um die benötigte Abfrage zu machen

        //msg
        //inputs
        //btns

        $("#interrogationAgentMsg").text("Wie soll der Titel deines Guides sein?");
        $("#interrogationAgent").fadeIn("slow");

        $("#interrogationAgentBtn").click(function(){
            //hier später Eingaben zuvor testen
            if($("#interrogationAgentInput").val() != "")
            {
                $("#interrogationAgent").animate({
                    left: "+=1000",
                    opacity: .1
                },750, function(){
                    $("#interrogationAgent").fadeOut("fast");
                    $("#guideTitle").text($("#interrogationAgentInput").val());
                });
            }
        });
    }

    //____NEUER PART
    function loadMasteries()
    {
        var masteriesJSON;
        var masteryTree;
        var masteryData;

        $.getJSON("http://ddragon.leagueoflegends.com/cdn/5.2.1/data/de_DE/mastery.json", function( data ){
            masteriesJSON = data;
            masteryTree = masteriesJSON["tree"];
            masteryData = masteriesJSON["data"];

            //___Speichern der angeforderten Mastery-daten im SessionStorage___
            sessionStorage.setItem("masteryData", JSON.stringify(masteryData));

            builtMasterySection(masteryTree);
            displayData(masteryData);
        });
    }

    function displayData(data)
    {
        $.each(data, function(key, value){
            $("#"+value.id).css({
                "background": "url('RES/IMG/masteries/"+ value.image.sprite +"')"+ "-"+value.image.x +"px " + "-"+value.image.y + "px",
                "width":value.image.w+"px",
                "height":value.image.h+"px"

            });


            window.sessionStorage.setItem(value.id, value.name);
            window.sessionStorage.setItem(value.name +"Max", value.ranks);
            window.sessionStorage.setItem(value.name +"Actual", (sessionStorage.getItem(value.name +"Actual") !== null ? parseInt(sessionStorage.getItem(value.name +"Actual")) : 0));

            $("#"+value.id + " span").html( sessionStorage.getItem(value.name + "Actual") + "/" + value.ranks);


            //___ WENN 0 DANN NOCH NICHT PREREQ ERFÜLLT ___
            if(value.prereq !== "0")
            {
                window.sessionStorage.setItem(value.name+"Unlocked", 0)
            }
        });
    }

    function createMasteryTooltip(e, mID)
    {
        var mastery;

        var tooltipHtml = "";

        var masteryData = JSON.parse(sessionStorage.getItem("masteryData"));
        $.each(masteryData, function(key, value){
            if(key === mID)
            {
                var actualRank = parseInt(sessionStorage.getItem(value.name +"Actual"));
                var maxRank = parseInt(value.ranks);

                tooltipHtml +=  "<h1>" + value.name + "</h1>";
                tooltipHtml +=  "<p>" + value.description[(actualRank < maxRank ? actualRank : actualRank - 1)] + "</p>";
            }
        });

        $("#tooltip").show();
        $("#tooltip").html(tooltipHtml);
        $("#tooltip").offset({
            left: e.pageX + 15,
            top: e.pageY
        });
    }
    function checkAvailability()
    {
        $.each($(".mastery"), function(i, v){
            var row = $(this).parent().parent().attr("id");
            var count = (sessionStorage.getItem(row.substring(2) + "Count") !== null ? parseInt(sessionStorage.getItem(row.substring(2) + "Count")) : 0);
            var masteryID = $(this).attr("id");

            var masteryName = sessionStorage.getItem(masteryID);
            var masterySkilled = parseInt(sessionStorage.getItem(masteryName+"Actual"));
            var maxRanks = parseInt(sessionStorage.getItem(masteryName+"Max"));
            var offCount = (sessionStorage.getItem("offCount") !== null ? parseInt(sessionStorage.getItem("offCount")): 0);
            var deffCount = (sessionStorage.getItem("deffCount") !== null ? parseInt(sessionStorage.getItem("deffCount")): 0);
            var utilCount = (sessionStorage.getItem("utilCount") !== null ? parseInt(sessionStorage.getItem("utilCount")): 0);


            if(row.substring(1,2)*4 <= count)
            {


                //Irreführende formulierung  ... wayne ...
                var unlocked = (sessionStorage.getItem(masteryName+"Unlocked") !== null ? parseInt(sessionStorage.getItem(masteryName+"Unlocked")) : 1);

                if(masterySkilled > 0)
                {
                    $(this).css("Box-shadow", "0 0 10px 5px rgba(255,0,255,1)");
                    $(this).find("span").html(masterySkilled + "/" +  maxRanks);
                }
                else
                {
                    if(offCount + deffCount + utilCount == 30)
                    {
                        $(this).css("Box-shadow", "inset 0 0 0 1000px rgba(0,0,0,.8)");
                    }
                    else {
                        if (unlocked === 1)
                            $(this).css("Box-shadow", "none");
                    }

                }
            }
            else
            {
                $(this).css("Box-shadow", "inset 0 0 0 1000px rgba(0,0,0,.8)");
            }

            $.each(prereqs, function(index, value) {

                if (masteryID === value.masteryRequired && masterySkilled == maxRanks) {
                    $("#" + value.masteryRequired + "fulfilled").css(
                        {
                            "background": "#FFCD03",
                            "box-shadow": "0px 0px 20px #fff"
                        });
                    var unlockedMastery = sessionStorage.getItem(value.mastery);
                    sessionStorage.setItem(unlockedMastery + "Unlocked", 1);
                }

            });


        });
    }
    //shitty!
    function reload()
    {
        $(".mastery").each(function(){

            var thisMastery = $(this);
            var masteryName = sessionStorage.getItem(thisMastery.attr("id"));
            var timesSkilled = parseInt(sessionStorage.getItem(masteryName+"Actual"));
            var maxRanks = parseInt(sessionStorage.getItem(masteryName+"Max"));

            if(timesSkilled > 0)
            {
                thisMastery.children("span").html( timesSkilled + "/" + maxRanks );
                thisMastery.css("Box-shadow", "0 0 10px 5px rgba(0,255,255,1)");


            }
        });
    }
    function builtMasterySection(mTree)
    {
        var offTree= mTree["Offense"] ;
        var deffTree= mTree["Defense"];
        var utTree= mTree["Utility"];

        var offTreeHtml ="";
        var deffTreeHtml = "";
        var utTreeHtml = "";

        //HTML für OffTree erzeugen und dem entsprechenden Container zufügen
        $.each(offTree,function(index, value){

            if(index > 0 )
            {
                offTreeHtml += "<div class='row'>";
                for(var i= 0; i < 4; i++)
                {
                    offTreeHtml += "<div id='"+ index + "_" +i+ "off" +"' class='col-xs-3 requiredC'></div>";
                }
                offTreeHtml += "</div>";
            }
            offTreeHtml += "<div id='r" + index + "off' class='row'>";
            $.each(value, function(index2,value2){//hier befindet man sich bei innerhalb einer row

                if(value2 !== null)
                {
                    // hier befindet man sich innerhalb einer col also einer mastery also einem Objekt
                    offTreeHtml += "<div class='col-xs-3'><div id='" + value2.masteryId + "' class='center-block mastery'><span></span></div></div>";
                    if(value2.prereq !== "0")
                    {
                        //___ Mastery benötigt masteryRequired durchgeskillt um freigeschaltet zu werden
                        prereqs.push({"mastery": value2.masteryId, "masteryRequired": value2.prereq});
                    }
                }
                else
                {
                    offTreeHtml += "<div class='col-xs-3 empty'></div>";
                }
            });

            offTreeHtml += "</div>";
        });
        offTreeHtml += "<span id='offCounter' class='counters'>Angriff: " + (sessionStorage.getItem("offCount") !== null ? parseInt(sessionStorage.getItem("offCount")) : 0) + "</span>";
        $("#offTree").html(offTreeHtml);

        //HTML für DeffTree erzeugen und dem entsprechenden Container zufügen
        $.each(deffTree,function(index, value){

            if(index > 0 )
            {
                deffTreeHtml += "<div class='row'>";
                for(var i= 0; i < 4; i++)
                {
                    deffTreeHtml += "<div class='col-xs-3 requiredC'></div>";
                }
                deffTreeHtml += "</div>";
            }
            deffTreeHtml += "<div id='r" + index + "deff' class='row'>";
            $.each(value, function(index2,value2){//hier befindet man sich bei innerhalb einer row

                if(value2 !== null)
                {
                    // hier befindet man sich innerhalb einer col also einer mastery also einem Objekt
                    deffTreeHtml += "<div class='col-xs-3'><div id='" + value2.masteryId + "' class='center-block mastery'><span></span></div></div>";

                    if(value2.prereq !== "0")
                    {
                        //___ Mastery benötigt masteryRequired durchgeskillt um freigeschaltet zu werden
                        prereqs.push({"mastery": value2.masteryId, "masteryRequired": value2.prereq});
                    }
                }
                else
                {
                    deffTreeHtml += "<div class='col-xs-3 empty'></div>";
                }
            });

            deffTreeHtml += "</div>";
        });
        deffTreeHtml += "<span id='deffCounter' class='counters'>Abwehr: " + (sessionStorage.getItem("deffCount") !== null ? parseInt(sessionStorage.getItem("deffCount")) : 0) + "</span>";
        $("#deffTree").html(deffTreeHtml);

        //HTML für UtilTree erzeugen und dem entsprechenden Container zufügen
        $.each(utTree,function(index, value){

            if(index > 0 )
            {
                utTreeHtml += "<div class='row'>";
                for(var i= 0; i < 4; i++)
                {
                    utTreeHtml += "<div class='col-xs-3 requiredC'></div>";
                }
                utTreeHtml += "</div>";
            }
            utTreeHtml += "<div id='r" + index + "util' class='row'>";
            $.each(value, function(index2,value2){//hier befindet man sich bei innerhalb einer row

                if(value2 !== null)
                {
                    // hier befindet man sich innerhalb einer col also einer mastery also einem Objekt
                    utTreeHtml += "<div class='col-xs-3'><div id='" + value2.masteryId + "' class='center-block mastery'><span></span></div></div>";
                    if(value2.prereq !== "0")
                    {
                        //___ Mastery benötigt masteryRequired durchgeskillt um freigeschaltet zu werden
                        prereqs.push({"mastery": value2.masteryId, "masteryRequired": value2.prereq});
                    }
                }
                else
                {
                    utTreeHtml += "<div class='col-xs-3 empty'></div>";
                }
            });
            utTreeHtml += "</div>";
        });
        utTreeHtml += "<span id='utilCounter' class='counters'>Wissen: " + (sessionStorage.getItem("utilCount") !== null ? parseInt(sessionStorage.getItem("utilCount")) : 0) + "</span>";
        $("#utilTree").html(utTreeHtml);

        $(".trees").css({
            "background": "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + sessionStorage.getItem('selectedChamp')+"_0.jpg')  no-repeat 0 0",
            "background-size": "100% 100%"
        });

        //Verbindungen zwischen Requireds Zeichnen
        $.each(prereqs, function(index, value){
            $("#" + value.masteryRequired).parent().parent().next().children().eq( $("#" + value.masteryRequired).parent().index()).html("<div id='"+ value.masteryRequired +"fulfilled' class='required'></div>");
        });
        //Wenn die Maus über einer Masterie ist wird ein timer gestartet
        //Wenn Mauszeiger sich nach 500 ms immer noch über dem gleichen Target befindet soll Tooltip zu dem entsprechenden Target erscheinen
        //Wenn Mauszeiger das Target verlässt soll das Tooltip fenster geschlossen und geleert werden


        //___ D A R S T E L L U N G ___

        checkAvailability();

        //___ H A N D L E R S ___
        $(".mastery").mouseenter(function(e){
            createMasteryTooltip(e, $(this).attr("id"));
        });
        $(".mastery").mouseleave(function(){
            $("#tooltip").hide();
            $("#tooltip").empty();
        });

        $(".skinOptions").on("click", function(){
            $(".trees").css({
                "background": "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+sessionStorage.getItem('selectedChamp') + $(this).attr('id') + ".jpg')  no-repeat 0 0",
                "background-size":  " 100% 100%"
            });
        });

        $(".mastery").click(function(e){
            var mastery = $(this);
            var masteryID = mastery.attr("id");
            var masteryName= sessionStorage.getItem(masteryID);
            var masterySkilled = parseInt(sessionStorage.getItem(masteryName+"Actual"));
            var masteryMax = parseInt(sessionStorage.getItem(masteryName+"Max"));

            var clickedRow = mastery.parent().parent().attr("id");
            var counter = (sessionStorage.getItem(clickedRow.substring(2) + "Count") !== null ? parseInt(sessionStorage.getItem(clickedRow.substring(2) + "Count")) : 0);

            var isUsedRquirement = false;

            //Testet ob die Mastery eine Vorstufe für eine andere Mastery ist
            //Wenn ja wird gestest ob die darauffolgende Mastery geskillt ist
            //Wenn ja dann blocken
            //Wenn nein dann mach weiter
            //Performance  wenn stop nach dem fund eines notwendigen Requirement
            $.each(prereqs, function(key, value){
                console.log("in der schleife");
                if(masteryID === value.masteryRequired && parseInt(sessionStorage.getItem(sessionStorage.getItem(value.mastery)+"Actual")) > 0)
                {
                    isUsedRquirement = true;
                    console.log("true");
                }

            });

            if(mastery.data("clicked") ===  true)
            {
                mastery.data("clicked", false);

                if(masterySkilled > 0 )
                {
                    // wenn count - 1 *4 < höchste row elemenet * 4
                    //Denn blocken
                    //Wenn nicht dann mach weiter
                    var highestSkilledMastery;
                    var highestSkilledRow;

                    //eventuell noch abfangen dass das element nicht in der letzten row ist
                    for(var i = 5; i > parseInt(clickedRow.substring(1,2)) ; i--)
                    {
                        var rowNow = $("#r"+i+clickedRow.substring(2));

                        rowNow.find(".mastery").each(function(){
                            // Noch abfangen das das element eine  row
                            if(parseInt(sessionStorage.getItem(sessionStorage.getItem($(this).attr("id"))+"Actual")) > 0)
                            {
                                highestSkilledRow = rowNow.attr("id");
                            }
                        });

                        if(highestSkilledRow !== undefined)
                            break;

                    }
                    // wenn überhaupt schon gesetzt
                    if(highestSkilledRow === undefined || !isUsedRquirement && highestSkilledRow !== undefined && counter > ((parseInt(highestSkilledRow.substring(1,2))*4)+1) ) {
                        masterySkilled--;
                        counter--;
                        sessionStorage.setItem(masteryName + "Actual", masterySkilled);
                        mastery.children("span").html(masterySkilled + "/" + masteryMax);

                        sessionStorage.setItem(clickedRow.substring(2) + "Count", counter);
                        createMasteryTooltip(e, mastery.attr("id"));
                        checkAvailability();
                        $("#" + clickedRow.substring(2) + "Counter").html((clickedRow.substring(2) === "off" ? "Angriff: " : (clickedRow.substring(2) === "deff" ? "Abwehr: " : "Wissen: ")) + counter);


                        $.each(prereqs, function (index, value) {
                            if (masteryID === value.masteryRequired && masterySkilled < masteryMax) {
                                $("#" + value.masteryRequired + "fulfilled").css(
                                    {
                                        "background": "#111",
                                        "box-shadow": "none"
                                    });
                                var unlockedMastery = sessionStorage.getItem(value.mastery);
                                sessionStorage.setItem(unlockedMastery + "Unlocked", 0);
                            }
                        });
                    }
                }
            }
            else
            {
                mastery.data("clicked", true);
                setTimeout(function(){
                    if(mastery.data("clicked") === true)
                    {
                        mastery.data("clicked", false);

                        var masteryUnlocked = (sessionStorage.getItem(masteryName+"Unlocked") !== null ? parseInt(sessionStorage.getItem(masteryName+"Unlocked")): 1);
                        var offCount = (sessionStorage.getItem("offCount") !== null ? parseInt(sessionStorage.getItem("offCount")): 0);
                        var deffCount = (sessionStorage.getItem("deffCount") !== null ? parseInt(sessionStorage.getItem("deffCount")): 0);
                        var utilCount = (sessionStorage.getItem("utilCount") !== null ? parseInt(sessionStorage.getItem("utilCount")): 0);

                        if(masteryUnlocked === 1 && masterySkilled < masteryMax && parseInt(clickedRow.substring(1,2))*4 <= counter)
                        {
                            if((offCount + deffCount + utilCount) >= 30)
                            {
                                $("#iContentWrapper").html($("<p>Leider kannst du keine Punkte mehr in Masteries investieren, du kannst nur maximal 30 Punkte verteilen. Solltest du dich deine Punkte neu verteilen wollen, doppelklicke eine Mastery.</p>"));
                                $("#interactiveContent").fadeIn("fast",function()
                                {
                                    $(window).on("click", function(){
                                        $("#interactiveContent").fadeOut("fast",function(){
                                            $("#iContentWrapper").empty();
                                        });

                                    });
                                });
                                return false;
                            }

                            sessionStorage.setItem(masteryName + "Actual", masterySkilled + 1);
                            $("#" + masteryID + " span").html(sessionStorage.getItem(sessionStorage.getItem(masteryID) + "Actual") + "/" + sessionStorage.getItem(sessionStorage.getItem(masteryID) + "Max"));
                            masterySkilled++;
                            counter++;

                            //performance ?!

                            //Vorläufig
                            sessionStorage.setItem(clickedRow.substring(2) + "Count", counter);
                            createMasteryTooltip(e, mastery.attr("id"));
                            checkAvailability();
                            $("#" + clickedRow.substring( 2 ) + "Counter").html((clickedRow.substring(2) === "off" ? "Angriff: " : (clickedRow.substring(2) === "deff" ? "Abwehr: " : "Wissen: ")) + counter);
                        }
                    }

                }, 250);
            }
        });

    }

});

