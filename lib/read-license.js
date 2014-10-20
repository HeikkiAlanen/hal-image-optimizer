'use strict';

var fs = require("fs");

/*global module*/
module.exports = function (file) {
	var json = JSON.parse(fs.readFileSync(file));
	return (json.license);
};
