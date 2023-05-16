import LazyLoad from 'vanilla-lazyload';

const lazyContent = new LazyLoad({
  elements_selector: '[data-src],[data-srcset],[data-bg]',
  class_loaded: '_lazy-loaded',
  use_native: true // use_native: true = Ленивая загрузка
});

const lazyBackground = new LazyLoad({
  elements_selector: '[data-bg], [data-bg-hidpi], [data-bg-multi]',
  class_loaded: '_lazy-loaded',
  use_native: false // use_native: false = отложенная(исп-я для bg)
});

// Вызвать, если появится больше DOM, например, через вызов AJAX
// lazyContent.update();
