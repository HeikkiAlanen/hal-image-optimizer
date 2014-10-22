var imgOptimizer = require('../lib/hal-image-optimizer.js');
var fs = require("fs");


exports.imgOptimizer = function(test) {
		test.expect(3);
		
		var value = imgOptimizer('./test/images');
		test.strictEqual(value, false, "Image folder not found");
		
		var value2 = imgOptimizer('./test/test_images');
		test.equal(value2, true, "Thumbnails created.");
		
		// Compare source file and thumbnail count
		var value3 = imgOptimizer('./test/test_images');
		var imgFiles = fs.readdirSync('./test/test_images');
		var thumbFiles = fs.readdirSync('./test/test_images/thumbnails');
		test.equal(imgFiles.length-1, thumbFiles.length, "Thumbnails created OK."); // Excluding thumbnails folder
		
		test.done();
	};
