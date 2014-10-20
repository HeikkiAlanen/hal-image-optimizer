var createThumbnails = require('./lib/img-optimizer.js');
var readVersion = require('./lib/read-version.js');
var readLicense = require('./lib/read-license.js');

// Option parser
var opts = require("nomnom")
   .script("index.js")
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
        console.log("Given directory does not exist.");
    }
}
