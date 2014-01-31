var assert = require("assert");
var jsdom = require('jsdom').jsdom;

var document = jsdom("<html><head></head><body>hello world</body></html>");
var window = document.createWindow();

$ = require('jquery/dist/jquery')(window);


// Here requiring file with all functions
var GF = require('../app/scripts/GlobalFunctions.js');
var PLC = require('../app/scripts/calculateConnectorPlacement.js');

var radiusMenuItem2 = 5.3;
var radiusSideCircle2 = 8.1;

var myRadii = [radiusSideCircle2, radiusMenuItem2, 1];

var angleAndVectorData = [
	{ menuItemAngle: 250, menuItem130Angle: 110, bigCircleAngle: 90, r: 6.3, x: -2.2, y: -6 },
	{ menuItemAngle: 270, menuItem130Angle: 90, bigCircleAngle: 75, r: 5.6, x: 0, y: 5.6 },
	{ menuItemAngle: 290, menuItem130Angle: 70, bigCircleAngle: 60, r: 5.3, x: 1.3, y: 5 },
	{ menuItemAngle: 315, menuItem130Angle: 45, bigCircleAngle: 45, r: 5.1, x: 3.5, y: 3.5 },
	{ menuItemAngle: 340, menuItem130Angle: 20, bigCircleAngle: 30, r: 5.3, x: 5, y: -1.3 },
	{ menuItemAngle: 0, menuItem130Angle: 0, bigCircleAngle: 15, r: 5.6, x: 5.6, y: 0 },
	{ menuItemAngle: 20, menuItem130Angle: 340, bigCircleAngle: 0, r: 6.3, x: -2.2, y: -6 }
];

var calculatedFinalPosition;

// suite('calculateConnectorPlacement', function() {
// 	$.each(angleAndVectorData, function() {
// 		test('menuItemAngle value: ' + this.menuItemAngle + ', should yield correct x/y values.', function() {
// 			calculatedFinalPosition = PLC.calculateConnectorPlacement(this.menuItemAngle, 0, myRadii);
// 			assert(Math.abs(1 - (calculatedFinalPosition.x / this.x)) < 0.1);
// 			assert(Math.abs(1 - (calculatedFinalPosition.x / this.y)) < 0.1);
// 			done();
// 		});
// 	});
// });

var inputAngleToBigCircleAngle;
var percentageDifference;
var lessThan10Percent;
suite('Test input to Big Circle Angle Transformation', function() {
	$.each(angleAndVectorData, function() {

		calculatedFinalPosition = PLC.calculateConnectorPlacement(this.menuItemAngle, 0, [5.3, 8.1, 1]);
		inputAngleToBigCircleAngle = calculatedFinalPosition.bigCircle90;
		percentageDifference = Math.abs(1 - (inputAngleToBigCircleAngle / this.bigCircleAngle)) * 100.0;
		// if(this.bigCircleAngle == 0) {
		// 	percentageDifference = 0.0;
		// }
		lessThan10Percent = (percentageDifference < 1.0);

		test(lessThan10Percent + 
			"\nPercentage Difference: " + percentageDifference.toFixed(2) + "%" +
			"\nmenuItemAngle: " + this.menuItemAngle + "\nShould should output: " + this.bigCircleAngle + 
			"\nFunction output was: " + inputAngleToBigCircleAngle + "\n", function() {
			
			assert(lessThan10Percent);
		});
	});
});

// suite('Test input angle to menuItem130 angle', function() {
// 	$.each(angleAndVectorData, function() {

// 		calculatedFinalPosition = PLC.calculateConnectorPlacement(this.menuItemAngle, 0, myRadii);
// 		inputAngleToMenuItem130Angle = calculatedFinalPosition.menuItem130;
// 		percentageDifference = Math.abs(1 - (inputAngleToMenuItem130Angle / this.menuItem130Angle)) * 100.0;
// 		lessThan10Percent = (percentageDifference < 0.5);
		
// 		test(lessThan10Percent + 
// 			"\nPercentage Difference: " + percentageDifference.toFixed(2) + "%" +
// 			"\nmenuItemAngle: " + this.menuItemAngle + "\nShould should output: " + this.menuItem130Angle + 
// 			"\nFunction output was: " + inputAngleToMenuItem130Angle + "\n", function() {
			
// 			assert(lessThan10Percent);
// 		});
// 	});
// });