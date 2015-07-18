module.exports = {

  defaults: {
    show: false
  },

  scripts: {
    src: ['./examples/public/lib/TableMultiRowSelect.js','./gulpfile.js']
  },

  browserify: {
    src:      './examples/app.js',
    dest:     './examples/public/js',
    filename: 'app.js'
  },

  build: {
    lib: {
      src:       ['./examples/public/lib/TableMultiRowSelect.js'],
      dest:      './examples/public/lib',
      filename : 'TableMultiRowSelect.min.js',
      dist:      './dist'
    }
  },

  watch: {
    browserify: ['./examples/js/app.js','./src/**/*.js'],
    uglify:     ['./examples/lib/**/*.js'],
    scripts:    ['./examples/public/lib/TableMultiRowSelect.js','./gulpfile.js']
  }

};
