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
    getAll: () => getUrl<T>(bulkEndpoint),
    filter: (filterObj: Filter) => applyFilter((filter) => getUrl<T>(bulkEndpoint, filter), filterObj),
  };
};

export const createApi = (host = 'https://cockpit.box.pasu.me/api') => {
  return {
    collection: (name: string) => collectionPrototype(host, name),
  }
};
