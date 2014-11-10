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
        clean: ['./test/test_images/thumbnails', './coverage'],
		nodeunit: {
			all: ['./test/*_spec.js']
		},
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '../coverage/instrument/lib/'
            }
        },
        instrument: {
            files: 'lib/*.js',
            options: {
                lazy: true,
                basePath: 'coverage/instrument/'
            }
        },
        storeCoverage: {
            options: {
                dir: 'coverage/reports'
            }
        },
        makeReport: {
            src: 'coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'coverage/reports',
                print: 'detail'
            }
        }
    });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-env');
  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['eslint', 'clean', 'nodeunit']);
  grunt.registerTask('coverage', ['clean', 'env:coverage', 'instrument', 'nodeunit', 'storeCoverage', 'makeReport']);
  };
