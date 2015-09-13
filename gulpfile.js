var gulp = require('gulp'),
zip = require('gulp-zip'),
watch = require('gulp-watch'),
jshint = require('gulp-jshint'),
gp_concat = require('gulp-concat'),
gp_uglify = require('gulp-uglify'),
imageop = require('gulp-image-optimization'),
minifyHTML = require('gulp-minify-html'),
rename = require('gulp-rename'),
runSequence = require('run-sequence'),
del = require('del'),
gutil = require('gulp-util'),
minifyCss = require('gulp-minify-css'),
htmlreplace = require('gulp-html-replace'),
inject = require('gulp-inject'),
$ = require('gulp-load-plugins')();

// All your paths for JS, HTML and Image files
var zip_files = ['zip/index.html', 'zip/assets/*'], // Files to be added to the zip folder use "<directory goes here>/*" for all files inside the directory
    js_files = ['app/js/player-small.js', 'app/js/jsfxr.js', 'app/js/soundManager.js', 'app/js/constants.js', 'app/js/ga.js', 'app/js/ga-extensions.js', 'app/js/levelManager.js', 'app/js/game.js'], // All your JS files to be combined and minified
    img_files = ['app/assets/*.png','app/assets/*.jpg','app/**/*.gif','app/assets/*.jpeg'];

var paths = {
	scripts : { src : ['app/scripts/*'], dest : 'build/js' },
	html: { src: 'app/*.html', dest: 'build' },
	assets: { src: ['src/**/*.png', 'src/**/?(*.mp3|*.ogg)'], dest: 'build' },
	open: 'build/index.html'
};

gulp.task('default', ['buildrun']);

// Zip up the JS/HTML required for the game
gulp.task('zip', function() {
    return gulp.src(zip_files, {
        base: "."
    }).pipe(zip('release.zip'))
        .pipe(gulp.dest('zip'));
});

// Run this task once the game is ready to ship!
gulp.task('publish', function() {
    runSequence('compress-images', 'combine-js', 'combine-html', 'combine-css', 'inject-html', 'zip');
});

// Compress Images
gulp.task('images', function(cb) {
    gulp.src(img_files)
        .pipe(gulp.dest('build/assets'))
        .on('end', cb)
        .on('error', cb);
});

gulp.task('build-css', function() {
    return gulp.src('app/s.css')
        .pipe(gulp.dest('build'));
})

// Minify the HTML
gulp.task('build-html', function() {
    return gulp.src('app/index.html')
        .pipe(minifyHTML()) 
        .pipe(gulp.dest('build'));
});

// Compress Images
gulp.task('compress-images', function(cb) {
    gulp.src(img_files).pipe(imageop({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('zip/assets'))
        .on('end', cb)
        .on('error', cb);
});

// Minify the HTML
gulp.task('combine-html', function() {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('zip'));
});

gulp.task('combine-css', function() {
  return gulp.src('app/s.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('zip'));
});

gulp.task('inject-html', function() {
    return gulp.src('zip/index.html')
        .pipe(inject(gulp.src(['zip/g.js']), {
            starttag: '<!-- inject:head:{{ext}} -->',
            transform: function (filePath, file) {
                // return file contents as string 
                return '<script>' + file.contents.toString('utf8') + '</script>';
            }
        }))
        .pipe(inject(gulp.src(['zip/s.css']), {
                starttag: '<!-- inject:head:{{ext}} -->',
                transform: function (filePath, file) {
                    // return file contents as string 
                    return '<style>' + file.contents.toString('utf8') + '</style>';
                }
            }))
        .pipe(minifyHTML())
        .pipe(gulp.dest('zip'));
});

// Build the JS and minify
gulp.task('combine-js', function() {
    return gulp.src(js_files)
        //.pipe(jshint())
        //.pipe(jshint.reporter('default')) // Report on errors found by jshint
        //.pipe(gp_uglify()) // Minify JS
        .pipe(gp_uglify().on('error', gutil.log))
        .pipe(gp_concat('g.js')) // Merge all the JS files into one game.js file
        .pipe(gulp.dest('zip'));
});

// Build the JS without minifying
gulp.task('build-dev', function() {
    return gulp.src(js_files)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(gp_concat('game.js'))
        .pipe(gulp.dest('build'));
});

// Watch for any JS or HTML file changes
gulp.task('watch', function() {
    watch(js_files, function() {
        runSequence('build-dev');
    });

    watch('./index.unmin.html', function() {
        runSequence('build-html');
    });
});

// ** Running ** //
gulp.task('run', function(){
	$.connect.server({
		root: [__dirname],
		port: 9999		
	});
	
	gulp.src(paths.open)
	.pipe($.open('', {url: 'http://localhost:9999/build/'}));
});

gulp.task('buildrun', function () {
	runSequence('clean', 'build-css', 'build-html', 'build-dev', 'images', 'run');
});

// ** Cleaning ** //
gulp.task('clean', function(){
	del(['build']);
});