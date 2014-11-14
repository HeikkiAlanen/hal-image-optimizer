var imgOptimizer = require('../lib/hal-image-optimizer.js');
var fs = require("fs-extra");

var testFolder = "./test/test_images";
var trgtFolder = "./test/test_images/thumbnails"

exports.imgOptimizer = function(test) {
    test.expect(5);

    // Test 1, non existent folder ./ format
    var value1 = imgOptimizer('./test/images');
    test.strictEqual(value1, false, "Image folder not found");

    // Test 2, non existent folder without ./
    var value2 = imgOptimizer('images');
    test.strictEqual(value2, false, "Image folder not found");

    // Test 3, create thumbnails folder if not existing
    // Delete possible thumbnails folder before testing
    fs.removeSync(testFolder + "/thumbnails");
    fs.removeSync(trgtFolder);
    var value3 = imgOptimizer(testFolder, trgtFolder).then(
        function(image) {
            // Check if thumbnails folder created
            var folder1 = fs.existsSync(trgtFolder);
            test.equal(folder1, true, "Thumbnails folder not created.");
        },
        function(err) {
            console.log(err);
        }
    );

    // Test 4, thumbnails folder existing
    var value4 = imgOptimizer(testFolder, trgtFolder).then(
        function(image) {
            // Check if thumbnails folder still exists
            var folder2 = fs.existsSync(trgtFolder);
            test.equal(folder2, true, "Thumbnails folder not existing.");
        },
        function(err) {
            console.log(err);
        }
    );

    // Test x (MUST BE THE LAST TEST CASE)
    // Compare source file count and created thumbnails count
    fs.removeSync(testFolder + "/thumbnails");
    fs.removeSync(trgtFolder);
    var value4 = imgOptimizer(testFolder, trgtFolder).then(
        function(image) {
            var imgFiles = fs.readdirSync(testFolder);
            var thumbFiles = fs.readdirSync(trgtFolder);
            test.equal(imgFiles.length-1, thumbFiles.length, "Thumbnails created OK."); // Excluding thumbnails folder
            test.done();
        },
        function(err) {
            console.log(err);
            test.done();
        }
    );
};
