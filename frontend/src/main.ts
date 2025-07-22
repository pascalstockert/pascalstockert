import './style.css';

import { createApi, DocumentType } from './api.ts';

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

const api = createApi();
const storiesResponse = await api.get(DocumentType.STORIES).all();
const stories = await storiesResponse.json();
console.log(stories)

