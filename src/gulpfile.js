var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var data = require('./mock/data/data.json')
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