import packageJSON from '../package.json'
import css from 'rollup-plugin-css-only'
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.js',
    format: 'umd'
  },
  plugins : [
    serve(),
    livereload({watch: 'dist'}),
    css({output : 'dist/' + packageJSON.name + '.css'}),
    babel({
      exclude: 'node_modules/**',
      presets : 'es2015-rollup'
    })
  ],
  watch: {
    chokidar: {
      // if the chokidar option is given, rollup-watch will
      // use it instead of fs.watch. You will need to install
      // chokidar separately.
      //
      // this options object is passed to chokidar. if you
      // don't have any options, just pass `chokidar: true`
    },

    // include and exclude govern which files to watch. by
    // default, all dependencies will be watched
    exclude: ['node_modules/**']
  }
};