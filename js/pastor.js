/*!
 *  v0.1 protection against duplication of expansion
 */
 
/* Functions */
window.isset = function(e,tt,tt1){ var t = []; if(typeof tt != 'undefined'){ t[t.length] = tt; } if(typeof tt1 != 'undefined'){ t[t.length] = tt1; } var type = typeof e; if(type != 'undefined' && e != null){ if(t.length>0){ for(var j=0;j<t.length;j++){ if(e.length<=0 && ((type == 'string' && t[j] == 'string') || (type == 'object' && t[j] == 'array'))){ return false; } } } return true; }else{ return false; } return 0; }


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (window[request.func] != undefined){
      sendResponse({[request.func]: window[request.func](sender.tab.id, request.data),tabid:sender.tab.id});
	}
});

  
