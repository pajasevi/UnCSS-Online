var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  reporter = require('postcss-reporter'),
  cssnext = require('postcss-cssnext'),
  uglify = require('gulp-uglify');

gulp.task('styles', function () {
  var processors = [
    cssnext({browsers: ['last 2 versions']}),
    cssnano({
      discardComments: {
        removeAll: true
      }
    }),
    reporter()
  ];
  return gulp.src([
      './node_modules/normalize.css/normalize.css',
      './node_modules/milligram/dist/milligram.css',
      './assets/css/style.css'
    ])
    .pipe(concat('style.min.css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  return gulp.src([
      './node_modules/es6-promise/dist/es6-promise.js',
      './node_modules/whatwg-fetch/fetch.js',
      './node_modules/clipboard/dist/clipboard.js',
      './assets/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload());
})

gulp.task('watch', function() {
  gulp.watch('./assets/*/*.*', ['styles', 'scripts']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js handlebars coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'styles',
  'scripts',
  'develop',
  'watch'
]);
