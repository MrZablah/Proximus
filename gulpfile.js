const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const stripJsComments = require('gulp-strip-comments');
const browserSync = require('browser-sync').create();

// Proximus language changer
gulp.task('buildJS', function() {
	return gulp
		.src('src/proximus/*.js')
		.pipe(concat('proximus.js'))
		.pipe(stripJsComments())
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(minify())
		.pipe(gulp.dest('dist/'))
		.pipe(gulp.dest('test/'));
});

// Start test html
gulp.task('server', function() {
	browserSync.init({
		server: 'test/'
	});

	gulp.watch('src/proximus/*.js', gulp.parallel('buildJS'));
	gulp.watch('test/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('buildJS', done => done()));