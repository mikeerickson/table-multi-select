// GULPFILE
// 2015-07-11 [mse]
// Ambry Genetics
// =============================================================================

var gulp         = require('gulp');
var browserify   = require('browserify');
var reactify     = require('reactify');
var source       = require('vinyl-source-stream');
var msg          = require('gulp-messenger');
var handleErrors = require('./utils/handleErrors');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var copy         = require('gulp-copy');
var config       = require('./tasks/config');
var del          = require('del');
var jshint       = require('gulp-jshint');

require('jshint-stylish');

msg.init({logToFile: true, timestamp: true});

gulp.task('hint', function() {
  return gulp.src(config.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', function() {
  msg.Success('*** ' + config.browserify.dest + '/' + config.browserify.filename + ' Created Successfully ***');
  browserify(config.browserify.src)
    .on('error', handleErrors)
    .transform(reactify)
    .bundle()
    .pipe(source(config.browserify.filename))
    .pipe(gulp.dest(config.browserify.dest));
});

gulp.task('uglify', function(cb) {
  return gulp.src(config.build.lib.src)
    .on('error', handleErrors)
    .pipe(uglify())
    .pipe(rename(config.build.lib.filename))
    .pipe(msg.flush.success('*** ' + config.build.lib.filename + ' Created Successfully ***'))
    .pipe(gulp.dest(config.build.lib.dest));
});

gulp.task('build', ['hint', 'browserify', 'uglify'], function() {
  msg.Warn('=== Building Distribution ===');
  return gulp.src(['./examples/public/lib/**/*.*'])
    .pipe(copy(config.build.lib.dist, {prefix: 3}));
});

gulp.task('watch', function() {
  gulp.watch(config.watch.browserify, ['browserify']);
  gulp.watch(config.watch.uglify,     ['uglify']);
  gulp.watch(config.watch.scripts,    ['hint']);
});
