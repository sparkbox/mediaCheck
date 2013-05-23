#global module:false
module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    watch:
      config:
        files: "Gruntfile.coffee"
        tasks: "default"

      javascript:
        files: ["js/**/*.js"]
        tasks: "default"

    uglify:
      dist:
        files:
          "js/mediaCheck-min.js": "js/mediaCheck.js"
      
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-uglify"

  # Default task
  grunt.registerTask "default", [ "uglify" ]
