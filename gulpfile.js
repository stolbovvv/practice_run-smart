
const DIST_FOLDER = "dist";
const SRC_FOLDER  = "src";

let path = {

    build: {
        html:   DIST_FOLDER + "/",
        css:    DIST_FOLDER + "/css/",
        js:     DIST_FOLDER + "/js/",
        img:    DIST_FOLDER + "/img/",
        fonts:  DIST_FOLDER + "/fonts/",
    },

    src: {
        html:   SRC_FOLDER + "/**/*.html",
        css:    SRC_FOLDER + "/scss/style.scss",
        js:     SRC_FOLDER + "/js/**/*.js",
        img:    SRC_FOLDER + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts:  SRC_FOLDER + "/fonts/**/*",
    },
    watch: {
        html:   SRC_FOLDER + "/**/*.html",
        css:    SRC_FOLDER + "/scss/**/*.scss",
        js:     SRC_FOLDER + "/js/**/*.js",
        img:    SRC_FOLDER + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + DIST_FOLDER + "/"
}

let { src, dest }   = require("gulp");
let gulp            = require ("gulp");
let browsersync     = require("browser-sync").create();
let del             = require("del");
let scss            = require("gulp-sass");
let autoprefixer    = require("gulp-autoprefixer");
let group_media     = require("gulp-group-css-media-queries");
let clean_css       = require("gulp-clean-css");
let rename          = require("gulp-rename");
let uglify          = require("gulp-uglify-es").default;
let imagemin        = require("gulp-imagemin");
let webp            = require("gulp-webp");
let webphtml        = require("gulp-webp-html");
// let webpcss        = require("gulp-webpcss");

function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: "./" + DIST_FOLDER + "/"
        },
        port:3000,
        notify:false
    })
}

function html() {
    return src(path.src.html)
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        // .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function iamges() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], iamges);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, iamges, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.iamges = iamges;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;