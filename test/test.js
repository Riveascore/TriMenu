var assert = require("assert");

// We only have menuItemAngle and radiusMenuItem/radiusSideCircle

var radiusMenuItem = 5.3;
var radiusSideCircle = 8.1;

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

// describe('calculateConnectorPlacement for blue quadrant', function() {

// 	it('should get correct tA, r, x and y values from menuItemAngle', function() {
// 		$.each(angleAndVectorData, function() {
// 			calculatedFinalPosition = calculateConnectorPlacement(this.menuItemAngle, 0);
// 			// Go with lazy case, go for < 10% difference, maybe check r later
// 			assert(Math.abs(1 - (calculatedFinalPosition.x / this.x)) < 0.1);
// 			assert(Math.abs(1 - (calculatedFinalPosition.x / this.y)) < 0.1);
// 		});
// 	});
// });

suite('calculateConnectorPlacement', function() {
	$.each(angleAndVectorData, function() {
		test('menuItemAngle value: ' + this.menuItemAngle + ', should yield correct x/y values.', function() {
			calculatedFinalPosition = calculateConnectorPlacement(this.menuItemAngle, 0);
			assert(Math.abs(1 - (calculatedFinalPosition.x / this.x)) < 0.1);
			assert(Math.abs(1 - (calculatedFinalPosition.x / this.y)) < 0.1);
			done();
		});
	});
});