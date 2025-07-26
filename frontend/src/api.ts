export interface Project {
  sortIndex: number;
  title: string;
  description: string;
  builtWith: string;
  preview: {
    _id: string;
  };
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

export type Filter = any;

const getUrl = async <T = any>(url: string, filter?: object): Promise<T> => {
  // TODO convert filter to query param
  console.log(JSON.stringify(filter));
  const res = await fetch(url);

  return await res.json();
};

const applyFilter = <T = any>(callback: (filter: Filter) => Promise<T>, filter: Filter) => {
  return {
    get: () => callback(filter),
  }
}

const collectionPrototype = <T = any>(host: string, collectionName: string) => {
  const bulkEndpoint = `${host}/content/items/${collectionName}`;
  const singletonEndpoint = `${host}/content/item/${collectionName}`;

  return {
    get: (id: string) => getUrl<T>(`${singletonEndpoint}/${id}`),
    getAll: () => getUrl<Array<T>>(bulkEndpoint),
    filter: (filterObj: Filter) => applyFilter((filter) => getUrl<Array<T>>(bulkEndpoint, filter), filterObj),
  };
};

interface AssetOptions {
  width: number;
}

const getAssetPath = (host: string, assetId: string, options?: AssetOptions): string => {
  const query = new URLSearchParams();
  query.set('w', String(options?.width ?? 800));
  query.set('o', '1');

  return `${host}/assets/image/${assetId}?${query.toString()}`;
};

const assetPrototype = (host: string, assetId: string, options?: AssetOptions) => {
  return {
    get: () => getAssetPath(host, assetId, options),
  }
}

export const createApi = (host = 'https://cockpit.box.pasu.me/api') => {
  return {
    asset: (assetId: string, options?: AssetOptions) => assetPrototype(host, assetId, options),
    collection: <T = any>(name: string) => collectionPrototype<T>(host, name),
  }
};

