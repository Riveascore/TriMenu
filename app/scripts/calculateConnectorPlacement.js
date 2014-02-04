var radii = [
    36.4, 51.67/2.0, 1
];

function angleToBaseAngle(inputAngle) {
    var numberOfFullRotations = Math.floor(inputAngle / 360.0);
    return inputAngle - (numberOfFullRotations * 360);
}

function getMaxSizeAllowed() {
    return Math.min(screen.availWidth, screen.availHeight);
}

var additionalRotations = [
    -90, -135, -180, 
    -225, -270, -270,
    0, -45, -90
    // 0,0,0,0,0,0,0,0,0
];
var rotationsIndex = 0;

var firstConnectorChild, secondConnectorChild;
var rotationAmount, placementCoordinates, connectorRotation;

$.each($(".menuItem"), function() {

    secondConnectorChild = $(this).find(".connector:nth-child(2)").first();
    if(secondConnectorChild.length != 0) {
        firstConnectorChild = $(this).find(".connector:nth-child(1)").first();
        secondConnectorChild.css({
            "margin-left": firstConnectorChild.width()
        });
    }
    // Get parent to obtain rotation amount needed for placing connector.
    rotationAmount = parseInt($(this).parent().attr('class').match(/rotate(\d*)/)[1]) - 30;
    placementCoordinates = calculateConnectorPlacement(rotationAmount, additionalRotations[rotationsIndex], radii);
    // alert(additionalRotations[rotationsIndex]);
    // alert(JSON.stringify(placementCoordinates));
    // connectorRotation = 360 - (rotationAmount + additionalRotations[rotationsIndex]);
    connectorRotation = rotationAmount + additionalRotations[rotationsIndex];
    // alert(connectorRotation);
    $(this).find(".connectorContainer").css({
        "margin": (placementCoordinates.y + radii[1]*2.0*0.44) + "px 0 0 " + (placementCoordinates.x + radii[1]) + "px",
        "-webkit-transform": "rotate(" + connectorRotation + "deg)"
    });
    rotationsIndex++;
});




// Try first 2 menu items (3rd is brown :( )
// alert(JSON.stringify(calculateConnectorPlacement(330, 0, radii)) + 
//     "\n\n" + JSON.stringify(calculateConnectorPlacement(270, 0, radii)));
/*
var firstCoords, secondCoords, thirdCoords;
firstCoords = calculateConnectorPlacement(270, 0, radii);
secondCoords = calculateConnectorPlacement(330, 0, radii);
thirdCoords = calculateConnectorPlacement(390, 0, radii);
// alert(JSON.stringify(thirdCoords));
// $(".menuItemWrapper.wrapper1.rotate300 .menuItem .testDot").css("margin", 
//     (radii[1]*2.0*0.44) + "px 0 0 " + (radii[1]*2.0*0.44) + "px");
// $(".menuItemWrapper.wrapper1.rotate360 .menuItem .testDot").css("margin", 
//     (radii[1]*2.0*0.44) + "px 0 0 " + (radii[1]*2.0*0.44) + "px");










$(".menuItemWrapper.wrapper1.rotate300 .menuItem .connector").css({
    "margin": (firstCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (firstCoords.x + radii[1]) + "px",
    "-webkit-transform": "rotate(" + 270 + "deg)"
});
$(".menuItemWrapper.wrapper1.rotate360 .menuItem .connector").css({
    "margin": (secondCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (secondCoords.x + radii[1]) + "px",
    "-webkit-transform": "rotate(" + 330 + "deg)"
});
$(".menuItemWrapper.wrapper1.rotate420 .menuItem .connector").css({
    "margin": (thirdCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (thirdCoords.x + radii[1]) + "px",
    "-webkit-transform": "rotate(" + 390 + "deg)"
});

firstCoords = calculateConnectorPlacement(30, -90, radii);
secondCoords = calculateConnectorPlacement(90, -90, radii);
thirdCoords = calculateConnectorPlacement(150, -90, radii);
$(".menuItemWrapper.wrapper2.rotate60 .menuItem .connector").css({
    "margin": (firstCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (firstCoords.x + radii[1]) + "px",
    "-webkit-transform": "rotate(" + 300 + "deg)"
});
$(".menuItemWrapper.wrapper2.rotate120 .menuItem .connector").css({
    "margin": (secondCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (secondCoords.x + radii[1]) + "px",
    "-webkit-transform": "rotate(" + 0 + "deg)"
});
$(".menuItemWrapper.wrapper2.rotate180 .menuItem .connector").css({
    "margin": (thirdCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (thirdCoords.x + radii[1]) + "px",
    "-webkit-transform": "rotate(" + 60 + "deg)"
});


firstCoords = calculateConnectorPlacement(30, -180, radii);
secondCoords = calculateConnectorPlacement(210, -180, radii);
thirdCoords = calculateConnectorPlacement(150, -180, radii);
// $(".menuItemWrapper.wrapper2.rotate60 .menuItem .connector").css({
//     "margin": (firstCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (firstCoords.x + radii[1]) + "px",
//     "-webkit-transform": "rotate(" + 300 + "deg)"
// });

// Define a base size for connector unit!, for now, LAZY, and 102
var bentConnector = $(".menuItemWrapper.wrapper3.rotate300 .menuItem .connectorBent .bentInner")

bentConnector.css({
    "width": 102 / Math.sin(Math.PI / 4) + "px",
    "height": "3px"
});
bentConnector.css({
    "margin-left": ((102 * 2.0 / 3.0) - bentConnector.width()) + "px"
});
$(".menuItemWrapper.wrapper3.rotate300 .menuItem .connectorBent .straightInner").css({
    "width": 102 * 2.0 / 3.0
});

$(".menuItemWrapper.wrapper3.rotate240 .menuItem .connector").css({
    "margin": (secondCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (secondCoords.x + radii[1]) + "px",
    "-webkit-transform": "rotate(" + 30 + "deg)"
});
*/




// $(".menuItemWrapper.wrapper2.rotate180 .menuItem .connector").css({
//     "margin": (thirdCoords.y + radii[1]*2.0*0.44) + "px 0 0 " + (thirdCoords.x + radii[1]) + "px",
//     "-webkit-transform": "rotate(" + 60 + "deg)"
// });

// alert(JSON.stringify(thirdCoords));
/* additionalAngle is for placing connector on a particular side,
by default, connector is placed on right side, 0 deg, you can choose to place 
the connector on top, or at a 45 deg angle for instance when using bent connectors */
function calculateConnectorPlacement(rawMenuItemAngle, additionalAngle, radii) {
    var radiusSideCircles = radii[0],
        radiusMenuItem = radii[1],
        radiusBottomCircle = radii[2];

    var finalPosition = {
        x: 0,
        y: 0,
        colorCase: "",
        menuItemAngle : rawMenuItemAngle,
        menuItem130: 0,
        bigCircle90: 0,
        miOriginToPositionMagnitude: 0
    }
    rawMenuItemAngle += additionalAngle;
    
    var baseAngle = angleToBaseAngle(rawMenuItemAngle);
    finalPosition.menuItem130 = angleToBaseAngle(-1 * (baseAngle -360));

    // alert(angleToBaseAngle(-1 * (baseAngle -360)));
    // ADD 110, THEN, convert to BASE ANGLE!!!

    // BLUE!
    if(baseAngle >= 250 || (baseAngle >= 0 && baseAngle <= 20)) {
        finalPosition.colorCase = "BLUE";

        // Convert to bigCircle90 format THIS IS WHAT WE USE!
        // var bigCircleAngle = (finalPosition.menuItem130 + 20) * 90 / 130;
        var bigCircleAngle = angleToBaseAngle(finalPosition.menuItem130 + 20) * 90 / 130;
        finalPosition.bigCircle90 = bigCircleAngle;

        //β BETA!
        var circleOriginToMenuItem = {
            x: radiusSideCircles - radiusMenuItem,
            y: radiusSideCircles - radiusMenuItem
        }
        var circleToEndPosition = {
            x: radiusSideCircles * Math.cos(bigCircleAngle * Math.PI / 180),
            y: radiusSideCircles * Math.sin(bigCircleAngle * Math.PI / 180)
        }

        finalPosition.x = circleToEndPosition.x - circleOriginToMenuItem.x;
        finalPosition.y = -1 * (circleToEndPosition.y - circleOriginToMenuItem.y);
    }

    // GREEN!
    if(baseAngle >= 201 && baseAngle <= 249) {
        var trueRadius;
        finalPosition.colorCase = "GREEN";
        var theta = (baseAngle - 90) * Math.PI / 180;
        
        if(baseAngle > 225) {
            finalPosition.y = -1.0 * radiusMenuItem;
            trueRadius = finalPosition.y / Math.cos(theta); 
            finalPosition.x = -1 * trueRadius * Math.sin(theta);
        }
        else {
            finalPosition.x = -radiusMenuItem;            
            trueRadius = finalPosition.x / Math.sin(theta);               
            finalPosition.y = -1 * trueRadius * Math.cos(theta);
        }
        
    }

    // YELLOW!
    if(baseAngle >= 70 && baseAngle <= 200) {
        // alert('yellow');
        finalPosition.colorCase = "YELLOW";



        //Conversion to 130 format must involve extra step.

        finalPosition.menuItem130 = 360 - baseAngle - 50 - 130;
        // finalPosition.menuItem130 = angleToBaseAngle(-1 * (baseAngle -360));
        // Convert to bigCircle90 format THIS IS WHAT WE USE!
        // var bigCircleAngle = (finalPosition.menuItem130 + 20) * 90 / 130;
        var bigCircleAngle = angleToBaseAngle(finalPosition.menuItem130 + 20) * 90 / 130;
        finalPosition.bigCircle90 = bigCircleAngle;

        //β BETA!
        var circleOriginToMenuItem = {
            x: radiusSideCircles - radiusMenuItem,
            y: radiusSideCircles - radiusMenuItem
        }
        var circleToEndPosition = {
            x: radiusSideCircles * Math.cos(bigCircleAngle * Math.PI / 180),
            y: radiusSideCircles * Math.sin(bigCircleAngle * Math.PI / 180)
        }

        finalPosition.x = -1 * (circleToEndPosition.x - circleOriginToMenuItem.x);
        finalPosition.y =  1 * (circleToEndPosition.y - circleOriginToMenuItem.y);
    }

    // And finally, BROWN!!!!!!!
    if(baseAngle >= 21 && baseAngle <= 69) {
        finalPosition.colorCase = "BROWN";
        /* went to pointed edge to keep brown simple for now
        // bottomEdge;
        // Another lazy copy from blue, hopefully it's right :P
        baseAngle -= 291;

        // NUMBER OF DEGREES AVAIL FOR BOTTOM CIRCLE MIGHT BE WRONG!
        var transformedAngle = baseAngle * 150 / 50;

        finalPosition.x = radiusMenuItem + radiusBottomCircle * (Math.cos(transformedAngle) - 1);
        finalPosition.y = radiusMenuItem + radiusBottomCircle * (Math.sin(transformedAngle) - 1);     
        */
        var theta = finalPosition.menuItem130;
        var trueRadius;
        if(theta > 315) {
            finalPosition.x = radiusMenuItem;
            trueRadius = finalPosition.x / Math.cos(theta * Math.PI / 180);
            finalPosition.y = -trueRadius * Math.sin(theta * Math.PI / 180);//Math.tan(theta) / radiusMenuItem;
        }
        else {
            // finalPosition.x = Math.tan(theta) / radiusMenuItem;
            finalPosition.y = radiusMenuItem;
            trueRadius = finalPosition.y / Math.sin(theta * Math.PI / 180);
            finalPosition.x = -trueRadius * Math.cos(theta * Math.PI / 180);
        }        
        // alert("trueRadius: " + trueRadius); 
    }


    // alert(finalPosition.menuItem130);
    // testPutSmallDotAtMenuItemOriginToNewPosition
    return finalPosition;
}

// module.exports.calculateConnectorPlacement = calculateConnectorPlacement;