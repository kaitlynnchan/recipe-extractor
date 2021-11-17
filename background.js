console.log("background running");

/**
 * sending messages from background to content
 * use browser action
 */

// requirement: no popup.html
// chrome.browserAction.onClicked.addListener(function(tab) {
//     let url = tab.url;
//     console.log("browser clicked");
//     chrome.tabs.sendMessage(tab.id, url);
// });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    if(message.action == 'run_background'){
        // sends tabs information to extractor
        chrome.tabs.query({active: true}, function(tabs){
            console.log(tabs)
            chrome.tabs.sendMessage(tabs[0].id, {action: "run_extractor", url: tabs[0].url});  
        });
        console.log("background received message");
    }
});