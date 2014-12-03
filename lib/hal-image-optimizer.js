'use strict';
/*global console*/

var fs = require("fs");
var easyimg = require('easyimage');
var Q = require('q');

/*global module*/
module.exports = function (options) {

	var deferred = Q.defer();

    // Path to source and destination
    var srcPath = options.source;

    // Just in case
    if(((srcPath.indexOf('/') === -1) || (srcPath.indexOf('/') > 1)) && (srcPath.indexOf(':') === -1)) {
        srcPath = './' + srcPath;
    }

    var dstPath;
    if (typeof options.target === 'undefined') {
        dstPath = srcPath + '/thumbnails';
    } else {
        dstPath = options.target;
    }

    // If source directory does not exist, return false.
    if (!fs.existsSync(srcPath)) {
        return (false);
    }

    // If thumbnail-directory does not exist, create it.
    if (!fs.existsSync(dstPath)) {
        fs.mkdirSync(dstPath);
    }

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
                width: 100,
                height: 100,
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
