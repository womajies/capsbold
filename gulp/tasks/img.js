import webp from 'gulp-webp';
import imagemin, { gifsicle, optipng, svgo } from 'gulp-imagemin';
import pngquant from "imagemin-pngquant";
import imageminJpegRecompress from "imagemin-jpeg-recompress";

export const img = () => {
  return app.gulp.src(app.path.src.img)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'IMG',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(webp({quality: 90}))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.img))
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin([
          gifsicle({interlaced: true}),
          imageminJpegRecompress({
              progressive: true,
              accurate: true,
              subsample: "disable",
              max: 80,
              min: 70
          }),
          svgo(),
          optipng({optimizationLevel: 1}),
          pngquant({quality: [0.8, 0.9], speed: 3})
        ])
      )
    )
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.plugins.browsersync.stream());
}