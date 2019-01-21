import {src, series} from 'gulp';
import log from 'fancy-log';
import ftp from 'vinyl-ftp';
import {dist} from './dist.babel';
import {host, user, password, port} from './../ftp_settings';

const conn = ftp.create( {
    host:     host,
    user:     user,
    password: password,
    port: port,
    parallel: 10,
    log: log
});

const srcDir = {
    globs: [
        './dist/**/*'
    ],
    base: './dist'
};

const deployFTP = () => {

    // using base = '.' will transfer everything to /public_html correctly
        // turn off buffering in gulp.src for best performance
    
        return src( srcDir.globs, {base: srcDir.base, buffer: false})
            .pipe( conn.newer( '/public_html' ) ) // only upload newer files
            .pipe( conn.dest( '/public_html' ) );

};

const deploy = series(dist, deployFTP);

export {deploy};