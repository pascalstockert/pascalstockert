import { createApi, LinkOrigin, Project } from '../api.ts';

export const createProjectElement = (api: ReturnType<typeof createApi>, project: Project): ChildNode => {
  const imagePath = api.asset(project.preview._id, {width: 512}).get();

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

    <div class="flex gap-2 h-full p-8 md:block md:flex-col md:px-0">
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
        ${
          (Object.keys(project.links) as LinkOrigin[])
            .map((kind) => getLinkElementString(kind, project.links[kind], {...project.color, a: .4}))
            .join('\n')
        }
      </div>
    </div>
  </div>
  `;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  return doc.body.firstChild!;
}

const getLinkElementString = (kind: LinkOrigin, link: string, color: {r: number, g: number, b: number, a: number}): string => {
  const iconMap: { [key in LinkOrigin]: {link: string; alt: string;} } = {
    [LinkOrigin.WEB]: {link: '/icon/link-light.svg', alt: 'link to a website'},
    [LinkOrigin.GITHUB]: {link: '/icon/gh-light.svg', alt: 'link to github'},
  };

  return `
  <a 
    href="${link}"
    target="_blank"
    class="p-1 rounded-lg"
    style="background: ${getColor(color)};"
  >
    <img src="${iconMap[kind].link}" alt="${iconMap[kind].alt}" />
  </a>
  `;
};

const getColor = ({r, g, b, a}: {r: number, g: number, b: number, a: number}) =>
  `rgb(${r} ${g} ${b} / ${a ?? 1})`;
