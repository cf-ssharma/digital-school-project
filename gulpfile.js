var gulp = require('gulp'),
    minifyJS = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-htmlmin'),
    browserSync = require('browser-sync'),
    jshint=require('gulp-jshint'),
    less = require('gulp-less'),
    autoprefix = require('gulp-autoprefixer'),
    revall = new(require('gulp-rev-all'))({
        dontRenameFile: [/^\/index\.html$/],
        transformFilename: function(file, hash) {
            return hash + file.path.slice(file.path.lastIndexOf('.'));
        }
    }),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    deleteFile = require('del'),

    SRC = 'app',
    DIST = 'build',
    REQUIREJS = 'build-requirejs',
    CDN = 'cdn',

    paths = {

        js: [
            REQUIREJS + '/**/*.js'
        ],

        cssFiles: [REQUIREJS + '/**/*.css'],

        htmlFiles: REQUIREJS + '/**/*.html',

        imageFiles: REQUIREJS + '/**/*.{png,jpg,gif}',

        copyFiles: [REQUIREJS + '/**/*', '!' + REQUIREJS + '/**/*.{js,css,html}', '!' + REQUIREJS + '/build.txt']
    };

function clean(cb) {
    deleteFile([DIST, REQUIREJS, CDN], cb);
}

function js() {
    return gulp.src(paths.js)
        .pipe( changed( DIST ) )
        .pipe(minifyJS())
        .pipe(gulp.dest(DIST));
}

function css() {
    return gulp.src(paths.cssFiles)
        .pipe( changed( DIST ) )
        .pipe(minifyCSS())
        .pipe(gulp.dest(DIST));
}

function html() {
    return gulp.src(paths.htmlFiles, {
            base: REQUIREJS
        })
        .pipe( changed( DIST ) )
        .pipe(minifyHTML({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(DIST));
}

function copy() {
    return gulp.src(paths.copyFiles)
        .pipe( changed( DIST ) )
        .pipe(gulp.dest(DIST));
}

function md5() {
    return gulp.src(DIST + '/**')
        .pipe(revall.revision())
        .pipe(gulp.dest(CDN));
    //.pipe( revall.manifestFile() )
    //.pipe( gulp.dest( CDN ) );
}

function requirejs(done) {
    var r = require('requirejs');
    r.optimize({
        appDir: SRC,
        baseUrl: './',
        dir: REQUIREJS,
        optimize: 'none',
        optimizeCss: 'none',
        removeCombined: true,
        mainConfigFile: SRC + '/bootstrap.js',
        modules: [{
            name: "bootstrap"
        }],
        logLevel: 1
    }, function() {
        done();
    });
}
function sync() {
    //静态服务器监听
    var files = [
        'app/**/*.html',
        'app/styles/**/*.css',
        'app/images/**/*.{png,jpg,gif}',
        'app/**/*.js'
    ];
    browserSync.init(files, {
        server: {
             baseDir: './app'
        }
    });
    //代理服务器监听
//     var files = [
//         '/Digital_School/app/**/*.html',
//         '/Digital_School/app/styles/**/*.css',
//         '/Digital_School/app/images/**/*.{png,jpg,gif}',
//         '/Digital_School/app/**/*.js'
//     ];
//     browserSync.init(files, {
//         proxy: "http://localhost:8080"
//     });
    gulp.watch("app/less/*.less", ['less']);
    gulp.watch("app/**/*js", ['js-watch']);
    gulp.watch(files).on('change', browserSync.reload);
}
gulp.task('less', function() {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(autoprefix('last 20 version', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.stream());
});
//JS代码质量检测任务.
// gulp.task('jshint', function () {
//     return gulp.src('app/**/*js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });
//创建js-watch任务确保jsjshint任务在重载浏览器前完成
// gulp.task('js-watch', ['jshint'], browserSync.reload);
gulp.task('js-watch',[],browserSync.reload);
// 浏览器视图更新任务
gulp.task('browser-sync', ['less'], sync);
// 加载requirejs模块任务
gulp.task('requirejs', requirejs);
//md5加密文件任务
gulp.task('md5', ['requirejs'], md5);
//删除build，build-requirejs，cdn文件夹任务
gulp.task('clean', clean);
//js代码压缩混淆任务
gulp.task('js', ['requirejs'], js);
//css代码压缩混淆任务
gulp.task('css', ['requirejs'], css);
//html代码压缩任务
gulp.task('html', ['requirejs'], html);
//把build-requirejs文件拷贝到build文件夹
gulp.task('copy', ['requirejs'], copy);
// 默认全局监视任务
gulp.task('default', ['browser-sync']);
//输出构建所有代码任务
gulp.task('build', ['js', 'css', 'html', 'copy'], function(done) {
    //requirejs( function () {
    md5().on('finish', done);
    //} );
});