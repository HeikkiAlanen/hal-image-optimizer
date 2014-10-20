var readVersion = require('../lib/read-version.js');

exports.readVersion = function(test) {
		test.expect(2);
		var value = readVersion('./test/fixtures/test-pkg-2.json');
		test.strictEqual(value, "0.1.0", "Version information found.");
		var value2 = readVersion('./test/fixtures/test-pkg.json');
		test.equal(value2, null, "Version information not found.");
		test.done();
	};
