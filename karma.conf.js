'use strict'

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],

    preprocessors: {
      '**/*.coffee': ['coffee']
    },
    coffeePreprocessor: {
      options: {},
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js')
      }
    },

    files: [
      'coffee/**/*.coffee',
      'specs/**/*[sS]pec.js'
    ],
    reporters: ['progress']
  })
}
