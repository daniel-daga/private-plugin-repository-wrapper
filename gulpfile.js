var gulp   = require('gulp');
var zip    = require('gulp-zip');
var tap    = require('gulp-tap');
var clean  = require('gulp-clean');

gulp.task('copy', function() {
  gulp.src(['./*/*.php', '!./*/index.php', '!./*/uninstall.php','!./*/wp-autoupdate.php', '!./build'])
    .pipe(gulp.dest('build'));
  return gulp.src(['./*', '!./build', '!./zip', '!./node_modules'])
    .pipe(tap(function(file,t) {
      return gulp.src(file.relative + '/*')
          .pipe(zip(file.relative + '.zip'))
          .pipe(gulp.dest( 'build/' + file.relative ));
    }));
});

gulp.task('clean', require('del').bind(null, ['build']));

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'], function() {
  gulp.start('copy');
});