export enum CollectionName {
  STORIES = 'stories',
  THOUGHTS = 'thoughts',
}

export type Filter = any;

const getUrl = async <T = any>(url: string, filter?: object): Promise<T> => {
  console.log(JSON.stringify(url));
  console.log(JSON.stringify(filter));
  const res = await fetch(url);

  return await res.json();
};

const applyFilter = (callback: <T = any>(filter: Filter) => Promise<T>, filter: Filter) => {
  return {
    get: <T = any>() => callback<T>(filter)
  }
}

const collectionPrototype = (host: string, collectionName: string) => {
  const bulkEndpoint = `${host}/content/items/${collectionName}`;
  const singletonEndpoint = `${host}/content/item/${collectionName}`;

  return {
    get: <T = any>(id: string) => getUrl<T>(`${singletonEndpoint}/${id}`),
    getAll: <T = any>() => getUrl<T>(bulkEndpoint),
    filter: (filterObj: Filter) => applyFilter((filter) => getUrl(bulkEndpoint, filter), filterObj),
  };
};


export const createApi = (host = 'https://cockpit.box.pasu.me/api') => {
  return {
    collection: (name: string) => collectionPrototype(host, name),
  }
};
