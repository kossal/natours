import {src, dest, series, parallel} from 'gulp';
import {styles} from './styles.babel';
import newer from 'gulp-newer';

const srcDir = [
    './src/**/*.html',
    './src/css/styles.min.css',
    './src/css/fonts/**/*',
    '!./src/css/fonts/**/*.css',
    './src/img/**/*'
];

const srcToDist = () => {

    return src(srcDir, {base: './src'})
        .pipe(newer('./dist'))
        .pipe(dest('./dist'));

};

const dist = series(styles, srcToDist);


export {dist};