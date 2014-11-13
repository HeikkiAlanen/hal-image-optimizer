var imgOptimizer = require('../lib/hal-image-optimizer.js');
var fs = require("fs-extra");

var testFolder = "./test/test_images";

exports.imgOptimizer = function(test) {
		test.expect(3);
		
        // Test 1
		var value1 = imgOptimizer('./test/images');
		test.strictEqual(value1, false, "Image folder not found");
		
        // Test 2
		var value2 = imgOptimizer('images');
		test.strictEqual(value2, false, "Image folder not found");
        
        // Test 3
        // Delete possible thumbnails folder before testing
        fs.removeSync(testFolder + "/thumbnails");
        var value3 = imgOptimizer(testFolder);
        // Check if thumbnails folder created
        var folder1 = fs.existsSync(testFolder + "/thumbnails");
        test.equal(folder1, true, "Thumbnails folder created OK.");

        // Test 4
		// Compare source file and thumbnail count
        //fs.removeSync(testFolder + "/thumbnails");
		//var value4 = imgOptimizer(testFolder);
		//var imgFiles = fs.readdirSync(testFolder);
		//var thumbFiles = fs.readdirSync(testFolder + "/thumbnails");
		//test.equal(imgFiles.length-1, thumbFiles.length, "Thumbnails created OK."); // Excluding thumbnails folder
		
		test.done();
	};
