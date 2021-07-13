import colors from './colors.js';
console.log(colors);

var width = 32;
var height = 32;

var drawing = new Array(width);

for(var i = 0; i < width; i++){
    drawing[i] = new Array(height);
}

for(var i = 0; i < width; i++){
    for(var j = 0; j < height; j++){
        drawing[i][j] = colors.white;
    }
}

//const drawing = [ []]
