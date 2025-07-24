import { createApi, Project } from '../api.ts';

export const createProjectElement = (api: ReturnType<typeof createApi>, project: Project): ChildNode => {
  const imagePath = api.asset(project.preview._id, {width: 400}).get();

  const htmlString = `
  <div 
    class="flex flex-col p-4 rounded-2xl md:grid md:grid-cols-[1fr_8px_1fr] md:gap-8"
    style="background: ${getColor({...project.color, a: .4})};"
  >
    <div class="max-h-[256px] border border-black overflow-y-scroll md:overscroll-contain rounded-xl">
      <img
        src="${imagePath}"
        alt="Screenshot of ${project.title}"
        class="w-full h-auto"
      />
    </div>

    <div class="flex gap-2 h-full p-8 hidden md:block md:flex-col md:px-0">
      <div 
        class="flex-1 w-2 h-2 rounded-lg md:h-full"
        style="background: ${getColor({...project.color, a: .4})};"
      ></div>
    </div>

    <div class="flex flex-col gap-4 p-2 md:p-0">
      <h3 class="pt-2">${project.title}</h3>
      <p>${project.builtWith}</p>
      <p>${project.description}</p>
      <div class="flex gap-2">
        <a 
          href="https://yolol.pasu.me" 
          target="_blank" 
          class="p-1 rounded-lg"
          style="background: ${getColor({...project.color, a: .4})};"
        >
          <img src="/icon/link-light.svg" alt="link to website" />
        </a>
        <a 
          href="https://github.com/pascalstockert/yolol" 
          target="_blank" 
          class="p-1 rounded-lg"
          style="background: ${getColor({...project.color, a: .4})};"
        >
          <img src="/icon/gh-light.svg" alt="link to github" />
        </a>
      </div>
    </div>
  </div>
  `;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  return doc.body.firstChild!;
}

const getColor = ({r, g, b, a}: {r: number, g: number, b: number, a: number}) =>
  `rgb(${r} ${g} ${b} / ${a ?? 1})`;
