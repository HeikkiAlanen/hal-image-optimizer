'use strict';

var createThumbnails = require('./hal-image-optimizer.js');
var readVersion = require('./read-version.js');
var readLicense = require('./read-license.js');

// Option parser
var opts = require("nomnom")
   .script("node ./bin/hal-image-optimizer")
   .options({
      path: {
         position: 0,
         help: "Folder where images exist",
         required: true
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
if (opts.path) {
    if (!createThumbnails(opts.path)) {
        /*global console*/
        console.log("Given directory does not exist.");
    }
}
