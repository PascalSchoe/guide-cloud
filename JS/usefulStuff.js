function $(id)
{
    return document.getElementById(id);
}


/*
 * wechselt die Sichtbarkeit des "element"'s
 * @param {string} element
 * @returns {undefined}
 */
function toggleVisibility(element)
{
    var thisElement = $(element);
    
    if(thisElement.getAttribute("class") === "show")
    {
        thisElement.setAttribute("class", "hide");
    }
    else if(thisElement.getAttribute("class") === "hide")
    {
        thisElement.setAttribute("class", "show");
    }
}

/*
 * erzeugt htmlelemente vom typ "element"
 */
function createE(element)
{
    return document.createElement(element);
}

/**
 * löscht alle Kindknoten aus dem übergebenen element
 * @param {String} element
 * @returns {undefined}
 */
function emptyContainer(element)
{
   while($(element).hasChildNodes())
   {
       $(element).removeChild($(element).firstChild);
   }
}

function findXWithinString(bString,sString)
{
    var indices =[];
    
    var counter =0;
    
    var baseString = bString.toString();
    var searchString = sString.toString();
    var subString; 
    
    var nextStep = 0;
    
    var lengthOfSearchString = searchString.length;
    
    subString = baseString;
    // sucht so lange innerhalb des basisStrings nach dem suchString bis der aktulle subString < als suchString ist
    do
    {
        if(subString.indexOf(searchString) !== -1)
        {
            indices[counter] = baseString.indexOf(searchString, nextStep);
            subString = subString.substring(subString.indexOf(searchString)+lengthOfSearchString);
            counter++;
            nextStep = baseString.indexOf(searchString, nextStep)+lengthOfSearchString;
        }
        else
        {
            if(indices.length === 0)
                return false;
            else
               return indices; 
        }
    }while(subString.length >= lengthOfSearchString)
    
    return indices;
}