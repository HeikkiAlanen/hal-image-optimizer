var imgPath = process.argv[2];
var createThumbnails = require('./lib/img-optimizer.js');

if (imgPath) {
    if (!createThumbnails(imgPath)) {
        console.log("Given directory does not exist.");
    }
} else {
    console.log("Give path to images directory");
}
