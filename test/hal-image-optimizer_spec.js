var imgOptimizer = require('../lib/hal-image-optimizer.js');
var fs = require("fs-extra");

var testFolder = "./test/test_images";

exports.imgOptimizer = function(test) {
		test.expect(4);
		
        // Test 1, non existent folder ./ format
		var value1 = imgOptimizer('./test/images');
		test.strictEqual(value1, false, "Image folder not found");
		
        // Test 2, non existent folder without ./
		var value2 = imgOptimizer('images');
		test.strictEqual(value2, false, "Image folder not found");
        
        // Test 3, create thumbnails folder if not existing
        // Delete possible thumbnails folder before testing
        fs.removeSync(testFolder + "/thumbnails");
        var value3 = imgOptimizer(testFolder);
        // Check if thumbnails folder created
        var folder1 = fs.existsSync(testFolder + "/thumbnails");
        test.equal(folder1, true, "Thumbnails folder created OK.");

        // Test 4, thumbnails folder existing
        var value4 = imgOptimizer(testFolder);
        // Check if thumbnails folder still exists
        var folder2 = fs.existsSync(testFolder + "/thumbnails");
        test.equal(folder2, true, "Thumbnails folder OK.");

        // Test 5
		// Compare source file and thumbnail count
        //fs.removeSync(testFolder + "/thumbnails");
		//var value4 = imgOptimizer(testFolder);
		//var imgFiles = fs.readdirSync(testFolder);
		//var thumbFiles = fs.readdirSync(testFolder + "/thumbnails");
		//test.equal(imgFiles.length-1, thumbFiles.length, "Thumbnails created OK."); // Excluding thumbnails folder
		
		test.done();
	};
