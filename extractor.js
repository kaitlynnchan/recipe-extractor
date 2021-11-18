/** Following tutorial: https://www.linkedin.com/pulse/scraping-recipe-websites-ben-awad */

console.log("extractor running");
chrome.runtime.onMessage.addListener(MessageHandler);

function MessageHandler(message, sender, sendResponse){
    if(message.action == 'run_extractor'){
        // gets tab url from background
        console.log("running extractor");
        console.log(message.url);
        $.ajax({
            type: "GET",
            url: message.url,
            dataType: "html",
            success: function(data){
                console.log($(data));
                var scriptStr = $("script[type='application/ld+json']").text();
                if(scriptStr && getFromldJSON(scriptStr) == 0){
                    console.log("information found");
                }
            },
            error: function(error){
                console.log("ERROR: " + error);
            }
        });
        
        console.log("extractor received message from background");
    }
}

function getFromldJSON(scriptStr) {
    var recipeIndx = scriptStr.indexOf('"@type":"Recipe"');
    if(recipeIndx == -1){
        console.log("ls+json recipe not found");
        return -1;
    }
    var prevBracket = getPrevBraketIndex(scriptStr, recipeIndx);
    var nextBracket = getNextBraketIndex(scriptStr, recipeIndx);
    var recipeStr = scriptStr.substring(prevBracket, nextBracket + 1);
    var recipe = JSON.parse(recipeStr);
    if (recipe.name) {
        chrome.runtime.sendMessage({ action: "add_name", name: recipe.name });
    }
    if (recipe.recipeYield) {
        chrome.runtime.sendMessage({ action: "add_recipeYield", recipeYield: recipe.recipeYield });
    }
    if (recipe.prepTime) {
        chrome.runtime.sendMessage({ action: "add_prepTime", prepTime: recipe.prepTime });
    }
    if (recipe.cookTime) {
        chrome.runtime.sendMessage({ action: "add_cookTime", cookTime: recipe.cookTime });
    }
    if (recipe.totalTime) {
        chrome.runtime.sendMessage({ action: "add_totalTime", totalTime: recipe.totalTime });
    }
    if (recipe.recipeIngredient) {
        chrome.runtime.sendMessage({ action: "add_ingredients", ingredients: recipe.recipeIngredient });
    }
    if (recipe.recipeInstructions) {
        chrome.runtime.sendMessage({ action: "add_instructions", instructions: recipe.recipeInstructions });
    }
    return 0;
}

function getPrevBraketIndex(str, startIndex) {
    let numCloseBracket = 0;
    for(let i = startIndex; i >= 0; i--){
        if(str[i] == '{'){
            if(numCloseBracket > 0){
                numCloseBracket--;
            } else {
                return i;
            }
        } else if (str[i] == '}'){
            numCloseBracket++;
        }
    }
    return -1;
}

function getNextBraketIndex(str, startIndex) {
    let numOpenBracket = 0;
    for(let i = startIndex; i < str.length; i++){
        if(str[i] == '}'){
            if(numOpenBracket > 0){
                numOpenBracket--;
            } else {
                return i;
            }
        } else if (str[i] == '{'){
            numOpenBracket++;
        }
    }
    return -1;
}

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