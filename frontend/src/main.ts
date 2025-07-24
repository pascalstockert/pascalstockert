import './style.css';

import { CollectionName, createApi, Project } from './api.ts';
import { createProjectElement } from './components/project.ts';

const preventDraggingOnElements = (query: string) => {
  document.querySelectorAll(query)
    .forEach(element => element.setAttribute('draggable', 'false'));
}

preventDraggingOnElements('img');

const api = createApi();

const projects = await api.collection<Project>(CollectionName.PROJECTS).getAll();
console.log('fetched projects', projects);

const projectAnchor = document.querySelector('#project-anchor');
if (projectAnchor) {
  projects
    .sort((a, b) => {
      if (a.sortIndex === null) {
        return 1;
      }

      if (b.sortIndex === null) {
        return -1;
      }

      return a.sortIndex < b.sortIndex ? -1 : 1;
    })
    .map((project) => createProjectElement(api, project))
    .forEach((projectElement) => {
      projectAnchor.appendChild(projectElement);
    })

  console.log(createProjectElement(api, projects[0]));
}
