import axios from "axios"

let DEFAULT_HEADER = {
  Accept: 'application/json',
  // 'Content-Type': 'application/json',
};


export const client = {
    /**
     * Remove an item from the used storage
     * @param  {String} key [description]
     */
    get(
      url, header = DEFAULT_HEADER, params = {}
    ) {
      return axios({
        headers: header,
        method: 'GET',
        url: url,
        params: params
      })
  },

  post(
    url, header = DEFAULT_HEADER, params = {}
  ) {
    return axios({
      header: header,
      method: 'POST',
      url: url,
      data: params
    })
  },

  put(url, header = DEFAULT_HEADER, params = {}) {
    return axios({
      headers: header,
      method: 'PUT',
      url: url,
      data: params
    })
  },

  delete(url, header = DEFAULT_HEADER, params = {}) {
    return axios({
      headers: header,
      method: 'DELETE',
      url: url,
      data: params
    })
  },

  jsFetch(url, method = 'POST', header = DEFAULT_HEADER, params = {}) {
    return fetch(url, {
      method: method,
      headers: header,
      body: JSON.stringify(params),
   }).then((response) => response.json())
      .then((responseJson) => {
         return responseJson
      })
      .catch((error) => {
          throw error
      });
  },
}
