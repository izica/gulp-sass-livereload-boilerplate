var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    watch        = require('gulp-watch'),
    concat       = require('gulp-concat'),
    csso         = require('gulp-csso'),
    uglify       = require('gulp-uglify'),
    tiny         = require('gulp-tinypng-nokey'),
    autoprefixer = require('gulp-autoprefixer');

var path = {
    build: {
        css:    './assets/css/',
        js:     './assets/js/',
        images: './assets/i/',
    },
    src: {
        css:    './src/scss/global.scss',
        js:     './src/js/*.js',
        images: './src/i/*',
    },
    watch: {
        scss:   './src/scss/**/*.scss',
        js:     './src/js/*.js',
    }
};

//sass
gulp.task('scss', function() {
    gulp.src([path.src.css])
        .pipe(concat('styles.min.css'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest(path.build.css));
});

//js
gulp.task('js', function() {
    gulp.src([path.src.js])
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

//images
gulp.task('images', function() {
    gulp.src([path.src.images])
        .pipe(tiny())
        .pipe(gulp.dest(path.build.images));
});

//watcher
gulp.task('watch', function(){
    watch([path.watch.styles], function(event, cb) {
        gulp.start('scss');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
});

gulp.task('default', ['scss', 'js', 'images']);
