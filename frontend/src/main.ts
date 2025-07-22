import './style.css';

import { CollectionName, createApi } from './api.ts';

const preventDraggingOnElements = (query: string) => {
  document.querySelectorAll(query)
    .forEach(element => element.setAttribute('draggable', 'false'));
}

preventDraggingOnElements('img');

const api = createApi();

const specificStory = await api.collection(CollectionName.STORIES).get('6859b1c28f62a03bb801a151');
console.log('specific story', specificStory);

const stories = await api.collection(CollectionName.STORIES).getAll();
console.log('fetched stories', stories);

const filteredStories = await api.collection(CollectionName.STORIES).filter({test: 'test'}).get();
console.log('filtered stories', filteredStories);
