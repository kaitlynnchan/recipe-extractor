/** Following tutorial: https://www.linkedin.com/pulse/scraping-recipe-websites-ben-awad */

console.log("extractor running");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    if(message.action == 'run_extractor'){
        // gets tab url from background
        console.log(message.url);
        $("script").load(message.url);
        console.log("extractor received message from background");
    }
});

// $(document).ready(function(){
    
// });

// async function getHtmlText(url){
//     const html = await fetch(url).then(x => x.text());
//     return html;
// }

// function extractHtml(html){
//     var tempHtml = document.createElement("div");
//     tempHtml.innerHTML = html;
//     var jsonld = tempHtml.getElementsByTagName("script");
//     return jsonld;
// }


// var url = "https://www.seasonsandsuppers.ca/soft-cheese-bread-recipe/#wprm-recipe-container-20224";
// const html = await fetch(url).then(x => x.text());

// console.log(extractHtml(html));