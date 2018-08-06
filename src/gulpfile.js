var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var data = require('./mock/data/data.json');
var minJs = require('gulp-uglify');
// var minCss = require('gulp-min-css');
gulp.task('server', function () {
    gulp.src('mock')
        .pipe(server({
            port:8800,
            open:true,
            middleware: function (req, res, next) {
                var pathname = require('url').parse(req.url).pathname;
                if (req.url === '/favicon.ico') {
                    return;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                if (pathname === '/api/dataList') {
                    res.end(JSON.stringify(data))
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'mock', pathname)))
                }
            }
        }))
})
//压缩
gulp.task('js', function () {
    gulp.src('mock/js/flexible.js')
        .pipe(minJs())
        .pipe(gulp.dest('mock/min'))
})
// gulp.task('css', function () {
//     gulp.src('mock/sass/style.css')
//         .pipe(minCss())
//         .pipe(gulp.dest('mock/min'))
// })
// watch 自动刷新
gulp.task('watchs', function () {
    gulp.watch('mock/sass/style.scss', ['server'])
})
gulp.task('default', function () {
    gulp.src('mock', ['server', 'js'])
})