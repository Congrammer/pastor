document.addEventListener('DOMContentLoaded', function(){
if(window.top != window.window){return;}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function listener(event) {
    if (!IsJsonString(event.data))
	{
		
        if (event.data.func == null || event.data.func == undefined) 
		{
            return;
        }
    try{
        chrome.runtime.sendMessage(
		{
            func: event.data.func,
            data: event.data.data
        }, function(response) 
		{
        });
    }catch(e){
        
    }

    }

}

if (window.addEventListener) 
{
    window.addEventListener("message", listener);
}
 else 
{
    window.attachEvent("onmessage", listener);
}
		
});
