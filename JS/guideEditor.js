
window.addEventListener("load", function(){
    var ajax;

    reloadPageContent();//?

    var summonerSpell1 = $("summonerSpell1");
    var summonerSpell2 = $("summonerSpell2");
    var summonerSpell3 = $("summonerSpell3");
    var summonerSpell4 = $("summonerSpell4");
    var itemContainers = document.getElementsByClassName("itemContainers");
    var minimizeMaximizeSynergyBtns = document.getElementsByClassName("minimizeMaximizeSynergyBtns");
    var checkItems = document.getElementsByClassName("checkItems");
    var closeBtns = document.getElementsByClassName("closeBtns");

    summonerSpell1.addEventListener("click", handleUserActions, false);
    summonerSpell2.addEventListener("click", handleUserActions, false);
    summonerSpell3.addEventListener("click", handleUserActions, false);
    summonerSpell4.addEventListener("click", handleUserActions, false);


    for(var i = 0; i < minimizeMaximizeSynergyBtns.length; i++ )
        minimizeMaximizeSynergyBtns[i].addEventListener("click", handleUserActions, false);
    
    for(var i = 0; i < checkItems.length; i++)
        checkItems[i].addEventListener("click", handleUserActions, false);
    
    for(var i = 0; i < closeBtns.length; i++)
        closeBtns[i].addEventListener("click", handleUserActions, false);
    
    for(var i = 0; i < itemContainers.length; i++)
        itemContainers[i].addEventListener("click", handleUserActions, false);

/*
 * Nimmt User eingaben entgegen und löst entsprechende Reaktionen aus.
 */

function handleUserActions(e)
{
    console.log("huhu");
    var src = e.target.getAttribute("id");
    
    if(e.target.parentNode.getAttribute("class") === "minimizeMaximizeSynergyBtns")
        src = "minimizeMaximizeSynergyBtns";
    
    //für den fall das schon ein summonerSpell auf dem Spell liegt um das click-event zu fixen 
    if(src === "barrierSpellUsed" || src === "claritySpellUsed" || src === "cleanseSpellUsed" || src === "exhaustSpellUsed" || src === "flashSpellUsed" || src === "igniteSpellUsed" || src === "ghostSpellUsed" || src === "healSpellUsed" || src === "reviveSpellUsed" || src === "teleportSpellUsed")
    {
        src = e.target.parentNode.getAttribute("id");
    }
    
    if(e.target.getAttribute("class") === "checkItems unchecked" || e.target.getAttribute("class") === "checkItems checked")
        src = e.target.getAttribute("class");
    
    if(e.target.getAttribute("class") === "closeBtns")
        src = "closeBtns";
    
    if(e.target.getAttribute("class")=== "itemContainers")
        src = "itemContainers";
    
    if(e.target.getAttribute("class") && (e.target.getAttribute("class")).substring(0,5) === "item ")
       src = "itemSelected";
   
    switch(src)
    {
        case "summonerSpell1":
            window.sessionStorage.setItem("summonerSpell", src);
            emptyContainer("iContentWrapper");
            buildContent("iContentWrapper", "summonerSpell");
            toggleVisibility("interactiveContent");
            break;
            
        case "summonerSpell2":
            window.sessionStorage.setItem("summonerSpell", src);
            emptyContainer("iContentWrapper");
            buildContent("iContentWrapper", "summonerSpell");
            toggleVisibility("interactiveContent");
            break;
            
        case "summonerSpell3":
            window.sessionStorage.setItem("summonerSpell", src);
            emptyContainer("iContentWrapper");
            buildContent("iContentWrapper", "summonerSpell");
            toggleVisibility("interactiveContent");
            break;
            
        case "summonerSpell4":
            window.sessionStorage.setItem("summonerSpell", src);
            emptyContainer("iContentWrapper");  
            buildContent("iContentWrapper", "summonerSpell");
            toggleVisibility("interactiveContent");
            break;
            
        case "closeInteractiveContent":
            emptyContainer("iContentWrapper");
            toggleVisibility("interactiveContent");
            break;
            
        case "barrier":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "barrier");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "clarity":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "clarity");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "cleanse":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "cleanse");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "exhaust":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "exhaust");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "flash":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "flash");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "ignite":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "ignite");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "ghost":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "ghost");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "heal":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "heal");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "revive":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "revive");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
            
        case "teleport":
            buildContent(window.sessionStorage.getItem("summonerSpell"), "teleport");
            window.sessionStorage.setItem(window.sessionStorage.getItem("summonerSpell"), src);
            toggleVisibility("interactiveContent");
            emptyContainer("iContentWrapper");
            break;
        
        case "minimizeMaximizeSynergyBtns"://
            //testen ob mini oder maxi 
                if(e.target.getAttribute("class") === "downArrows")
                {
                    e.target.parentNode.parentNode.setAttribute("class", "synergyRowWrapper maximized");
                    e.target.src ="Res/IMG/arrowUp_.png";
                    e.target.alt ="Arrow up";
                    e.target.setAttribute("class", "upArrows");
                    
                   //champImg
                    e.target.parentNode.parentNode.childNodes[3].setAttribute("class", "champsShow");
                }
                else if(e.target.getAttribute("class") === "upArrows")
                {
                    e.target.parentNode.parentNode.setAttribute("class", "synergyRowWrapper minimized");
                    e.target.src ="Res/IMG/arrowDown_.png";
                    e.target.alt ="Arrow down";
                    e.target.setAttribute("class", "downArrows");
                    
                    //champImg 
                    e.target.parentNode.parentNode.childNodes[3].setAttribute("class", "champsHidden");
                }
            break;
            
        case "checkItems unchecked":
            checkUncheckAbilities("check", (e.target.parentNode.getAttribute("class")).substring(5), (e.target.parentNode.parentNode.getAttribute("id")).substring(0,1));
            break;
            
        case "checkItems checked":
            checkUncheckAbilities("uncheck", (e.target.parentNode.getAttribute("class")).substring(5), (e.target.parentNode.parentNode.getAttribute("id")).substring(0,1));
            break;
            
        case "closeBtns":
            toggleVisibility(e.target.parentNode.getAttribute("id"));
            break;
        case "itemContainers":
            ajax =new AJAX("contentContainer",displayItems);
            ajax.makeGetRequest("./Php/handleRequests.php?getStaticData=allItems");
            buildContent("iContentWrapper", "loadAnimation");
            toggleVisibility("interactiveContent");   
            ajax.waitForContent();
            window.sessionStorage.setItem("selectedItemContainer", e.target.getAttribute("id"));
            break;
        case "itemSelected":
            ajax =new AJAX("contentContainer",selectItem);
            ajax.makeGetRequest("./Php/handleRequests.php?getStaticData=specificItem&itemID="+(e.target.getAttribute("class").substring(7)));
            buildContent(window.sessionStorage.getItem("selectedItemContainer"), "loadAnimation");
            toggleVisibility("interactiveContent");
            ajax.waitForContent();
            emptyContainer("iContentWrapper");
            break;
        
        default:
            console.log("irgendwas läuft hier falsch aller");
            break;
    }
    
    //erzeugt Content in dem Element "within", "content" sagt aus was erzeugt werden soll
    
}
function buildContent(within, content)
{
    var iContentWrapper = $("iContentWrapper");
    
    switch(content)
    {
        case "summonerSpell":
            //var interactiveContent = $("interactiveContent");

            // Erzeugen aller Elemente 
            
            var barrierSpell = createE("img");
            var claritySpell = createE("img");
            var cleanseSpell = createE("img");
            var exhaustSpell = createE("img");
            var flashSpell = createE("img");
            var igniteSpell = createE("img");
            var ghostSpell = createE("img");
            var healSpell = createE("img");
            var reviveSpell = createE("img");
            var teleportSpell = createE("img");

            var hr = createE("hr");

            var pTag1 = createE("p");
            var pTag1Text = document.createTextNode("Bitte w\344hle einen der oben aufgelisteten Beschw\366rerzauber aus.");

            var closeInteractiveContent = createE("div");



            //Attribute zuweisen
            barrierSpell.setAttribute("id", "barrier");
            claritySpell.setAttribute("id", "clarity");
            cleanseSpell.setAttribute("id", "cleanse");
            exhaustSpell.setAttribute("id", "exhaust");
            flashSpell.setAttribute("id", "flash");
            igniteSpell.setAttribute("id", "ignite");
            ghostSpell.setAttribute("id", "ghost");
            healSpell.setAttribute("id", "heal");
            reviveSpell.setAttribute("id", "revive");
            teleportSpell.setAttribute("id", "teleport");

            barrierSpell.setAttribute("class", "spell");
            claritySpell.setAttribute("class", "spell");
            cleanseSpell.setAttribute("class", "spell");
            exhaustSpell.setAttribute("class", "spell");
            flashSpell.setAttribute("class", "spell");
            igniteSpell.setAttribute("class", "spell");
            ghostSpell.setAttribute("class", "spell");
            healSpell.setAttribute("class", "spell");
            reviveSpell.setAttribute("class", "spell");
            teleportSpell.setAttribute("class", "spell");

            barrierSpell.setAttribute("alt", "barrier Spell");
            claritySpell.setAttribute("alt", "clarity Spell");
            cleanseSpell.setAttribute("alt", "cleanse Spell");
            exhaustSpell.setAttribute("alt", "exhaust Spell");
            flashSpell.setAttribute("alt", "flash Spell");
            igniteSpell.setAttribute("alt", "ignite Spell");
            ghostSpell.setAttribute("alt", "ghost Spell");
            healSpell.setAttribute("alt", "heal Spell");
            reviveSpell.setAttribute("alt", "revive Spell");
            teleportSpell.setAttribute("alt", "teleport Spell");

            if(spellAvailable("barrier"))
            {
                barrierSpell.src ="RES/IMG/summonerSpells/barrier.png";
                barrierSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                barrierSpell.src ="RES/IMG/summonerSpells/barrierGray.png";
                barrierSpell.setAttribute("class", "spell grayed");
            }

            if(spellAvailable("clarity"))
            {
                claritySpell.src ="RES/IMG/summonerSpells/clarity.png";
                claritySpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                claritySpell.src ="RES/IMG/summonerSpells/clarityGray.png";
                claritySpell.setAttribute("class", "spell grayed");
            }

            if(spellAvailable("cleanse"))
            {
                cleanseSpell.src ="RES/IMG/summonerSpells/cleanse.png";
                cleanseSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                cleanseSpell.src ="RES/IMG/summonerSpells/cleanseGray.png";
                cleanseSpell.setAttribute("class", "spell grayed");
            }

            if(spellAvailable("exhaust"))
            {
                exhaustSpell.src ="RES/IMG/summonerSpells/exhaust.png";
                exhaustSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                exhaustSpell.src ="RES/IMG/summonerSpells/exhaustGray.png";
                exhaustSpell.setAttribute("class", "spell grayed");
            }

            if(spellAvailable("flash"))
            {
                flashSpell.src ="RES/IMG/summonerSpells/flash.png";
                flashSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                flashSpell.src ="RES/IMG/summonerSpells/flashGray.png";
                flashSpell.setAttribute("class", "spell grayed");
            }
            if(spellAvailable("ignite"))
            {
                igniteSpell.src ="RES/IMG/summonerSpells/ignite.png";
                igniteSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                igniteSpell.src ="RES/IMG/summonerSpells/igniteGray.png";
                igniteSpell.setAttribute("class", "spell grayed");
            }
            if(spellAvailable("ghost"))
            {
                ghostSpell.src ="RES/IMG/summonerSpells/ghost.png";
                ghostSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                ghostSpell.src ="RES/IMG/summonerSpells/ghostGray.png";
                ghostSpell.setAttribute("class", "spell grayed");
            }
            if(spellAvailable("heal"))
            {
                healSpell.src ="RES/IMG/summonerSpells/heal.png";
                healSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                healSpell.src ="RES/IMG/summonerSpells/healGray.png";
                healSpell.setAttribute("class", "spell grayed");
            }
            if(spellAvailable("revive"))
            {
                reviveSpell.src ="RES/IMG/summonerSpells/revive.png";
                reviveSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                reviveSpell.src ="RES/IMG/summonerSpells/reviveGray.png";
                reviveSpell.setAttribute("class", "spell grayed");
            }
            if(spellAvailable("teleport"))
            {
                teleportSpell.src ="RES/IMG/summonerSpells/teleport.png";
                teleportSpell.addEventListener("click", handleUserActions, false);
            }
            else
            {
                teleportSpell.src ="RES/IMG/summonerSpells/teleportGray.png";
                teleportSpell.setAttribute("class", "spell grayed");
            }

            closeInteractiveContent.innerHTML= "X";
            closeInteractiveContent.setAttribute("id", "closeInteractiveContent");
            closeInteractiveContent.addEventListener("click", handleUserActions, false);

            //Elemente hinzufügen zum Container
            pTag1.appendChild(pTag1Text);

            iContentWrapper.appendChild(barrierSpell);
            iContentWrapper.appendChild(claritySpell);
            iContentWrapper.appendChild(cleanseSpell);
            iContentWrapper.appendChild(exhaustSpell);
            iContentWrapper.appendChild(flashSpell);
            iContentWrapper.appendChild(igniteSpell);
            iContentWrapper.appendChild(ghostSpell);
            iContentWrapper.appendChild(healSpell);
            iContentWrapper.appendChild(reviveSpell);
            iContentWrapper.appendChild(teleportSpell);

            iContentWrapper.appendChild(hr);

            iContentWrapper.appendChild(pTag1);

            iContentWrapper.appendChild(closeInteractiveContent);
            break;

        case "barrier":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "barrierSpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/barrier.png";

            $(within).appendChild(spell);
            break;

        case "clarity":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "claritySpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/clarity.png";

            $(within).appendChild(spell);
            break;

        case "cleanse":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "cleanseSpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/cleanse.png";

            $(within).appendChild(spell);
            break;

        case "exhaust":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "exhaustSpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/exhaust.png";

            $(within).appendChild(spell);
            break;

        case "flash":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "flashSpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/flash.png";

            $(within).appendChild(spell);
            break;

        case "ignite":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "igniteSpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/ignite.png";

            $(within).appendChild(spell);
            break;

        case "ghost":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "ghostSpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/ghost.png";

            $(within).appendChild(spell);
            break;

        case "heal":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "healSpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/heal.png";

            $(within).appendChild(spell);
            break;

        case "revive":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "reviveSpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/revive.png";

            $(within).appendChild(spell);
            break;

        case "teleport":
            var spell = createE("img");

            emptyContainer(within);

            spell.setAttribute("id", "teleportSpellUsed");
            spell.setAttribute("class", "spellUsed");
            spell.src = "RES/IMG/summonerSpells/teleport.png";

            $(within).appendChild(spell);
            break;

        case "closeInteractiveContent":
            var closeInteractiveContent = createE("div");
            closeInteractiveContent.setAttribute("id","closeInteractiveContent");
            closeInteractiveContent.innerHTML = "X";
            closeInteractiveContent.addEventListener("click", handleUserActions, false);
            $(within).appendChild(closeInteractiveContent);
            break;
        case "loadAnimation":
           
            var loader = createE("div");
            loader.setAttribute("class","loadAnimation");
            $(within).appendChild(loader);
            break;
        case "tooltip":
        /*
         * Nutzt "within" als angabe welches 'item' mit einem Tooltip erklärt
         * werden soll, ausgelöst wird 
         */
        default:
            console.log("Fehler beim erzeugen des Contents");
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
    else if(window.sessionStorage.getItem("summonerSpell") === "summonerSpell3" || window.sessionStorage.getItem("summonerSpell") === "summonerSpell4")
    {
        testSpell1 = "summonerSpell3";
        testSpell2 = "summonerSpell4";
    }
   
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
    return true;
}

function minimize()//v
{
    //testen ob minimize oder maximize 
    // nach jedem klick image ändern auf dem btn
    // quelle abfragen e.target.parentNode.parentNode ? 
    var element = $("synergyAshe");
    
    element.setAttribute("class", "synergyRowWrapper minimized");
}
function checkUncheckAbilities(change, _level, _ability)
{
    var level = _level;
    var ability = _ability;
    var prioStep = level + ability;
    var newPrio;
    var oldPrio;

    if(window.sessionStorage.getItem("skillPrio"))
        oldPrio = window.sessionStorage.getItem("skillPrio");
    else
        oldPrio = "";
    
    if(change === "uncheck")
    {
        //besteht  aus  string vor index.of und string nach dem index+ länge
        var str1, str2;

        str1 = oldPrio.substring(0, oldPrio.indexOf(prioStep));
        str2 = oldPrio.substring(oldPrio.indexOf(prioStep) + prioStep.length);
            
        newPrio = str1+str2;
        //event.target.setAttribute("class", "checkItems unchecked");
        
        $(ability +"Row").childNodes[((level*2) + 1)].firstChild.setAttribute("class", "checkItems " + change+"ed");
        window.sessionStorage.setItem("skillPrio", newPrio);
        printAbilityPrio();
    }
    else if(change === "check")
    {
        // alle skills bis level 9!
        if(level <= 9)
        {
            if(oldPrio.indexOf(level) !== -1)
            {
                var nextDigit = oldPrio.substring(oldPrio.indexOf(level)+ 1, oldPrio.indexOf(level)+ 2);
                var digitBefore = oldPrio.substring(oldPrio.indexOf(level)- 1, oldPrio.indexOf(level));
                
                //Abfangen das die ziffer vor dem aktuellen Zeichen nicht 1 ist denn sonst würde 16 auch die  6 beeinflussen
                if(digitBefore === "1")
                {
                    newPrio = oldPrio +prioStep;

                    // event.target.setAttribute("class", "checkItems checked");
                    $(ability +"Row").childNodes[((level*2) + 1)].firstChild.setAttribute("class", "checkItems " + change+"ed");
                    window.sessionStorage.setItem("skillPrio", newPrio);
                    printAbilityPrio();
                    
                }
                else
                {
                    //Wenn Suche ergebnis ergibt testen ob die zahl 10 oder 11 oder 12 ...usw statt 1 ist --- 
                    if(nextDigit === "0" || nextDigit === "1" || nextDigit === "2" || nextDigit === "3" || nextDigit === "4" || nextDigit === "5" || nextDigit === "6" || nextDigit === "7" || nextDigit === "8")
                    {
                        newPrio = oldPrio +prioStep;

                        // event.target.setAttribute("class", "checkItems checked");
                        $(ability +"Row").childNodes[((level*2) + 1)].firstChild.setAttribute("class", "checkItems " + change+"ed");
                        window.sessionStorage.setItem("skillPrio", newPrio);
                        printAbilityPrio();   
                    }
                    //Wenn die Fähigkeit auf dem Level schon geskillt wurde
                    else
                    {
                        emptyContainer("adviceInfo");

                        var advice = createE("p");
                        var adviceText = document.createTextNode("Du hast bereits eine F\344higkeit f\374r Level " + level+ " verteilt, bitte l\366sche diese erst bevor du sie neu verteilst." +"\r\n Danke:)");

                        advice.appendChild(adviceText);
                        $("adviceInfo").appendChild(advice);

                        toggleVisibility("adviceBox");
                    }
                }
            }
            //Wenn noch kein skill von diesem Level geskillt wurde----- beachte unter level 10 !
            else
            {
                newPrio = oldPrio +prioStep;
                   
                // event.target.setAttribute("class", "checkItems checked");
                $(ability +"Row").childNodes[((level*2) + 1)].firstChild.setAttribute("class", "checkItems " + change+"ed");
                window.sessionStorage.setItem("skillPrio", newPrio);
                printAbilityPrio();   
            }
        }
        // für alle Fähigkeiten ab 10 
        else
        {
            //Fähigkeit für dieses Level wurde noch nicht geskillt
            if(oldPrio.indexOf(level) === -1)
            {
                newPrio = oldPrio +prioStep;
                   
                // event.target.setAttribute("class", "checkItems checked");
                $(ability +"Row").childNodes[((level*2) + 1)].firstChild.setAttribute("class", "checkItems " + change+"ed");
                window.sessionStorage.setItem("skillPrio", newPrio);
                printAbilityPrio(); 
            }
            else
            {
                emptyContainer("adviceInfo");

                var advice = createE("p");
                var adviceText = document.createTextNode("Du hast bereits eine F\344higkeit f\374r Level " + level+ " verteilt, bitte l\366sche diese erst bevor du sie neu verteilst." +"\r\n Danke:)");

                advice.appendChild(adviceText);
                $("adviceInfo").appendChild(advice);

                toggleVisibility("adviceBox");   
            }
        }
    }
    console.log("Es wurde " + ($(ability +"Row").childNodes[((level*2) + 1)].firstChild.getAttribute("class")) + " gesetzt die neue queue ist: " + window.sessionStorage.getItem("skillPrio"));
}
    

function printAbilityPrio()
{
    
    var abilityPrioContainer = $("abilityPrio");

    var skillPrio = window.sessionStorage.getItem("skillPrio");

    for(var i = 1; i <= 18; i++)
    {
        var result = findXWithinString(skillPrio, i);

        // Wenn Zahl innerhalb der Queue gefunden wird
        if(result)
        {
            // geht ALLE result-einträge durch um zu vermeiden das 1q nicht mehr gefunden wird innerhalb "11r10w1q"
             for(var j = 0; j < result.length; j++)
            {
                var lengthOfNumber = i.toString().length;
                var letter = skillPrio.substring(result[j] + lengthOfNumber, result[j] + lengthOfNumber + 1);
                var digitBefore = skillPrio.substring(result[j] -1, result[j]);
                var actualRow = $(letter +"Row");
            
                //Alle Zahlen unter 10
                if(i <= 9)
                {
                    //Tritt ein wenn nach "1" gesucht wird und diese in 10, 11, 12 ...usw gefunden wird. In diesem Fall wird es ignoriert
                    if((i === 1 )&&(letter === "0" || letter === "1" || letter === "2" || letter === "3" || letter === "4" || letter === "5" || letter === "6" || letter === "7" || letter === "8"))
                    {
                        abilityPrioContainer.childNodes[((i*2)+1)].innerHTML = "";
                    }
                    //Tritt ein wenn nach "1,2,3,4..usw" gesucht wird und diese in 11,12, 13, 14 usw gefunden werden. In diesem Fall wird diese ignoriert
                    else if(digitBefore === "1")
                    {
                        abilityPrioContainer.childNodes[((i*2)+1)].innerHTML = "";
                    }
                    //Tritt ein wenn die gesuchte Zahl wirklich gefunden ist
                    else
                    {
                        actualRow.childNodes[((i*2)+1)].firstChild.setAttribute("class", "checkItems checked");
                        abilityPrioContainer.childNodes[((i*2)+1)].innerHTML = letter.toUpperCase();
                        break;
                    }
                }
                //Tritt ein wenn Zahl groesser als 9 ist
                else
                {
                    actualRow.childNodes[((i*2)+1)].firstChild.setAttribute("class", "checkItems checked");
                    abilityPrioContainer.childNodes[((i*2)+1)].innerHTML = letter.toUpperCase();
                }
            }
        }
        else
        {
            abilityPrioContainer.childNodes[((i*2)+1)].innerHTML = "";
        }
    }
}

function reloadPageContent()
   {
       // hier werden alle seiten inhalte neu aus dem sessionStorage geladen...
       if(window.sessionStorage.getItem("summonerSpell1"))
       {
            var spell = createE("img");

            emptyContainer("summonerSpell1");

            spell.setAttribute("id", window.sessionStorage.getItem("summonerSpell1")+"SpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/" + window.sessionStorage.getItem("summonerSpell1") + ".png";

            $("summonerSpell1").appendChild(spell);
       }
       
       if(window.sessionStorage.getItem("summonerSpell2"))
       {
            var spell = createE("img");

            emptyContainer("summonerSpell2");

            spell.setAttribute("id", window.sessionStorage.getItem("summonerSpell2") + "SpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/" + window.sessionStorage.getItem("summonerSpell2") + ".png";

            $("summonerSpell2").appendChild(spell);
       }
       
       if(window.sessionStorage.getItem("summonerSpell3"))
       {
            var spell = createE("img");

            emptyContainer("summonerSpell3");

            spell.setAttribute("id", window.sessionStorage.getItem("summonerSpell3")+"SpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/" + window.sessionStorage.getItem("summonerSpell3") + ".png";

            $("summonerSpell3").appendChild(spell);
       }
       
       if(window.sessionStorage.getItem("summonerSpell4"))
       {
            var spell = createE("img");

            emptyContainer("summonerSpell4");

            spell.setAttribute("id", window.sessionStorage.getItem("summonerSpell4")+"SpellUsed");
            spell.setAttribute("class", "spell");
            spell.src = "RES/IMG/summonerSpells/" + window.sessionStorage.getItem("summonerSpell4") + ".png";

            $("summonerSpell4").appendChild(spell);
       }
        if(window.sessionStorage.getItem("skillPrio"))
        { 
            printAbilityPrio();
        }
        // neu laden der itemslots 
        for(var i = 0; i < 4; i++)
        {
            var prefix;
            switch(i)
            {
                case 0:
                    prefix = "early";
                    break;
                case 1:
                    prefix = "mid";
                    break;
                case 2:
                    prefix = "late";
                    break;
                case 3:
                    prefix = "altLate";
                    break;
                default:
                    console.log("das hätte nicht passieren duerfen--- pageReload");
            }
            for(var j = 1; j <= 7; j++)
            {
                if(window.sessionStorage.getItem("item" + j + prefix))
                {
                    var selectedItemContainer = $("item" + j + prefix);
       
                    var selectedItem = createE("div");
                    selectedItem.setAttribute("class", "s-" + window.sessionStorage.getItem( "item" + j + prefix));
                    //selectedItem.addEventListener("mouseover", spawnTooltip, false);

                   selectedItemContainer.appendChild(selectedItem);
                }
            }
        }
        if(window.sessionStorage.getItem("item1early"))
        {
            
        }

   }
   function displayItems()
   {
        var items = JSON.parse(ajax.response)["data"];
        var iContentWrapper = $("iContentWrapper");
        emptyContainer("iContentWrapper");
            
        for(var item in items)
        {
            if(!(itemAlreadyInUse((window.sessionStorage.getItem("selectedItemContainer")).substring(5), item)))
            {
                var itemContainer = createE("div");
                itemContainer.setAttribute("id", item);
                itemContainer.setAttribute("class", "item s-" + item);
                itemContainer.addEventListener("click", handleUserActions, false);
                //itemContainer.addEventListener("mouseover", spawnTooltip, false);
                iContentWrapper.appendChild(itemContainer);
            }
        }
        buildContent("iContentWrapper", "closeInteractiveContent");
   };
   function selectItem()
   {
       var item = JSON.parse(ajax.response);
       
       var itemID = item["id"];
       
       var selectedItemContainer = $(window.sessionStorage.getItem("selectedItemContainer"));
       
       var selectedItem = createE("div");
       selectedItem.setAttribute("class", "s-" + itemID);
       //selectedItem.addEventListener("mouseover", spawnTooltip, false);
       
       emptyContainer(window.sessionStorage.getItem("selectedItemContainer"));
       selectedItemContainer.appendChild(selectedItem);
       
       window.sessionStorage.setItem((selectedItemContainer.getAttribute("id")), itemID);
   };
   function spawnTooltip(e)
   {
       ajax = new AJAX("", "printTooltip");
       ajax.makeGetRequest("./Php/handleRequests.php?getStaticData=specificItem&itemID=" + (e.target.getAttribute("class")).substring(2));
       buildContent("tooltipContainer", "loadAnimation");   
       toggleVisibility("tooltipContainer");
       ajax.waitForContent();
   }
   function printTooltip()
   {
       var item = JSON.parse(ajax.response);
       var tooltipContainer = $("tooltipContainer");
       var itemName = createE("h2");
       var baseGold = createE("p");
       var totalGold = createE("p");
       var sellPrice = createE("p");
       var stats = createE("p");
       var discription = createE("p");
       
       itemName.innerHTML = item["name"];
       
       tooltipContainer.appendChild(itemName);
   }
   function itemAlreadyInUse(gamePhase,itemID)
   {
       for(var i = 0; i <= 7;i++)
       {
           if(window.sessionStorage.getItem("item" + i + gamePhase) === itemID)
           {
               return true;
           }
       }
       return false;
   }
});
//_________________________________________NEU______________________________________________

