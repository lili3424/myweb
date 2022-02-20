function httpGet(index, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "./config.cgi?"+index, true );
    xmlHttp.setRequestHeader("If-Modified-Since","0"); 
    xmlHttp.send();
    xmlHttp.onreadystatechange=function()
    {
        //get request ready
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            keyList.length = 0;
            valList.length = 0;
            callback(xmlHttp.responseText);
        }
    }
}
function xmlHttpPost(str)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", "./config.cgi", true ); 
//  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("If-Modified-Since","0"); 
    xmlHttp.send(str);
    xmlHttp.onreadystatechange=function()
    {
        //get request ready
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            //alert(xmlHttp.responseText);
        }
    }
}