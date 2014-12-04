var imgOptimizer = require('../lib/hal-image-optimizer.js');
var fs = require("fs-extra");

// Remove test directories just in case
fs.removeSync("./test/test_images/thumbnails3");
fs.removeSync("./test/test_images/thumbnails4");
fs.removeSync("./test/test_images/thumbnails5");
fs.removeSync("./test/test_images/thumbnailsX");

var confFile = 'hal-image-optimizer.json';
if (fs.existsSync(confFile)) {
    var koe = fs.renameSync(confFile, "OLD_" + confFile);
}

exports.imgOptimizer = function(test) {
    test.expect(7);

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

    // Test 5, configuration file exists, but it is empty
    var options5 = {
        "source": "./test/test_images",
        "target": "./test/test_images/thumbnails5"
    }
    fs.writeFileSync(confFile, 
        '{ }');
    var value5 = imgOptimizer(options5);
    // Check if thumbnails folder exists
    var folder5 = fs.existsSync("./test/test_images/thumbnails5");
    test.equal(folder5, true, "Thumbnails folder not existing.");

    // Test 6, configuration file exists
    var options6 = {
    }
    fs.writeFileSync(confFile, 
        '{ "source": "./test/test_images", "target": "./test/test_images/thumbnails6", "width": "200", "height": "200"}');
    var value6 = imgOptimizer(options6);
    // Check if thumbnails folder exists
    var folder6 = fs.existsSync("./test/test_images/thumbnails6");
    test.equal(folder6, true, "Thumbnails folder not existing.");
    if (fs.existsSync("OLD_" + confFile)) {
        fs.renameSync("OLD_" + confFile, confFile);
    }

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
            test.equal(imgFiles.length-5, thumbFiles.length, "Thumbnails created OK."); // Excluding thumbnails folder
            test.done();
        },
        function(err) {
            console.log(err);
            test.done();
        }
    );
};
