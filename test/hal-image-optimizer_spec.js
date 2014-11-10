var imgOptimizer = require('../lib/hal-image-optimizer.js');
var fs = require("fs");


exports.imgOptimizer = function(test) {
		test.expect(0);
		
		//var value = imgOptimizer('./test/images');
		//test.strictEqual(value, false, "Image folder not found");
		
		// Compare source file and thumbnail count
        // 23.10.14/HAl: For some reason .execFile command is not working with unit testing (in easyimage.js)
		//var value2 = imgOptimizer('./test/test_images');
		//var imgFiles = fs.readdirSync('./test/test_images');
		//var thumbFiles = fs.readdirSync('./test/test_images/thumbnails');
		//test.equal(imgFiles.length-1, thumbFiles.length, "Thumbnails created OK."); // Excluding thumbnails folder
		
		test.done();
	};
