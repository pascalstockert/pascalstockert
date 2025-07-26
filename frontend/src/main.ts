import './style.css';

import { createApi } from './api.ts';
import { createProjectElement } from './components/project.ts';
import { CollectionName, Project } from './types/project.types.ts';

const preventDraggingOnElements = (query: string) => {
  document.querySelectorAll(query)
    .forEach(element => element.setAttribute('draggable', 'false'));
}

preventDraggingOnElements('img');

const api = createApi('https://cockpit.box.pasu.me/api');

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
