console.log('Extension is activated');

/**
 *  receiving messages
 */
// chrome.runtime.onMessage.addListener( function(message, sender, sendResponse){
//     if(message.action == 'run_content'){
//         console.log(message.url);
//     }
//     console.log("content received message");
// });