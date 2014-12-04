'use strict';

var createThumbnails = require('./hal-image-optimizer.js');
var readVersion = require('./read-version.js');
var readLicense = require('./read-license.js');

// Option parser
var opts = require("nomnom")
    .script("node ./bin/hal-image-optimizer")
    .options({
        source: {
            abbr: 's',
            flag: false,
            help: "Source path to images"
        },
        target: {
            abbr: 't',
            flag: false,
            help: "target path to thumbnails"
        },
        width: {
            abbr: 'W',
            flag: false,
            help: "Thumbnail's width"
        },
        height: {
            abbr: 'H',
            flag: false,
            help: "Thumbnail's height"
        },
        version: {
            abbr: 'V',
            flag: true,
            callback: function() {
                return ("Version: " + readVersion('./package.json') + " License: " + readLicense('./package.json') + ". Copyright (c) 2014 Heikki Alanen");
            },
            help: "Shows version of hal-image-optimizer"
        }
    }).parse();

// If path is set then do the image optimization
    if (!createThumbnails(opts)) {
        /*global console*/
        console.log("Given directory does not exist.");
    }
