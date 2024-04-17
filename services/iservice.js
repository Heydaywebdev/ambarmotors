class HttpClient {
  constructor(axios) {
    this.axios = axios
  }

  get(apiPath) {
    return this.axios({
      url: apiPath,
      method: 'GET'
    })
  }

  post(apiPath, params = {}) {
    return this.axios({
      url: apiPath,
      method: 'POST',
      data: params
    })
  }

  put(apiPath, params = {}) {
    return this.axios({
      url: apiPath,
      method: 'PUT',
      data: params
    })
  }

  delete(apiPath, params) {
    return this.axios({
      url: apiPath,
      method: 'DELETE',
      data: params
    })
  }
}

export default HttpClient
