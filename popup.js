
/**
 * sending messages from popup to content
 */

// run background script
window.onload = function(){
  var calculateBtn = document.getElementsByClassName("calculate");
  calculateBtn[0].addEventListener("click", function(){
    console.log("clicked");
    chrome.runtime.sendMessage({action:"run_background"});
  });
};
