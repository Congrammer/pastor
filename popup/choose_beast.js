
function beastNameToURL(beastName) {
  switch (beastName) {
    case "Frog":
      return chrome.extension.getURL("beasts/frog.jpg");
    case "Snake":
      return chrome.extension.getURL("beasts/snake.jpg");
    case "Turtle":
      return chrome.extension.getURL("beasts/turtle.jpg");
  }
}


document.addEventListener("click", (e) => {

chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabArray) {
    var tabURL = tabArray[0].url;
    var chosenBeast = e.target.textContent;
    var chosenBeastURL = beastNameToURL(chosenBeast);
    console.log(tabArray);
      chrome.tabs.sendMessage(tabArray[0].id, {favIconUrl: tabArray[0].favIconUrl});
	  chrome.tabs.discard(tabArray[0].id)
      chrome.extension.sendMessage({to:"background", relTabID:tabArray[0].id, title:tabArray[0].title, favIconUrl:tabArray[0].favIconUrl});
  
});
});
