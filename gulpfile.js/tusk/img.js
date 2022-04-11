const { src, dest } = require("gulp");

const path = require("../config/path");
const app = require("../config/app");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpif = require("gulp-if");

const img = () => {
  return src(path.img.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(newer(path.img.dest))
    .pipe(webp())
    .pipe(dest(path.img.dest))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(
      gulpif(
        app.isProd,
        imagemin({
          interlaced: true,
          progressive: true,
          optimizationLevel: 5,
          svgoPlugins: [
            {
              removeViewBox: true,
            },
          ],
        })
      )
    )
    .pipe(dest(path.img.dest));
};

module.exports = img;
