var fs = require("fs");

module.exports = function (file) {
	var json = JSON.parse(fs.readFileSync(file));
	return(json["license"]);
}
