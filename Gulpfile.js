var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var connect = require("gulp-connect");
var exec = require('child_process').exec;

gulp.task('watch', function () {

    gulp.watch(['!app/**/*_test.js', 'app/*.js', 'app/**/*.js'], ['traceur-cli']);
});

/* Not working with current version of gulp-traceur */
gulp.task('traceur', function () {
    return gulp.src(['!app/**/*_test.js', 'app/*.js'])
        .pipe(sourcemaps.init())
        .pipe(traceur({modules: 'register'}))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('traceur-cli', function (cb) {
    exec('traceur app/app.js --out app/dist/cli.js --modules=register', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (err) return cb(err);    // return error
        cb();                       // finished task
    });
});

gulp.task('connect', function () {

    // Uses gulp-connect plugin to start up a server
    connect.server({
        root: ['app'],
        port: 9000
    });
});

gulp.task('default', ['traceur-cli', 'watch', 'connect']);