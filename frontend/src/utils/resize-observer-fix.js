// src/utils/resize-observer-fix.js

const observerErrorHandler = () => {
  const ro = new ResizeObserver(() => {
    // ничего не делаем, просто перезапускаем цикл
  });
  ro.observe(document.body);
};

requestAnimationFrame(() => {
  observerErrorHandler();
});
