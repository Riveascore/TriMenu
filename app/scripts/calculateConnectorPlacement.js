function angleToBaseAngle(inputAngle) {
    var numberOfFullRotations = Math.floor(inputAngle / 360.0);
    return inputAngle - (numberOfFullRotations * 360);
}

function getMaxSizeAllowed() {
    return Math.min(screen.availWidth, screen.availHeight);
}



// 2 "tests"
// var radiusSideCircles = getMaxSizeAllowed()/20,
//     radiusMenuItem = $("div.menuItem").first().height() / 2,
//     radiusBottomCircle = 10.0 / 52 * radiusMenuItem * 2;

// These two passed
// alert(JSON.stringify(calculateConnectorPlacement(0, 0)) + 
//     "\n\n" + JSON.stringify(calculateConnectorPlacement(338, 0)));

// Try first 2 menu items (3rd is brown :( )
// alert(JSON.stringify(calculateConnectorPlacement(330, 0)) + 
//     "\n\n" + JSON.stringify(calculateConnectorPlacement(270, 0)));

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
    // ADD 110, THEN, convert to BASE ANGLE!!!

    // BLUE!
    if(baseAngle >= 250 || (baseAngle >= 0 && baseAngle <= 20)) {
        // OLD SHIT!
        // finalPosition.menuItem130 = 130 - angleToBaseAngle(rawMenuItemAngle + 110);
        finalPosition.menuItem130 = angleToBaseAngle(-1 * (baseAngle -360));
        finalPosition.colorCase = "BLUE";

        // Convert to bigCircle90 format THIS IS WHAT WE USE!
        var bigCircleAngle = (finalPosition.menuItem130 + 20) * 90 / 130;
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
        // alert("HIIIIII+ \n" + JSON.stringify(circleToEndPosition));

        finalPosition.x = circleToEndPosition.x - circleOriginToMenuItem.x;
        finalPosition.y = -1 * (circleToEndPosition.y - circleOriginToMenuItem.y);
    }

    // GREEN!
    if(baseAngle >= 201 && baseAngle <= 249) {
        finalPosition.colorCase = "GREEN";
        var theta = baseAngle - 90;
        if(baseAngle > 135) {
            finalPosition.x = -1.0 * radiusMenuItem;
            finalPosition.y = -1.0 * Math.tan(theta) / radiusMenuItem;
        }
        else {
            finalPosition.x = -Math.tan(theta) / radiusMenuItem;
            finalPosition.y = -radiusMenuItem;
        }
    }

    // YELLOW!
    if(baseAngle >= 70 && baseAngle <= 200) {
        // OLD SHIT!
        // finalPosition.menuItem130 = 130 - angleToBaseAngle(rawMenuItemAngle + 110);
        finalPosition.menuItem130 = angleToBaseAngle(-1 * (baseAngle -360));
        finalPosition.colorCase = "YELLOW";

        // Convert to bigCircle90 format THIS IS WHAT WE USE!
        var bigCircleAngle = (finalPosition.menuItem130 + 20) * 90 / 130;
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

    // And finally, BROWN!!!!!!!
    if(baseAngle >= 21 && baseAngle <= 69) {
        finalPosition.colorCase = "BROWN";
        // bottomEdge;
        // Another lazy copy from blue, hopefully it's right :P
        baseAngle -= 291;

        // NUMBER OF DEGREES AVAIL FOR BOTTOM CIRCLE MIGHT BE WRONG!
        var transformedAngle = baseAngle * 150 / 50;

        finalPosition.x = radiusMenuItem + radiusBottomCircle * (Math.cos(transformedAngle) - 1);
        finalPosition.y = radiusMenuItem + radiusBottomCircle * (Math.sin(transformedAngle) - 1);     
    }



    // testPutSmallDotAtMenuItemOriginToNewPosition
    return finalPosition;
}

module.exports.calculateConnectorPlacement = calculateConnectorPlacement;