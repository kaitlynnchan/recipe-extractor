/** Following tutorial: https://www.linkedin.com/pulse/scraping-recipe-websites-ben-awad */

import fetch from 'node-fetch';

function extractHtml(html){
    var tempHtml = document.createElement("div");
    tempHtml.innerHTML = html;
    var jsonld = tempHtml.getElementsByTagName("script");
    return jsonld;
}


var url = "https://www.seasonsandsuppers.ca/soft-cheese-bread-recipe/#wprm-recipe-container-20224";
const html = await fetch(url).then(x => x.text());

console.log(extractHtml(html));