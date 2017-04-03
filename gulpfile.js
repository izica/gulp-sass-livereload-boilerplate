var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    watch        = require('gulp-watch'),
    concat       = require('gulp-concat'),
    csso         = require('gulp-csso'),
    uglify       = require('gulp-uglify'),
    tiny         = require('gulp-tinypng-nokey'),
    connect      = require('gulp-connect'),
    plumber      = require('gulp-plumber')
    autoprefixer = require('gulp-autoprefixer');

var path = {
    build: {
        css:    './assets/css/',
        js:     './assets/js/',
        images: './assets/i/',
    },
    src: {
    	images: './src/i/**/*',
        css:    './src/scss/global.scss',
        js: [
        	'./src/js/libs/*.js',
        	'./src/js/module/*.js',
        	'./src/js/page/*.js',
        	'./src/js/*.js'
        ],
    },
    watch: {
        css: './src/scss/**/*.scss',
        js:  './src/js/*.js',
    }
};

//server
gulp.task('connect', function() {
    connect.server({
        port: 8080,
        livereload: true
    });
});

//sass
gulp.task('css', function() {
    gulp.src([path.src.css])
        .pipe(plumber())
        .pipe(concat('styles.min.css'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

//js
gulp.task('js', function() {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

//images
gulp.task('images', function() {
    gulp.src([path.src.images])
        .pipe(tiny())
        .pipe(gulp.dest(path.build.images));
});

//watcher
gulp.task('watch', function(){
    watch([path.watch.css], function(event, cb) {
        gulp.start('css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['connect', 'watch']);
