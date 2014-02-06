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

function distance(coordinates1, coordinates2) {
    var distanceCoordinates = {
        x: coordinates2.x - coordinates1.x, 
        y: coordinates2.y - coordinates1.y
    };
    return distanceCoordinates;
}

function maximizeMenuSize(element) {
    //Full 100% is a bit off for some reason...
    //85% works well, might go to 80% because of pathLines
    var maxSizeAllowed = getMaxSizeAllowed();//*.85;
    
    element.width(maxSizeAllowed);
    element.height(maxSizeAllowed);
}

function generateAndPlaceWrappers(menu) {
    var maxSizeAllowed = getMaxSizeAllowed();

    var wrappers, rotatedCoordinates, menuItem, wrapper, distanceToOrigin, menuItemCoordinates;

    var originCoordinates = {
        x: menu.width() / 2 + menu.offset().left,
        y: menu.height() / 2 + menu.offset().top
    };    
    for (var i = 1; i < 4; i++) {

        //Grab all wrapper elements
        wrappers = menu.find(".wrapper" + i);

        wrappers.each(function (){
            
            wrapper = $(this); 
            // wrapper.width(menu.width()/2);
            // wrapper.height(menu.height()/2);
            
            //Placement requires jQuery,
            //But initial rotation can be handled by CSS since it will never change based on screen size
            
            //Maybe find a better way to do this individual class naming (int i -> word? eh)
            menuItem = wrapper.find('.menuItem');            
            // menuItem.width(wrapper.width()/6);
            // menuItem.height(wrapper.height()/6);

            //Move menuItem for each wrapper on rightHandSide of wrapper
            var boxShadowSize = maxSizeAllowed/30;
            var bottomBorderRadius = 10.0 / 52 * menuItem.width();
            menuItem.css({
                // "marginTop": wrapper.height()/2 - menuItem.height()/2,
                // "marginLeft": wrapper.width() - menuItem.width()/2,
                // "border-radius": "0 " + maxSizeAllowed/20 + "px " + 0 + "px " + maxSizeAllowed/20 + "px"
                // "border-radius": "0 " + maxSizeAllowed/20 + "px " + bottomBorderRadius + "px " + maxSizeAllowed/20 + "px"
                // "box-shadow": "0px 0px " + boxShadowSize + "px " + boxShadowSize/6 + "px #00FF00"
            });

            menuItemCoordinates = {
                x: menuItem.offset().left,
                y: menuItem.offset().top
            };
            distanceToOrigin = distance(menuItemCoordinates, originCoordinates);

            wrapper.css({
                // "marginTop": distanceToOrigin.y,
                // "marginLeft": distanceToOrigin.x
            });
        });
    }
}



var menu = $('#menu');

// Doing via css, don't need
// maximizeMenuSize(menu);
generateAndPlaceWrappers(menu);