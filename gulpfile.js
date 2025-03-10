var gulp = require('gulp');
var concat = require('gulp-concat');

// Include plugins
var plugins = require('gulp-load-plugins')();                       // load all plugins


// browser-sync watched files
// automatically reloads the page when files changed
var browserSyncWatchFiles = [
    './css/*.min.css',
    './js/*.min.js',
    './**/*.php'
];

// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
    proxy: "gdpnrw.dev",
    notify: true
};

var browserSync = require('browser-sync').create();

// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
//gulp.task('watch-bs', gulp.series(['browser-sync', 'watch', 'scripts'], function () { }));




//  CSS
gulp.task('css', function () {
    return gulp.src('src/sass/style.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass().on('error', plugins.sass.logError))    // compile Sass
        .pipe(plugins.autoprefixer())                               // autoprefix
        .pipe(plugins.csso())                                       // minify
        .pipe(plugins.livereload())
        .pipe(gulp.dest('./'));
});

// JS
gulp.task('js', function() {
    return gulp.src('src/js/site.js')
        .pipe(plugins.plumber())
        .pipe(plugins.uglify())                                     // minify
        .pipe(plugins.livereload())
        .pipe(concat('site.js'))
        .pipe(gulp.dest('public/js'));
});

// Clean
gulp.task('clean', function() {
    return gulp.src('static', {read: false, allowEmpty: true})
        .pipe(plugins.clean());
});

// Images optimisation
gulp.task('img', function () {
    return gulp.src('src/img/*.{png,jpg,svg}')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('static/img'));
});

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});



// Watch
gulp.task('watch', function(){
    plugins.livereload.listen(35730);
    gulp.watch('**/*.php').on('change', function(file) {
        plugins.livereload.changed(file.path);
    });
    gulp.watch('**/*.twig').on('change', function(file) {
        plugins.livereload.changed(file.path);
    });
//    gulp.watch('src/sass/**/*.scss',['css']);
//    gulp.watch('src/js/site.js',['js']);
    gulp.watch('src/sass/**/*.scss',gulp.series('css'));
    gulp.watch('src/js/site.js',gulp.series('js'));
});
// Run: 
// gulp scripts. 
// Uglifies and concat all JS files into one
gulp.task('scripts', function() {
    var scripts = [

        // Start - All BS4 stuff
        basePaths.dev + 'js/bootstrap4/bootstrap.js',

        // End - All BS4 stuff

        basePaths.dev + 'js/skip-link-focus-fix.js'
    ];
  gulp.src(scripts)
    .pipe(concat('theme.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));

  gulp.src(scripts)
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('./js/'));
});



// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', gulp.parallel('browser-sync', 'watch', function () { }));



// Build
gulp.task('build', gulp.series(['clean', 'css', 'js', 'img']));

// Default
gulp.task('default', gulp.series('watch'));


