import IService from './iservice'

class FormService extends IService {
  constructor(axios, apiUrl) {
    super(axios)
    this.apiUrl = apiUrl
  }

  async sendContact(form) {
    try {
      const url = `${this.apiUrl}/api/lead/contact_form`
      const response = await this.post(url, form)
      return response.data
    } catch (e) {
      return null
    }
  }

  async sendTestDrive(form) {
    try {
      const url = `${this.apiUrl}/api/lead/test_drive`
      const response = await this.post(url, form)
      return response.data
    } catch (e) {
      return null
    }
  }

  async checkAvailability(form) {
    try {
      const url = `${this.apiUrl}/api/lead/availability_form`
      const response = await this.post(url, form)
      return response.data
    } catch (e) {
      return null
    }
  }

  async sendLandingForm(form) {
    try {
      const url = `${this.apiUrl}/api/lead/landing_form`
      const response = await this.post(url, form)
      return response.data
    } catch (e) {
      return null
    }
  }
}

export default FormService
