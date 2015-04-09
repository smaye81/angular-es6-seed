var gulp = require('gulp');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var SOURCE_FILES = ['!app/**/*_test.js', 'app/*.js', 'app/modules/**/*.js'];
var SOURCE_HTML = ['app/*.html', 'app/modules/**/*.html'];

// Runs JSHint Report against all JS files in app
gulp.task('lint', function () {
    return gulp.src(SOURCE_FILES)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('browserSync', function() {
    browserSync({
        logConnections: true,
        logFileChanges: true,
        notify: true,
        open: true,
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('watch', function () {

    // Lint the JS files when they change
    gulp.watch(SOURCE_FILES, ['lint', 'traceur', reload]);
    gulp.watch(SOURCE_HTML, reload);
});

/* Sourcemaps seem to not be working when a base is specified */
gulp.task('traceur', function () {
    return gulp.src(['!app/**/*_test.js', 'app/*.js', 'app/modules/**/*.js'], {base: './app'})
        .pipe(traceur({
            modules: 'register',
            moduleName : true
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app/dist'))
        .pipe(reload({stream:true}));
});

gulp.task('default', ['traceur', 'lint', 'watch', 'browserSync']);