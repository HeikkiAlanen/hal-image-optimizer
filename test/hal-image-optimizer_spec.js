var imgOptimizer = require('../lib/hal-image-optimizer.js');
var fs = require("fs-extra");

//var testFolder = "./test/test_images";
//var trgtFolder;

// Remove test directories just in case
//trgtFolder = "./test/test_images/thumbnails3";
fs.removeSync("./test/test_images/thumbnails3");
//trgtFolder = "./test/test_images/thumbnails4";
fs.removeSync("./test/test_images/thumbnails4");
//trgtFolder = "./test/test_images/thumbnails5";
fs.removeSync("./test/test_images/thumbnailsX");

exports.imgOptimizer = function(test) {
    test.expect(5);

    // Test 1, non existent folder ./ format
    var options1 = {
        source : './test/images'
    }
    var value1 = imgOptimizer(options1);
    test.strictEqual(value1, false, "Image folder not found");

    // Test 2, non existent folder without ./
    var options2 = {
        source : 'images',
        target : 'images'
    }
    var value2 = imgOptimizer(options2);
    test.strictEqual(value2, false, "Image folder not found");

    // Test 3, create thumbnails folder if not existing
    // Delete possible thumbnails folder before testing
//    trgtFolder = "./test/test_images/thumbnails3";
    var options3 = {
        source : "./test/test_images",
        target : "./test/test_images/thumbnails3"
    }
    var value3 = imgOptimizer(options3);
    var folder1 = fs.existsSync(options3.target);
    test.equal(folder1, true, "Thumbnails folder not created.");

    // Test 4, thumbnails folder existing
//    trgtFolder = "./test/test_images/thumbnails4";
    var options4 = {
        source : "./test/test_images",
        target : "./test/test_images/thumbnails4"
    }
    fs.ensureDirSync(options4.target);
    var value4 = imgOptimizer(options4);
    // Check if thumbnails folder still exists
    var folder2 = fs.existsSync(options4.target);
    test.equal(folder2, true, "Thumbnails folder not existing.");

    // Test x (MUST BE THE LAST TEST CASE)
    // Compare source file count and created thumbnails count
//    trgtFolder = "./test/test_images/thumbnails5";
    var optionsX = {
        source : "./test/test_images",
        target : "./test/test_images/thumbnailsX"
    }
    var valueX = imgOptimizer(optionsX).then(
        function(image) {
            var imgFiles = fs.readdirSync(optionsX.source);
            var thumbFiles = fs.readdirSync(optionsX.target);
            test.equal(imgFiles.length-3, thumbFiles.length, "Thumbnails created OK."); // Excluding thumbnails folder
            test.done();
        },
        function(err) {
            console.log(err);
            test.done();
        }
    );
};
