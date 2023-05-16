// import fileInclude from 'gulp-file-include';
import webpHtmlNoSvg from 'gulp-webp-html-nosvg';

export const html = () => {
  return app.gulp.src([app.path.src.html, "!./src/html/_*.html", "!./src/html/blocks/*.html", "!./src/html/base/*.html"])
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      }))
    )
    // .pipe(fileInclude()) // в pug'е не нужен
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(
      app.plugins.if(
        app.isWebp,
        webpHtmlNoSvg())
      )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
}
