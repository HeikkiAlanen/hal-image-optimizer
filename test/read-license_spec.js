var readLicense = require('../lib/read-license.js');

exports.readLicense = function(test) {
		test.expect(2);
		var value = readLicense('./test/fixtures/test-pkg-2.json');
		test.strictEqual(value, "MIT", "License information found.");
		var value2 = readLicense('./test/fixtures/test-pkg.json');
		test.equal(value2, null, "License information not found.");
		test.done();
	};
