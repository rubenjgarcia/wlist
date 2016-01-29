'use strict'

var gulp = require('gulp')
var plugins = require('gulp-load-plugins')()

gulp.task('test', function () {
  return gulp.src('./test/**/*.spec.js', { read: false })
    .pipe(plugins.coverage.instrument({
      pattern: ['index.js'],
      debugDirectory: 'debug'
    }))
    .pipe(plugins.mocha())
    .pipe(plugins.coverage.gather())
    .pipe(plugins.coverage.format())
    .pipe(gulp.dest('reports'))
    .on('error', function (error) {
      console.error(error)
      this.emit('end')
    })
})

gulp.task('jsdoc', function () {
  gulp.src('index.js')
    .pipe(plugins.jsdoc())
})
