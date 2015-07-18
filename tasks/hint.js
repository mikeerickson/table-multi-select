// HINT TASK
// =============================================================================

"use strict";

var taskName    = 'hint';

var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var config      = require('./config');

require('jshint-stylish');


gulp.task('hint', function() {
  return gulp.src(config.lint.src)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint', function() {
  return gulp.src(config.lint.src)
    .pipe(plumber())
    .pipe(jshint());
});
