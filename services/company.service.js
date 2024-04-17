import IService from './iservice'

class CompanyService extends IService {
  constructor(axios, apiUrl) {
    super(axios)
    this.apiUrl = apiUrl
  }

  async getPublicInfo() {
    try {
      const url = `${this.apiUrl}/api/company/public`
      const response = await this.get(url)
      return response.data
    } catch (e) {
      return null
    }
  }

}

export default CompanyService
