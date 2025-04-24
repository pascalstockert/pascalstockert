import './style.css';

const preventDraggingOnElements = (query: string) => {
  document.querySelectorAll(query)
    .forEach(element => element.setAttribute('draggable', 'false'));
}

preventDraggingOnElements('img');

document.getElementById('babby')?.addEventListener('click', () => {
  console.log('clicked')
  document.startViewTransition(() => {
    window.location.href = '/content/scribbles/some-test-scribble';
  });
});

