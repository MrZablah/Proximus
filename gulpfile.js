const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const stripJsComments = require('gulp-strip-comments');

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
		.pipe(gulp.dest('dist/proximus/'));
});

gulp.task('default', gulp.series('buildJS', done => done()));