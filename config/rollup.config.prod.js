import packageJSON from '../package.json'
import scss from 'rollup-plugin-scss'
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import minify from 'rollup-plugin-minify'
import resolve from 'rollup-plugin-node-resolve';


// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.js',
    format: 'umd'
  },
  plugins : [
    resolve(),
    scss({output : 'dist/' + packageJSON.name + '.css'}),
    babel({
      exclude: 'node_modules/**',
      presets : 'es2015-rollup'
    }),
    uglify(),
    minify({ iife : 'dist/' + packageJSON.name + '.min.js'})
  ]
};