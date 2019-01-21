import {src, dest} from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import cssimport from 'gulp-cssimport';
//import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';

const styles = () => {

    return src('./src/sass/main.scss')
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({browsers: 'last 2 version'}))
        .pipe(cssimport({includePaths: ['node_modules', './src/css/fonts']}))
        .pipe(rename({
            basename: 'styles',
            extname: '.css'
        }))
        .pipe(dest('./src/css'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(dest('./src/css'));

};


export {styles};

