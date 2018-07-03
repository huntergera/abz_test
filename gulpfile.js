'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    wiredep = require('wiredep').stream,
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    browserSync = require('browser-sync').create(),
    spritesmith = require('gulp.spritesmith');

// build
gulp.task('build', function () {

    gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

// bower
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('./app'));
});

// browser-sync
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: './app'
    });

    gulp.watch('./app/less/**/*.less', ['less']);
    gulp.watch('./app/js/**/*.*').on('change', browserSync.reload);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
});

// less
gulp.task('less', function() {
    return gulp.src('./app/less/**/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer(['last 3 version','> 5%']))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
});

// watch
gulp.task('watch', function () {
    
    gulp.watch('./src/less/*.less', [less]);
});

//sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('./app/img/icons/*.png').pipe(spritesmith({
        imgName: 'app/img/sprites/sprite.png',
        cssName: 'app/less/sprite.less',
        padding: 10
    })).pipe(gulp.dest('./'));
    //return spriteData.pipe(gulp.dest('./app/sprites/'));
    // spriteData.img.pipe(gulp.dest('./app/img/sprites'));
    // spriteData.css.pipe(gulp.dest('./app/less/includes'));
});

// default
gulp.task('default', ['serve']);