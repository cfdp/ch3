var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    shell       = require('gulp-shell'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    svgSprite   = require('gulp-svg-sprites');

/**
 * Launch the Server
 */
gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    // Change as required
    proxy: "http://drupal.docker.localhost:8000"
  });
});

/**
 * @task sass
 * Compile files from scss
 */
gulp.task('sass', function () {
  return gulp.src('scss/styles.scss')
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(sass())
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({stream:true}))
});

/**
 * @task svg-sprites
 */
gulp.task('svg-sprites', function() {
		return gulp.src("assets/svg/*.svg")
				.pipe(svgSprite({
					mode: "defs",
					preview: true
				}))
				.pipe(gulp.dest("assets/dist"));
				// .pipe(imagemin({
				// 		svgoPlugins: [
				// 			// The following plugins need to be disabled for this to work:
				// 			// https://github.com/svg/svgo/issues/553#issuecomment-223531153
				// 			{cleanupIDs: false},
				// 			{removeUselessDefs: false}
				// 		]
				// }))
				// .pipe( rename( {
				// 	suffix: '.min'
				// } ) )
				// .pipe(gulp.dest("assets/dist"));
});

/**
 * @task clearcache
 * Clear all caches
 */
gulp.task('clearcache', function() {
  return shell.task([
    'drush cc all'
  ]);
});

/**
 * @task reload
 * Refresh the page after clearing cache
 */
gulp.task('reload', ['clearcache'], function () {
  browserSync.reload();
});

/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function () {
  gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass']);
  gulp.watch('**/*.{php,inc,info}',['reload']);
  gulp.watch('assets/svg/*.svg', ['svg-sprites']);
});

/**
 * Default task, running just `gulp` will
 * compile Sass files, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

/**
 * Error Handler
 */
function onError(err) {
  console.log(err);
  this.emit('end');
}
