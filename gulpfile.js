const { src, dest, parallel, watch } = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const reporter = require('postcss-reporter');
const cssnext = require('postcss-cssnext');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;

const styles = () => {
  const processors = [
    cssnext({browsers: ['last 2 versions']}),
    cssnano({
      discardComments: {
        removeAll: true
      }
    }),
    reporter()
  ];
  return src([
      './node_modules/normalize.css/normalize.css',
      './node_modules/milligram/dist/milligram.css',
      './assets/css/style.css'
    ])
    .pipe(concat('style.min.css'))
    .pipe(postcss(processors))
    .pipe(dest('./public/css'))
};

const scripts = () => {
  return pipeline(
    src([
      './node_modules/clipboard/dist/clipboard.js',
      './assets/js/main.js'
    ]).pipe(concat('main.min.js')),
    uglify(),
    dest('./public/js')
  )
};

const watchTask = () => {
  return watch(['./assets/*/*.*'], (cb) => { cb() });
};

const develop = () => {
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
};

exports.styles = styles;
exports.scripts = scripts;
exports.develop = develop;
exports.watch = watchTask;
exports.default = parallel(styles, scripts, develop, watchTask);
