function angleToBaseAngle(inputAngle) {
    var numberOfFullRotations = Math.floor(inputAngle / 360.0);
    return inputAngle - (numberOfFullRotations * 360);
}

function getMaxSizeAllowed() {
    return Math.min(screen.availWidth, screen.availHeight);
}