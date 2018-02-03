var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    glob = require('gulp-sass-glob');

// ----

var paths = {
    sass: 'resources/sass/**/*.scss',
    css: 'assets/css/'
}

var sassFrameworkPaths = [
    '/Library/Ruby/Gems/2.3.0/gems/bourbon-5.0.0/core',
    '/Library/Ruby/Gems/2.3.0/gems/neat-2.1.0/core'
]

// Compile all
gulp.task('compile', function()
{
    // SASS
    gulp
        .src(paths.sass)
        .pipe( // Notification
            plumber({
                errorHandler: function(err)
                {
                    notify.onError({ title: 'SASS ', message: err.message})(err);
                    this.emit('end');
                }
            }))
        .pipe(glob()) // Autoimport SASS files
        .pipe( // Compile
            sass({
                outputStyle: 'compressed',
                includePaths: sassFrameworkPaths
            })
        )
        .pipe(gulp.dest(paths.css)); // Save
});

// ----
gulp.task('watch', ['compile'], function()
{
    gulp.watch(paths.sass, ['compile']);
});