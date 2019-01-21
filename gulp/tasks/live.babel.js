import {src, watch, series, parallel} from 'gulp';
import {styles} from './styles.babel';
import browser from 'browser-sync';

const server = browser.create();

const liveServer = () => {

    server.init({
        notify: false,
        server: {
            baseDir: './src'
        }
    });

};

const watchHtml = () => {
    
    watch('./src/**/*.html', done => {
        server.reload();
        done();
    });

};

const injectCSS = () => {
    
    return src('./src/css/styles.min.css')
        .pipe(server.stream());

};

const watchCSS = () => {
    
    watch('./src/sass/**/*.scss', series(styles, injectCSS));

};

const live = parallel(liveServer, watchHtml, watchCSS);

export {live};
   

