import { Thought } from '../types/project.types.ts';
import { DocumentMeta } from '@pasu/cockpit-client';

export const createThoughtElement = (thought: DocumentMeta<Thought>): ChildNode => {
  const htmlString = `
  <a href="/ideas/${thought._id}" class='flex flex-col gap-3 p-4 border border-black rounded-xl no-underline'>
    <h3>${thought.title}</h3>
    <p class="grow">${thought.teaser}</p>
    <div class="flex gap-2">
      ${
        thought.tags.map(tag => `<div class="px-2 py-1 text-white bg-black/40 rounded-md">${tag}</div>`)
      }
    </div>
  </a>
  `;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  return doc.body.firstChild!;
}
