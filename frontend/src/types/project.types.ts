import { Asset } from './api.types.ts';

export interface Project {
  sortIndex: number;
  title: string;
  description: string;
  builtWith: string;
  preview: Asset;
  links: {[key in LinkOrigin]: string};
  color: {r: number; g: number; b: number};
}

export enum LinkOrigin {
  WEB = 'web',
  GITHUB = 'github',
}

export enum CollectionName {
  PROJECTS = 'projects',
  STORIES = 'stories',
  THOUGHTS = 'thoughts',
}