import { API } from '../api/Api';

interface dataFetch {
  url: string;
  body?: Record<string, any>;
  authorization?: string;
}

export class dataFetching implements dataFetch {
  constructor(public url: string, public body?: Record<string, any>, public authorization?: string) {}

  public getData = async () => {
    return await fetch(`${API}${this.url}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        authorization: this.authorization ? this.authorization : '',
      },
    }).then((res) => res.json());
  };

  public postData = async () => {
    return await fetch(`${API}${this.url}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        authorization: this.authorization ? this.authorization : '',
      },
      body: JSON.stringify(this.body),
    }).then((res) => res.json());
  };

  public deleteData = async () => {
    return await fetch(`${API}${this.url}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        authorization: this.authorization ? this.authorization : '',
      },
      body: JSON.stringify(this.body),
    }).then((res) => res.json());
  };
}
