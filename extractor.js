/** Following tutorial: https://www.linkedin.com/pulse/scraping-recipe-websites-ben-awad */

console.log("extractor running");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    if(message.action == 'run_extractor'){
        // gets tab url from background
        console.log("running extractor");
        $.ajax({
            type: "GET",
            url: message.url,
            dataType: "html",
            success: function(data){
                console.log($(data));
                // var scriptElements = $("script[type='application/ld+json']");
                var scriptStr = $("script[type='application/ld+json']").text();
                var recipeIndx = scriptStr.indexOf('"@type":"Recipe"');
                var prevBracket = getPrevBraketIndex(scriptStr, recipeIndx);
                var nextBracket = getNextBraketIndex(scriptStr, recipeIndx);
                var recipeStr = scriptStr.substring(prevBracket, nextBracket + 1);
                var recipe = JSON.parse(recipeStr);
                console.log(recipe);

                // var recipeIngredientIndx = scriptStr.indexOf("recipeIngredient");
                if(recipe.recipeIngredient){
                    chrome.runtime.sendMessage({ action: "add_ingredients", ingredients: recipe.recipeIngredient });
                }
                if(recipe.recipeInstructions){
                    chrome.runtime.sendMessage({ action: "add_instructions", ingredients: recipe.recipeInstructions });
                }
                // var recipeInstructionsIndx = scriptStr.indexOf("recipeInstructions");
                // if(recipeInstructionsIndx != -1){
                //     getIngredients(scriptStr, recipeInstructionsIndx);
                // }
                // var scriptJson = JSON.parse( $("script[type='application/ld+json']").text() );
                // var recipeIngredients = scriptJson.graph.recipeIngredient;
                // console.log(scriptJson);
                // console.log(scriptJson.recipeIngredient);
                // var jsonld = $(scriptElements).find("")
            },
            error: function(error){
                console.log(error);
            }
        });
        
        console.log("extractor received message from background");
    }
});


function getIngredients(scriptStr, recipeIngredientIndx) {
    var prevBracket = getPrevBraketIndex(scriptStr, recipeIngredientIndx);
    var nextBracket = getNextBraketIndex(scriptStr, recipeIngredientIndx);
    var newScript = scriptStr.substring(prevBracket, nextBracket + 1);
    var json = JSON.parse(newScript);
    var recipeIngredient = json.recipeIngredient;
    console.log(recipeIngredient);

    chrome.runtime.sendMessage({ action: "add_ingredients", ingredients: recipeIngredient });
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