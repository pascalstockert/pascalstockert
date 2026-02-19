import './style.css';

import { createClient } from '@pasu/cockpit-client';

import { CollectionName, Project, Thought } from './types/project.types.ts';
import { createProjectElement } from './components/project.ts';
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

const scrollContainers: HTMLElement[] = Array.from(document.getElementsByClassName('scroll-container')) as HTMLElement[];
scrollContainers.forEach((scrollContainer) => {
  const track = document.createElement('div');
  track.classList.add('track');

  const scaleRatio = scrollContainer.clientHeight / scrollContainer.scrollHeight;
  const thumb = document.createElement('div');
  thumb.classList.add('thumb');
  thumb.style.height = scrollContainer.clientHeight * scaleRatio + 'px';
  if (scrollContainer.dataset.scrollThumbColor) {
    thumb.style.backgroundColor = scrollContainer.dataset.scrollThumbColor;
  }

  track.appendChild(thumb);
  scrollContainer.appendChild(track);

  track.style.top = scrollContainer.scrollTop + 'px';
  thumb.style.marginTop = scrollContainer.scrollTop * scaleRatio + 'px';

  const createNewTimer = (thumbElementRef: HTMLDivElement): NodeJS.Timeout => {
    return setTimeout(() => {
      thumbElementRef.style.opacity = '0';
    }, 1000)
  }

  let opacityTimer = createNewTimer(thumb);

  scrollContainer.addEventListener('scroll', () => {
    thumb.style.opacity = '1';
    clearTimeout(opacityTimer);
    opacityTimer = createNewTimer(thumb);

    track.style.top = scrollContainer.scrollTop + 'px';
    thumb.style.marginTop = scrollContainer.scrollTop * scaleRatio + 'px';
  });
});
