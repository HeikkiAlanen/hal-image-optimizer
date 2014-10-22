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
        clean: ['./test/test_images/thumbnails'],
		nodeunit: {
			all: ['./test/*_spec.js']
		}
	});

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['eslint', 'clean', 'nodeunit']);
  };
