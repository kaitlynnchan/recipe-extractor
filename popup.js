
/**
 * sending messages from popup to content
 */

// run background script
window.onload = function(){
    var calculateBtn = document.getElementsByClassName("calculate");
    calculateBtn[0].addEventListener("click", function(){
        console.log("clicked");

        // popup send message to background to run
        chrome.runtime.sendMessage({action:"run_background"});
        
        // chrome.tabs.query({active: true}, function(tabs){
        //     console.log(tabs[0].url);
        //     var html = getHtmlText(tabs[0].url);
        //     console.log(html);
        // });
    });
};
