var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    merge = require('merge-stream'),
    jsdoc = require("gulp-jsdoc"),

    DEST = '',
    VERSION = "1.2.0";

gulp.task('default', ['minifyJS', 'minifyCSS']);

gulp.task('minifyJS', function(){
    return merge(
        gulp.src('../src/konsole.js')
            .pipe(uglify())
            .pipe(rename({ extname: '-'+VERSION+'.min.js' }))
            .pipe(gulp.dest(DEST)),

        gulp.src(['../vendor/prettify.js', '../src/konsole.js'])
            .pipe(concat('konsole-'+VERSION+'.bundled.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(DEST)),

        gulp.src('../src/nokonsole.js')
            .pipe(uglify())
            .pipe(rename({ extname: '-'+VERSION+'.min.js' }))
            .pipe(gulp.dest(DEST))
    );
});

gulp.task('minifyCSS', function(){
    return merge(
        gulp.src('../css/konsole.css')
            .pipe(minifyCSS())
            .pipe(rename({ extname: '-'+VERSION+'.min.css' }))
            .pipe(gulp.dest(DEST)),

        gulp.src(['../css/prettify.css', '../css/konsole.css'])
            .pipe(concat('konsole-'+VERSION+'.bundled.min.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest(DEST))
    );
});

gulp.task('generateDocs', function(){
    return gulp.src(['../src/konsole.js', '../README.md'])
        .pipe(jsdoc('../docs', {
            path: 'jsdoc_template',
            applicationName: 'Konsole.js',
            meta: {
                title: 'Konsole.js Reference',
                description: "An On-Screen Browser Console and/or default console replacement/alternative",
                keyword: "browser, web, screen, console, debugging, javascript, js"
            }
        })
    );
});