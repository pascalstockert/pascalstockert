import './style.css';

import { createProjectElement } from './components/project.ts';
import { CollectionName, Project } from './types/project.types.ts';

import { createClient } from '@pasu/cockpit-client';

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

const preventDraggingOnElements = (query: string) => {
  document.querySelectorAll(query)
    .forEach(element => element.setAttribute('draggable', 'false'));
}

preventDraggingOnElements('img');
