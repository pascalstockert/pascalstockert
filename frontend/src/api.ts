export enum DocumentType {
  STORIES = 'stories',
  THOUGHTS = 'thoughts',
}

export interface RequestPrototype {
  method: 'GET' | 'POST';
  host: string;
  type: DocumentType;
  options?: {
    filter?: {[key: string]: string};
  }
}

export const createApi = (host = 'https://cockpit.box.pasu.me/api') => {
  const createRequest = (method: 'GET' | 'POST', type: DocumentType): RequestPrototype => ({
    method,
    host,
    type,
  });



  const get = (type: DocumentType) => {
    return createRequest('GET', type)
  };

  return {
    get,
  }
}
