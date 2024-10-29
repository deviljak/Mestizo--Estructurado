const gulp = require('gulp');
const terser = require('gulp-terser');

gulp.task('minify', () => {
  return gulp.src('src/app.js')
    .pipe(terser())
    .pipe(gulp.dest('dist'));
});
