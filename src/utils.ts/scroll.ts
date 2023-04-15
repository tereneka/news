function checkPosition(
  func: () => void,
  shouldLoad: boolean
) {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;

  const threshold = height * 0.9;

  const position = scrolled + screenHeight;

  if (position >= threshold && shouldLoad) {
    func();
  }
}

function throttle(
  callee: (...args: any[]) => void,
  timeout: number
) {
  let timer: any = null;

  return function perform(...args: any[]) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

export { checkPosition, throttle };
