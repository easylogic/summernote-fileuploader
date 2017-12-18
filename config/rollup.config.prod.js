import packageJSON from '../package.json'
import css from 'rollup-plugin-css-only'
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import minify from 'rollup-plugin-minify'


// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.js',
    format: 'umd'
  },
  plugins : [
    css({output : 'dist/' + packageJSON.name + '.css'}),
    babel({
      exclude: 'node_modules/**',
      presets : 'es2015-rollup'
    }),
    uglify(),
    minify({ iife : 'dist/' + packageJSON.name + '.min.js'})
  ]
};