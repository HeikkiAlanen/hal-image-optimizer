'use strict';
/*global console*/

var fs = require("fs");
var easyimg = require('easyimage');
var Q = require('q');
var confFile = "./hal-image-optimizer.json";

/*global module*/
module.exports = function (options) {

	var deferred = Q.defer();

    // Default values
    var conf = {
        source: '',
        target: '',
        width: 100,
        height: 100
    };

    // Read configuration file
    if (fs.existsSync(confFile)) {
        var config = JSON.parse(fs.readFileSync(confFile));
        if (!(typeof config.source === 'undefined')) {
            conf.source = config.source;
        }
        if (!(typeof config.target === 'undefined')) {
            conf.target = config.target;
        }
        if (!(typeof config.width === 'undefined')) {
            conf.width = config.width;
        }
        if (!(typeof config.height === 'undefined')) {
            conf.height = config.height;
        }
    }

    // Path to source files
    var srcPath = options.source || conf.source;

    // Just in case
    if(((srcPath.indexOf('/') === -1) || (srcPath.indexOf('/') > 1)) && (srcPath.indexOf(':') === -1)) {
        srcPath = './' + srcPath;
    }

    // If source directory does not exist, return false.
    if (!fs.existsSync(srcPath)) {
        return (false);
    }

    // Path to destination
    var dstPath = options.target || conf.target || srcPath;

    // If destination directory does not exist, create it.
    if (!fs.existsSync(dstPath)) {
        fs.mkdirSync(dstPath);
    }

    // Set width and height
    var imgWidth = options.width || conf.width;
    var imgHeight = options.height || conf.height;

    // Read source file names
    var imgFiles = fs.readdirSync(srcPath);
    var imgCtr = 0;
    // Go through every source file
    imgFiles.forEach(function (image) {
        var srcFile = srcPath + '/' + image;
        var dstFile = dstPath + '/' + image.replace(/\.jpg$/i, '_thumb.jpg');

        // If source is a file then create thumbnail
        var stat = fs.statSync(srcFile);
        if (stat && stat.isFile() && ((srcFile.indexOf('.jpg') > -1) || (srcFile.indexOf('.JPG') > -1))) {
            imgCtr++;
            easyimg.thumbnail({
                src: srcFile,
                dst: dstFile,
                width: imgWidth,
                height: imgHeight,
                x: 0,
                y: 0
            }).then(
                function(image) {
                    imgCtr--;
                    if (imgCtr === 0) {
                        /*eslint-disable no-console */
                        console.log('Thumbnails created!');
                        /*eslint-enable no-console */
                        deferred.resolve(image);
                    }
                },
                function (err) {
                    /*eslint-disable no-console */
                    console.log("Can't create thumbnail! ");
                    /*eslint-enable no-console */
                    deferred.reject(err);
                }
            );
        }
    });
    return (deferred.promise);
};
