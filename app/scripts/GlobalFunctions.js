function angleToBaseAngle(inputAngle) {
    var numberOfFullRotations = Math.floor(inputAngle / 360.0);
    return inputAngle - (numberOfFullRotations * 360);
}

function getMaxSizeAllowed() {
    // return Math.min(screen.availWidth, screen.availHeight);
    // Use window since this is based on browser viewport instead of full screen size:
	return Math.min($(window).width(), $(window).height());
}