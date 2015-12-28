'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('test', function () {
    return gulp.src('./test/**/*.spec.js', {read: false})
        .pipe(plugins.mocha({
            reporter: 'spec'
        }))
        .on('error', function (error) {
            console.error(error);
            this.emit('end');
        });
});

gulp.task('jsdoc', function () {
    gulp.src("index.js")
        .pipe(plugins.jsdoc());
});