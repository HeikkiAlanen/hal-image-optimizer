var imgOptimizer = require('../lib/hal-image-optimizer.js');
var fs = require("fs-extra");

var testFolder = "./test/test_images";
var trgtFolder;

// Remove test directories just in case
trgtFolder = "./test/test_images/thumbnails3";
fs.removeSync(trgtFolder);
trgtFolder = "./test/test_images/thumbnails4";
fs.removeSync(trgtFolder);
trgtFolder = "./test/test_images/thumbnails5";
fs.removeSync(trgtFolder);

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
    trgtFolder = "./test/test_images/thumbnails3";
    var value3 = imgOptimizer(testFolder, trgtFolder);
    var folder1 = fs.existsSync(trgtFolder);
    test.equal(folder1, true, "Thumbnails folder not created.");

    // Test 4, thumbnails folder existing
    trgtFolder = "./test/test_images/thumbnails4";
    fs.ensureDirSync(trgtFolder);
    var value4 = imgOptimizer(testFolder, trgtFolder);
    // Check if thumbnails folder still exists
    var folder2 = fs.existsSync(trgtFolder);
    test.equal(folder2, true, "Thumbnails folder not existing.");

    // Test x (MUST BE THE LAST TEST CASE)
    // Compare source file count and created thumbnails count
    trgtFolder = "./test/test_images/thumbnails5";
    var value4 = imgOptimizer(testFolder, trgtFolder).then(
        function(image) {
            var imgFiles = fs.readdirSync(testFolder);
            var thumbFiles = fs.readdirSync(trgtFolder);
            test.equal(imgFiles.length-3, thumbFiles.length, "Thumbnails created OK."); // Excluding thumbnails folder
            test.done();
        },
        function(err) {
            console.log(err);
            test.done();
        }
    );
};
