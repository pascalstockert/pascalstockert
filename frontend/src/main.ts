import './style.css';

import { CollectionName, createApi } from './api.ts';

const preventDraggingOnElements = (query: string) => {
  document.querySelectorAll(query)
    .forEach(element => element.setAttribute('draggable', 'false'));
}

preventDraggingOnElements('img');

const api = createApi();

const projects = await api.collection(CollectionName.PROJECTS).getAll();
console.log('fetched projects', projects);
