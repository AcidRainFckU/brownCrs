const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

const path = require("./config/path");
const app = require("./config/app");

const clear = require("./tusk/clear");
const html = require("./tusk/html");
const scss = require("./tusk/scss");
const js = require("./tusk/js");
const img = require("./tusk/img");

const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
};

const build = series(clear, parallel(html, scss, js, img));
const dev = series(build, parallel(watcher, server));

exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;

exports.default = app.isProd ? build : dev;
