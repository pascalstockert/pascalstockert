function execWithSpoofedPath(path: string, fn: () => any): void {
  const previousPath = window.location.pathname;
  history.pushState({}, '', path);
  fn();
  history.pushState({}, '', previousPath);
}

execWithSpoofedPath('/src/scribble/index.html/abc', () => {
  const paths = window.location.pathname.split('/');
  const scribbleId = paths[paths.length - 1];

  console.log(scribbleId);
})
