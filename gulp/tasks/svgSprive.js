import svgSprite from 'gulp-svg-sprite';

export const svgSpriteIcons = () => (
  app.gulp.src(`${app.path.src.svgsprites}`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SVG',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: `../img/sprites/sprite.svg`,
          // example: true, // Создавать страницу с перечнем иконок
        },
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name'],
                  },
                },
                {
                  removeUselessStrokeAndFill: false,
                },
                {
                  inlineStyles: true,
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}`))
);

export const svgSpriteIconsNoattr = () => (
  app.gulp.src(`${app.path.src.svgspritesnoattr}`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SVG',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: `../img/sprites/sprite-noattr.svg`,
        },
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name', 'fill', 'stroke.*'],
                  },
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}`))
);
