var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    order = require("gulp-order");
var browserSync = require('browser-sync').create();


gulp.task('styles', function() {
    return gulp.src('static/sass/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(minifycss())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('static/css'));
});

// gulp.task('js', function () {
//     return gulp.src('static/js/*js')
//         .pipe(browserify())
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('js-watch', ['js'], function (done) {
//     browserSync.reload();
//     done();
// });

gulp.task('watch', function()     {
    gulp.watch('static/sass/*.scss', gulp.series('styles'));
});


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./static/"
        }
    });
    gulp.watch('static/sass/*.scss', gulp.series('styles')).on('change', browserSync.reload);
    gulp.watch("static/*.html").on('change', browserSync.reload);
    // gulp.watch("static/js/*.js", ['js-watch']);
});
