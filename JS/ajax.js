
function AJAX(origin, callback)
{
    var that = this;
    var xmlhttpRequest = new XMLHttpRequest();
    this.response;
    this.ready = false;
    
    xmlhttpRequest.onreadystatechange = function() 
    {
        if(xmlhttpRequest.readyState === 4 && xmlhttpRequest.status === 200)
        {
            that.response = xmlhttpRequest.responseText;
            that.ready = true;
        }
    };
    
    this.makePostRequest = function(data)
    {
        xmlhttpRequest.open("post", data, true);
        xmlhttpRequest.send();
        this.ready = false;
    };
    
    this.makeGetRequest = function(url)
    {
        xmlhttpRequest.open("get", url, true);
        xmlhttpRequest.send();
        this.ready = false;
    };
    
    this.printResponse = function()
    {
        //$(origin).innerHTML = this.response;
        console.log(this.response);
    };
  
  this.waitForContent = function()
  {
    // Hier wird mit setTimeout immer wieder versucht der angeforderte Inhalt darzustellen 
    // wenn Inhalte nicht verfügbar sind wird eine lade animation angezeigt
    
    var pollProgress = setInterval(function(){
        
        if(!(that.ready))
        {
            console.log("Noch nicht rdy");
        }
        else
        {  
            clearInterval(pollProgress);
                //that.printResponse();
                return callback();
        }
    }, 500);
  };
}