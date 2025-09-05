import './style.css';

import { createProjectElement } from './components/project.ts';
import { CollectionName, Project, Thought } from './types/project.types.ts';

import { createClient } from '@pasu/cockpit-client';
import { createThoughtElement } from './components/thought.ts';

const api = createClient('https://cockpit.evo.pasu.me/api');

const projects = await api
  .collection<Project>(CollectionName.PROJECTS)
  .query({
    limit: 3,
    sort: {
      sortIndex: 1
    }
  });

const projectAnchor = document.querySelector('#project-anchor');
if (projectAnchor) {
  projects
    .map((project) => createProjectElement(api, project))
    .forEach((projectElement) => {
      projectAnchor.appendChild(projectElement);
    });
}

const thoughts = await api
  .collection<Thought>(CollectionName.THOUGHTS)
  .query({
    limit: 3,
  });
console.log(thoughts);
const thoughtAnchor = document.querySelector('#thought-anchor');
if (thoughtAnchor) {
  thoughts
    .map(thought => createThoughtElement(thought))
    .forEach((thoughtElement) => {
      thoughtAnchor.appendChild(thoughtElement)
    })
}

const preventDraggingOnElements = (query: string) => {
  document.querySelectorAll(query)
    .forEach(element => element.setAttribute('draggable', 'false'));
}

preventDraggingOnElements('img');
