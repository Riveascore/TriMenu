function rotateToTranslateCoordinates(originalCoordinates, radius, rotationAmount) {
    //Convert to radians
    rotationAmount = 2 * Math.PI * rotationAmount / 360;

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
    var maxSizeAllowed = Math.min(screen.availWidth, screen.availHeight);
    
    element.width(maxSizeAllowed);
    element.height(maxSizeAllowed);
}

function generateAndPlaceWrappers(menu) {
    var helperCoordinates = {
        x: menu.offset().left + menu.width(),
        y: menu.offset().top + menu.height()/2
    };

    var wrappers, helperToPointRotate, rotatedCoordinates, menuItem, wrapper, distanceToOrigin, menuItemCoordinates;

    var originCoordinates = {
        x: menu.width() / 2,
        y: menu.height() / 2
    };
    for (var i = 1; i < 4; i++) {
        //Grab all wrapper elements
        wrappers = menu.find(".wrapper" + i);

        wrappers.each(function (){
            
            wrapper = $(this); 
            wrapper.width(menu.width()/2);
            wrapper.height(menu.height()/2);
            helperToPointRotate = 90 + 120*i;

            //rotatedCoordinates = rotateToTranslateCoordinates(helperCoordinates, menu.width()/2, helperToPointRotate);
            
            // distanceToOrigin = distance()
            //Placement requires jQuery,
            //But initial rotation can be handled by CSS since it will never change based on screen size
            
            //Maybe find a better way to do this individual class naming (int i -> word? eh)
            menuItem = wrapper.find('.menuItem');
            menuItem.width(wrapper.width()/6);
            menuItem.height(wrapper.height()/6);

            //Move menuItem for each wrapper on rightHandSide of wrapper
            menuItem.css({
                "marginTop": wrapper.height()/2 - menuItem.height()/2,
                "marginLeft": wrapper.width() - menuItem.width()/2
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
var trapzoidHolder = $('.wrapper3');

maximizeMenuSize(menu);
generateAndPlaceWrappers(menu);
readyTrapazoidOutline(trapzoidHolder);

function readyTrapazoidOutline(element){
    var trapezoid = element.find('.rightTrapezoid');
    var menuItem = element.find('.menuItem');

    var maxSizeAllowed = Math.min(screen.availWidth, screen.availHeight)/3;

    var trapzoidWidth = maxSizeAllowed/3;
    var borderBottom = maxSizeAllowed/5;
    var borderRight = maxSizeAllowed/5;

    $(trapezoid).css({
        "border-bottom": borderBottom + "px solid red",
        "border-right": "0 solid transparent",
        "border-left": borderRight + "px solid transparent",
        "height": "0",
        "width": trapzoidWidth + "px",
        // "left": $(menuItem).css('width'),
        // "-webkit-transform": "rotateZ(-60deg) rotateX(180deg)"
    });

    var outlineMaker = $(trapezoid).find('.outlineMaker');

    $(outlineMaker).css({
        "border-bottom": borderBottom*.95 + "px solid white",
        "border-right": "0 solid transparent",
        "border-left": borderRight*.95 + "px solid transparent",
        "height": borderRight*.1 + "px",
        "width": trapzoidWidth*.95 + "px"
    });

    //Now get 
}