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
        files: ["js/mediaCheck.js"]
        tasks: ["uglify"]

      coffeescript:
        files: ["coffee/**/*.coffee"]
        tasks: ["coffee", "usebanner"]

    coffee:
      compile:
        files:
          "js/mediaCheck.js": ["coffee/mediaCheck.coffee"]

    uglify:
      dist:
        options:
          banner: """
          /*
            <%= pkg.name %>
            <%= pkg.homepage %>

            Version: <%= pkg.version %>, <%= grunt.template.today("dd-mm-yyyy") %>
            Author: Rob Tarr (http://twitter.com/robtarr)
          */
          """
        files:
          "js/mediaCheck-min.js": "js/mediaCheck.js"

    usebanner:
      taskName:
        options:
          position: 'top'
          banner: """
          /*                    _ _        ____ _               _
             _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
            | '_ ` _ \\ / _ \\/ _` | |/ _` | |   | '_ \\ / _ \\/ __| |/ /
            | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
            |_| |_| |_|\\___|\\__,_|_|\\__,_|\\____|_| |_|\\___|\\___|_|\\_\\

            <%= pkg.homepage %>

            Version: <%= pkg.version %>, <%= grunt.template.today("dd-mm-yyyy") %>
            Author: Rob Tarr (http://twitter.com/robtarr)
          */
          """
          linebreak: true

        files:
          src: [ 'js/mediaCheck.js' ]


  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-banner"

  # Default task
  grunt.registerTask "default", [ "coffee", "usebanner", "watch" ]

  grunt.registerTask "dist", [ "coffee", "usebanner" ]
