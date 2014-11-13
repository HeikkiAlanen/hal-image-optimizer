'use strict';
/*global console*/

var fs = require("fs");
var easyimg = require('easyimage');

/*global module*/
module.exports = function (imgDirectory, trgtDirectory) {

    // Path to source and destination
    var srcPath = imgDirectory;
    // Just in case
    if(((srcPath.indexOf('/') === -1) || (srcPath.indexOf('/') > 1)) && (srcPath.indexOf(':') === -1)) {
        srcPath = './' + srcPath;
    }
    
    var dstPath;
    if (trgtDirectory === undefined) {
        dstPath = srcPath + '/thumbnails';        
    } else {
        dstPath = trgtDirectory;
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

    // Go through every source file
    imgFiles.forEach(function (image) {
        var srcFile = srcPath + '/' + image;
        var dstFile = dstPath + '/' + image.replace(/\.jpg$/, '_thumb.jpg');

        // If source is a file then create thumbnail
        var stat = fs.statSync(srcFile);
        if (stat && stat.isFile() && (srcFile.indexOf('.jpg') > -1)) {
            easyimg.thumbnail({
                src: srcFile,
                dst: dstFile,
                width:100,
                height:100,
                x:0,
                y:0
            }).then(
                function(image) {
                    /*eslint-disable no-console */
                    console.log('Thumbnail created: ' + image.name + ' ' + image.width + ' x ' + image.height);
                    /*eslint-enable no-console */
                },
                function (err) {
                    /*eslint-disable no-console */
                    console.log("Can't create thumbnail! ");
                    /*eslint-enable no-console */
                }
            );
        }
    });
    return (true);
};
