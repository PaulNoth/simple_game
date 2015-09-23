module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jasmine: {
          src: ['app/**/*.js'],
          options: {
              specs: ['spec/**/*[sS]pec.js'],
              vendor: []
          }
      },
      serve: {
          options: {
              port: 8080
          }
      }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-serve');
};