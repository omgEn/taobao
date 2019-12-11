var gulp = require('gulp');
var load = require('gulp-load-plugins')();
var browser = require('browser-sync').create();
//var imagemin = require('gulp-imagemin');
gulp.task('font',function(done){
    gulp.src('./src/font/**')
    // .pipe(imagemin())
    .pipe(gulp.dest('./dist/font'));
    done();

})
gulp.task('sass',function(done){
    gulp.src('./src/css/*.scss')
    .pipe(load.sass())
    .pipe(gulp.dest('./dist/css'));
    done();
})
gulp.task('css',function(done){
    gulp.src('./src/css/*.css')
    .pipe(load.minifyCss())
    .pipe(gulp.dest('./dist/css'));
    done();
})
gulp.task('html',function(done){
    gulp.src('./src/html/*.html')
    // .pipe(load.minifyHtml())
    .pipe(gulp.dest('./dist/html/'));
    done();
})
gulp.task('index',function(done){
    gulp.src('./src/*.html')
    // .pipe(load.minifyHtml())
    .pipe(gulp.dest('./dist/'));
    done();
})
gulp.task('js',function(done){
    gulp.src('./src/js/*.js')
    // .pipe(load.babel({
    //     'presets':['@label/env']
    // }))
    // .pipe(load.concat('all.min.js'))
    // .pipe(load.uglify())
    .pipe(gulp.dest('./dist/js/'));
    done();
})
gulp.task('image',function(done){
    gulp.src('./src/images/**')
    // .pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'));
    done();
})

gulp.task('save',gulp.series(gulp.parallel('html','js','sass','image','html','index'),function(done){
	browser.reload()
	done()
}))
gulp.task('server',gulp.series(gulp.parallel('html','sass','js','image','html','index'),function(done){
    browser.init({
        server:'./dist/',
        port:88
    })
    gulp.watch('./src/',gulp.series('save'));
}))