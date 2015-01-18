'use strict';

// Include gulp
var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    notify = require('gulp-notify'),
    paths = {
    scripts: ['app/js/**/*.js', '!app/bower_components'],
    images: 'app/img/**/*',
    html: ['app/**/*.html', '!app/bower_components/**/*.html'],
    robots: 'app/robots.txt',
    fonts: 'app/bower_components/bootstrap/fonts/*'
};

// Git tasks

// Other actions that do not require a Vinyl
gulp.task('log', function() {
    git.exec({args: 'log -10'}, function(err, stdout) {
        if (err) {
            throw err;
        } else if (stdout) {
            console.log(stdout);
        }
    });
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});


// Style Task
gulp.task('jscs', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }));
});


// Default Task
gulp.task('default', ['jscs', 'lint']);

// Handle the error
function errorHandler(error) {
    console.log(error.toString());
    this.emit('end');
}

