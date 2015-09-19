$(document).ready(function(){


    if(sessionStorage.getItem("alreadyVisited") === null)
    {
        sessionStorage.setItem("alreadyVisited", "true");
    }
    loadMasteries();

    var prereqs=[];

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
                "background": "url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+sessionStorage.getItem('selectedChamp') + $(this).attr('id') + ".jpg')  no-repeat 0 0 fixed",
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