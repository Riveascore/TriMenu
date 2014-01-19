function toRadians(degrees) {
    return 2 * Math.PI * degrees / 360;
}

function rotateToTranslateCoordinates(originalCoordinates, radius, rotationAmount) {
    //Convert to radians
    rotationAmount = toRadians(rotationAmount);

    var hypotenuse = Math.sqrt(2 * Math.pow(radius, 2) * (1 - Math.cos(rotationAmount)));
    
    var yFinal = radius * Math.sin(rotationAmount);
    var xFinal = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(yFinal, 2));   

    // Return object literal with coordinates
    return {
        x: originalCoordinates.x + xFinal,
        y: originalCoordinates.y + yFinal
    };

}
//THIS IS FUCKED UP, FIX IT, FIND SOMEONE TO TALK TO ABOUT THIS!!!
function coordinatesForAngledPathPlacement(menuItem, rotationAmount) {

    var radius = menuItem.css("border-top-right-radius").replace(/px/, '');
    
    // var turnAmount = toRadians(45); //This will always be 45deg because of the way I want it
    // var pathLineAngle = toRadians(45);
    //MAY NEED TO DO $(menuItem).css() etc

    var menuItemDiagonal = Math.sqrt(2) * menuItem.width() / 2;
    var seedHeight = Math.pow(radius, 2) - Math.pow(menuItemDiagonal, 2);

    // var hiddeousInnards1 = toRadians(45) - 2 * (pathLineAngle + turnAmount);
    
    // var hiddeousInnards2 = Math.asin(seedHeight * Math.sqrt(2) / (2 * radius)) + turnAmount;
    // var hiddeousInnards3 = Math.atan(menuItemDiagonal/(radius - seedHeight / 2));

    // var finalInnards = hiddeousInnards1 - hiddeousInnards2 - hiddeousInnards3;
    // menuItem.text(menuItem.attr('class'));
    var rotationAmount = 30 - rotationAmount;
    var beta = Math.sqrt(Math.pow(seedHeight, 2) + Math.pow(radius, 2) + 2 * seedHeight * radius * Math.cos(toRadians(rotationAmount)));
    var alpha = Math.pow(menuItemDiagonal, 2) / beta;

    // menuItem.text(menuItemDiagonal + "\n" + radius);
    // var xFinal = radius * Math.sin(finalInnards);
    // var yFinal = radius - radius * Math.cos(finalInnards);
    var xFinal = alpha * Math.sin(toRadians(30));
    var yFinal = alpha * Math.cos(toRadians(30));
    // menuItem.text(radius + "\n" + menuItemDiagonal);
    return {
        x: xFinal,
        y: yFinal
    };
}

function distance(coordinates1, coordinates2) {
    var distanceCoordinates = {
        x: coordinates2.x - coordinates1.x, 
        y: coordinates2.y - coordinates1.y
    };
    return distanceCoordinates;
}

function getMaxSizeAllowed() {
    return Math.min(screen.availWidth, screen.availHeight);
}

function maximizeMenuSize(element) {
    //Full 100% is a bit off for some reason...
    //85% works well, might go to 80% because of pathLines
    var maxSizeAllowed = getMaxSizeAllowed()*.85;
    
    element.width(maxSizeAllowed);
    element.height(maxSizeAllowed);
}

function generateAndPlaceWrappers(menu) {
    var maxSizeAllowed = getMaxSizeAllowed();
    var helperCoordinates = {
        x: menu.offset().left + menu.width(),
        y: menu.offset().top + menu.height()/2
    };

    var wrappers, helperToPointRotate, rotatedCoordinates, menuItem, wrapper, distanceToOrigin, menuItemCoordinates;

    // var originCoordinates = {
    //     x: menu.width() / 2,
    //     y: menu.height() / 2
    // };
    //Try with potition and offset THIS WORKED, YES!!!
    var originCoordinates = {
        x: menu.width() / 2 + menu.offset().left,
        y: menu.height() / 2 + menu.offset().top
    };    
    for (var i = 1; i < 4; i++) {
        //TODO MAKE EVERYTHING BASED ON ORIGINAL maxAllowedSize VALUE
        //SO YOU DON'T HAVE TO CALCULATE AS MUCH!!!

        //Grab all wrapper elements
        wrappers = menu.find(".wrapper" + i);

        wrappers.each(function (){
            
            wrapper = $(this); 
            wrapper.width(menu.width()/2);
            wrapper.height(menu.height()/2);
            helperToPointRotate = 90 + 120*i;
            
            //Placement requires jQuery,
            //But initial rotation can be handled by CSS since it will never change based on screen size
            
            //Maybe find a better way to do this individual class naming (int i -> word? eh)
            menuItem = wrapper.find('.menuItem');            
            menuItem.width(wrapper.width()/6);
            menuItem.height(wrapper.height()/6);
            
            //TODO!!! FIX THIS LATER TO MAKE BETTER!
            var item = menuItem.find('.item');
            item.width(menuItem.width()*3/4).height(menuItem.height()*3/4);
            item.css({
                "marginTop": menuItem.height()/2 - item.height()/2,
                "marginLeft": menuItem.width()/2 - item.width()/2
            });
            //TODO!!! FIX THIS LATER TO MAKE BETTER!

            //Move menuItem for each wrapper on rightHandSide of wrapper
            var boxShadowSize = maxSizeAllowed/30;
            menuItem.css({
                "marginTop": wrapper.height()/2 - menuItem.height()/2,
                "marginLeft": wrapper.width() - menuItem.width()/2,
                // "border-radius": "0 " + maxSizeAllowed/20 + "px 10px " + maxSizeAllowed/20 + "px",
                "border-radius": "0 " + maxSizeAllowed/20 + "px 10px " + maxSizeAllowed/20 + "px",
                "box-shadow": "0px 0px " + boxShadowSize + "px " + boxShadowSize/6 + "px #00FF00"
            });

            menuItemCoordinates = {
                x: menuItem.offset().left,
                y: menuItem.offset().top
            };
            distanceToOrigin = distance(menuItemCoordinates, originCoordinates);

            wrapper.css({
                "marginTop": distanceToOrigin.y,
                "marginLeft": distanceToOrigin.x
            });
        });
    }
    var menuButton = menu.find(".menuButton");
    menuButton.width(menu.width()/8);
    menuButton.height(menu.height()/8);
    menuButton.offset({
        top: wrapper.offset().top,
        left: wrapper.offset().left
    });
}



var menu = $('#menu');

maximizeMenuSize(menu);
generateAndPlaceWrappers(menu);

function readyTrapazoidOutline(element){
    var menuItem = element.find('.menuItem');
    var pathFromItemToText = element.find('.pathFromItemToText');
    var angledLine = element.find('.angledLine');
    var straightLine = element.find('.straightLine');
    var angledInner = element.find('.angledInner');
    var straightPath = element.find('.straightPath');

    var maxSizeForLine = getMaxSizeAllowed()/6;
    var lineHeight = maxSizeForLine/70;

    straightLine.width(maxSizeForLine).height(lineHeight);
    angledLine.width(maxSizeForLine/2).height(lineHeight);
    angledInner.width(maxSizeForLine/2).height(lineHeight);

    var sizeFromAngleChange = Math.sin(toRadians(45)) * (maxSizeForLine/2 + lineHeight);

    /* Setup size/orientation for straight lines */
    var straightPathWidth = maxSizeForLine + sizeFromAngleChange;
    straightPath.width(straightPathWidth).height(lineHeight);

    /* Setup size/orientation for bent lines */
    pathFromItemToText.width(straightLine.width() + sizeFromAngleChange);
    pathFromItemToText.height(sizeFromAngleChange);  

    var moveMarginBasedOnRotate = sizeFromAngleChange - angledLine.width();    
    straightLine.css({
      "margin-left": moveMarginBasedOnRotate,
      "left": angledLine.width()
    });
    angledLine.css({
      "margin-left": moveMarginBasedOnRotate
    });  

    movePathsToProperSpots(pathFromItemToText, menuItem);
}

function movePathsToProperSpots(pathArray, menuItem) {
    var pathObject;
    for(var i = 0; i < pathArray.length; i++) {
        pathObject = $(pathArray[i]);

        if(pathObject.hasClass('corner')) {
            pathObject.css({
                "top": menuItem.height() - pathObject.height() + 10,
                "left": menuItem.width() + 5
            });
        }
        else {
            pathObject.css({
                "top": - pathObject.height() + 5,
                "left": menuItem.width() - 5
            });
        }
    }
}

// readyTrapazoidOutline($('.wrapper2'));
readyTrapazoidOutline($('.wrapper3'));
// readyTrapazoidOutline($('.wrapper1'));

//Testing out funciton on redDots
var menuItems = $('.menuItem');
var redDotCoordinates, redDot, menuItem, rotationAmount;
rotationAmount = 180;
menuItems.each(function (){
    
    menuItem = $(this); 
    redDot = menuItem.find('.redDot');
    if(redDot.length > 0) {
        // 234-242 == OLD NEWS!
        // rotationAmount += 60;
        // redDotCoordinates = coordinatesForAngledPathPlacement(menuItem, rotationAmount);

        // // menuItem.text(redDotCoordinates.y);
        // redDot.css({
        //     "margin-top": redDotCoordinates.y,
        //     "margin-left": redDotCoordinates.x
        // });
        
        //Get rotation amount from parent
        var className = menuItem.parent()[0].className;

        var parentRotationAmount = className.replace(/(.*)(rotate)(\d*)/, "$3");
        // alert(parentRotationAmount);
        var fullRotationAmount = parentRotationAmount - 30;


        var borderRadius = menuItem.css("border-radius").split(" ")[1];
        borderRadius = borderRadius.replace(/(.*)px/, "$1");
        var yShift = menuItem.width() - borderRadius;
        redDot.css({
            "margin-top": yShift
        });

        var redDotMarginCoordinates = {
            x: 0,
            y: yShift
        };
        var newRedDotCoordinates = rotateToTranslateCoordinates(redDotMarginCoordinates, borderRadius, fullRotationAmount);
        redDot.css({
            "margin-top": newRedDotCoordinates.y,
            "margin-left": newRedDotCoordinates.x
        })
    }
});