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

var radii = [radiusSideCircle2, radiusMenuItem2, 1];

var angleAndVectorData = [
	{ menuItemAngle: 250, transformedAngle: 110, r: 6.3, x: -2.2, y: -6 },
	{ menuItemAngle: 270, transformedAngle: 90, r: 5.6, x: 0, y: 5.6 },
	{ menuItemAngle: 290, transformedAngle: 70, r: 5.3, x: 1.3, y: 5 },
	{ menuItemAngle: 315, transformedAngle: 45, r: 5.1, x: 3.5, y: 3.5 },
	{ menuItemAngle: 340, transformedAngle: 20, r: 5.3, x: 5, y: -1.3 },
	{ menuItemAngle: 0, transformedAngle: 0, r: 5.6, x: 5.6, y: 0 },
	{ menuItemAngle: 20, transformedAngle: -20, r: 6.3, x: -2.2, y: -6 }
];

var calculatedFinalPosition;

suite('calculateConnectorPlacement', function() {
	$.each(angleAndVectorData, function() {
		test('menuItemAngle value: ' + this.menuItemAngle + ', should yield correct x/y values.', function() {
			calculatedFinalPosition = PLC.calculateConnectorPlacement(this.menuItemAngle, 0, radii);
			assert(Math.abs(1 - (calculatedFinalPosition.x / this.x)) < 0.1);
			assert(Math.abs(1 - (calculatedFinalPosition.x / this.y)) < 0.1);
			done();
		});
	});
});