var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('build', function () {
     return gulp.src('src/js/cocoon_facebook.js')
            .pipe(jshint())
            .pipe(jshint.reporter())
            .pipe(uglify())
            .pipe(gulp.dest('src/cordova/ios/www'))
            .pipe(gulp.dest('src/cordova/android/www'));
});
gulp.task('doc', ["build"], function() {

    var config = require('./doc_template/js/jsdoc.conf.json');

    var infos = {
        plugins: config.plugins
    }

    var templates = config.templates;
    templates.path = 'doc_template/js';

    return gulp.src("src/js/*.js")
      .pipe(jsdoc.parser(infos))
      .pipe(jsdoc.generator('dist/doc/js', templates));

});

gulp.task('default', ['build', 'doc']);
