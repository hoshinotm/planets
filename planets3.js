/* 
 * Protarammatically generates a spacesape with fuzzy planets
 * Borrowed heavily and modified from a Duke example.
 */

// Image canvas dimentions
var width = 256;
var height = 256;
var starThreshold = 0.999;

// Planet 1 parameters:
var radius1 = 17;
var origin1X = 25;
var origin1Y = 25;
// Planet 2 parameters:
var radius2 = 50;
var origin2X = 100;
var origin2Y = 100;
// Planet 3 parameters:
var radius3 = 80;
var origin3X = 200;
var origin3Y = 200;

var n = 4;
var m = 1.5;

// Calculate the distance to (x,y) from the current pixel.
function dist(pixel, x, y) {
    var dx = pixel.getX() - x;
    var dy = pixel.getY() - y;
    return Math.sqrt(dx * dx + dy * dy);
}

function setFadingWhite (pixel, x, y) {
    var fade = Math.max(m*y-x, x-m*x);
    pixel.setRed(fade*Math.random());
    pixel.setGreen(fade*Math.random());
    pixel.setBlue(fade*Math.random());
    return pixel;
}

var output = new SimpleImage(width, height);

for (var pixel of output.values()) {
        pixel = setFadingWhite(pixel, pixel.getX(), pixel.getY());
    var distance = dist(pixel,origin1X,origin1Y);
    var fade = (255-distance*n)*Math.random();
    if (distance < radius1){
        pixel.setRed(fade);
        pixel.setGreen(fade);
    }
    else {
        var distance = dist(pixel,origin2X,origin2Y);
        var fade = (255-distance*n)*Math.random();
        if (distance < radius2){
            pixel.setGreen(fade);
            pixel.setBlue(fade);
        }
        else {
            var distance = dist(pixel,origin3X,origin3Y);
            var fade = (255-distance*n)*Math.random();
            if (distance < radius3){
                pixel.setBlue(fade);
                pixel.setRed(fade);
                pixel.setAlpha(255*Math.random());
            }
            else if (Math.random() > starThreshold) {
                pixel.setRed(200*55*Math.random());
                pixel.setGreen(255);
                pixel.setBlue(160*40*Math.random());
                pixel.setAlpha(255*Math.random());
            }
        }
    }
}

print(output);