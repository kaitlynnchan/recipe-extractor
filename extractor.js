/** Following tutorial: https://www.linkedin.com/pulse/scraping-recipe-websites-ben-awad */

import fetch from 'node-fetch';

var url = "https://www.seasonsandsuppers.ca/soft-cheese-bread-recipe/#wprm-recipe-container-20224";
const html = await fetch(url).then(x => x.text());

console.log(html);