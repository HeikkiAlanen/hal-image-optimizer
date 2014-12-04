/*
	Grunt needs to be installed globally before grunt can be used. (`npm install -g grunt`)
*/
'use strict';

/*global module*/
module.exports = function(grunt) {
    grunt.initConfig({
		eslint: {
			options: {
				config: '.eslintrc'
			},
			target: ['*.js', './lib/*.js']
		},
        clean: ['./test/test_images/thumbnails', './hal-image-optimizer.json'],
		nodeunit: {
			all: ['./test/*_spec.js']
		},
        "file-creator": {
            "config1": {
                "./hal-image-optimizer.json": function(fs, fd, done) {
                    fs.writeSync(fd, '{ "width": "200", "height": "200" }');
                    done();
                }
            }
        }
    });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['eslint', 'clean', 'nodeunit', 'clean', 'file-creator:config1', 'nodeunit']);
  };
