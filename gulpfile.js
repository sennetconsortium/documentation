const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const lang = require('./docs/lang/en.json')
const stylus = require('gulp-stylus')
const header = require('gulp-header')
const { exec } = require('child_process')

const pkg = require('./package.json')
const banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @date <%= date %>',
    ' */',
    ''
].join('\n')

function js(cb) {
    return gulp
        .src(['node_modules/babel-polyfill/dist/polyfill.js', 'src/js/*.js'])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false
                        }
                    ]
                ]
            })
        )
        .pipe(header(banner, { pkg, date: new Date() }))
        .pipe(gulp.dest('docs/js'))
}

gulp.task('js', js)

const locals = {
    _m: lang,
    _t: function (s, m) {
        m = m || {}
        return m[s] || s
    }
}

function html() {
    return gulp
        .src(['./src/pug/layouts/*.pug'])
        .pipe(
            pug({
                pretty: true,
                locals
            })
        )
        .pipe(gulp.dest('docs/_layouts/'))
}

gulp.task('html-layouts', html)

function html2() {
    return gulp
        .src(['./src/pug/docs/**/*.pug'])
        .pipe(
            pug({
                pretty: true,
                locals
            })
        )
        .pipe(gulp.dest('docs/'))
}

gulp.task('html-pages', html2)

function css() {
    return gulp
        .src('./src/styles/main.styl')
        .pipe(
            stylus({
                compress: true
            })
        )
        .pipe(header(banner, { pkg, date: new Date() }))
        .pipe(gulp.dest('docs/css/'))
}

gulp.task('css', css)

function touch() {
    try {
        exec('npm run css', (error, stdout, stderr) => {})
    } catch (e) {}
}

gulp.task('touch', touch)

exports.default = function () {
    gulp.watch('src/pug/**/*.pug', gulp.series(html, html2))
    gulp.watch('src/js/*.js', js)
    gulp.watch('src/styles/**/*.styl', touch)
}

// Site search 
const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom')
let searchDict = {}

function writeToFile(content, method = 'appendFile') {
    fs[method]('./docs/js/site-search-data.json', content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
    })
}

function createIndex(path, statsSync) {
    const urlPath = path.replace('docs/_site/', '')
    fs.readFile(path, 'utf8', (err, htmlString) => {
        
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            
            const headerTags = ['h1', 'h2', 'h3', 'h4']
            for (let tag of headerTags) {
                const headerCollection = doc.getElementsByTagName(tag)
                const headers = Array.from(headerCollection);
                if (headers.length) {
                    let content = ''
                    for (let h of headers) {
                        let title = h.textContent.replaceAll('"', "'").trim()
                        if (h.textContent != 'Table of Contents' && !searchDict[title+urlPath]) {
                            content += `{
                                "title": "${title}",
                                "mod": "${statsSync.mtime}",
                                "tag": "${tag}",
                                "tagId": "${h.getAttribute('id')}",
                                "path": "/${urlPath}"
                            },`
                            searchDict[title+urlPath] = true
                        }
                        
                    }
                    writeToFile(content)
                }
            }
            
        });
}

function getAllFilesRecursively(directoryPath) {
    let filePaths = [];
    const filesAndFolders = fs.readdirSync(directoryPath);

    for (const item of filesAndFolders) {
        const fullPath = path.join(directoryPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isFile()) {
            filePaths.push(fullPath);
        } else if (stats.isDirectory()) {
            filePaths = filePaths.concat(getAllFilesRecursively(fullPath));
        }
    }
    
    for (let f of filePaths) {
        if ( f.indexOf('.html') > -1) {
            let statsSync = {}
            let md = f.replace('_site/', '')
            try {
                statsSync = fs.statSync(md.replace('.html', '.md'))
            } 
            catch (err) {
                statsSync = fs.statSync(md)
                console.error('Error getting file stats synchronously:', err);
            }

            createIndex(f, statsSync)
            
        }
    }

    return filePaths;
}

function buildSearchIndicies(done) {
    writeToFile('[', 'writeFile')
    getAllFilesRecursively('./docs/_site')
    done()
}

function endBuildSearchIndicies(done) {
    writeToFile('{}]')
    done()
}

gulp.task('search', buildSearchIndicies)
gulp.task('searchEnd', endBuildSearchIndicies)