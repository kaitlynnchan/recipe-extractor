
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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    if(message.action == 'add_name'){
        $(".recipe .name").css("display", "inline-block");
        $(".recipe .name").append("<h1>" + message.name + "</h1>");
    }

    if(message.action == 'add_recipeYield'){
        var recipeYield = message.recipeYield;
        if(recipeYield){
            $(".recipe .recipeYield").css("display", "inline-block");
            $(".recipe .recipeYield").parent().css("display", "flex");
            $(".recipe .recipeYield").append("<p>" + recipeYield + "</p>");
        }
    }

    if(message.action == 'add_prepTime'){
        var prepTime = message.prepTime;
        if(prepTime){
            $(".recipe .prepTime").css("display", "inline-block");
            $(".recipe .prepTime").append("<p>" + prepTime + "</p>");
        }
    }

    if(message.action == 'add_cookTime'){
        var cookTime = message.cookTime;
        if(cookTime){
            $(".recipe .cookTime").css("display", "inline-block");
            $(".recipe .cookTime").append("<p>" + cookTime + "</p>");
        }
    }
    if(message.action == 'add_totalTime'){
        var totalTime = message.totalTime;
        if(totalTime){
            $(".recipe .totalTime").css("display", "inline-block");
            $(".recipe .totalTime").append("<p>" + totalTime + "</p>");
        }
    }

    if(message.action == 'add_ingredients'){
        var ingredients = message.ingredients;
        $.each(ingredients, function(key, value){
            console.log(value);
            $(".recipe .ingredients").css("display", "inline-block");
            $(".recipe .ingredients ul").append("<li>" + value + "</li>");
        });
    }

    if(message.action == 'add_instructions'){
        var instructions = message.instructions;
        $.each(instructions, function(key, value){
            console.log("instruction: ");
            console.log(value);
            var instruction = value.text;
            // if(value.length > 1){
            //     instruction = value.text;
            // }
            $(".recipe .instructions").css("display", "inline-block");
            $(".recipe .instructions ul").append("<li>" + instruction + "</li>");
        });
    }
});