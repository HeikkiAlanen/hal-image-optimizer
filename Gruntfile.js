/*
	Grunt needs to be installed globally before grunt can be used. (`npm install -g grunt`)
*/
module.exports = function(grunt) {

    grunt.initConfig({
		eslint: {
			options: {
				config: '.eslintrc'
			},
			target: ['*.js', './lib/*.js']
		},
		nodeunit: {
			all: ['./test/*_spec.js']
		}
	});
  
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['nodeunit', 'eslint']);
  };
