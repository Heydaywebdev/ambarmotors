import IService from './iservice'

class InventoryService extends IService {
  constructor(axios, apiUrl) {
    super(axios)
    this.apiUrl = apiUrl
  }

  async getCar(slug) {
    try {
      const url = `${this.apiUrl}/api/inventory/get-by-slug/${slug}`
      const response = await this.get(url)
      return response.data
    } catch (e) {
      return null
    }
  }

  async getAutoComplete(expression) {
    try {
      const url = `${
        this.apiUrl
      }/api/inventory/autocomplete?expression=${expression}`
      const response = await this.get(url)
      return response.data
    } catch (e) {
      return null
    }
  }

  async searchVinOrStock(pattern) {
    try {
      const [vinResponse, stockResponse] = await Promise.all([
        this.get(`${this.apiUrl}/api/inventory/${pattern}`),
        this.get(`${this.apiUrl}/api/inventory/stock/${pattern}`)
      ])
      const cars = []

      if (vinResponse.data && !vinResponse.data.error && vinResponse.data.data)
        cars.push(...vinResponse.data.data)

      if (
        stockResponse.data &&
        !stockResponse.data.error &&
        stockResponse.data.data
      )
        cars.push(...stockResponse.data.data)

      return { error: false, data: cars }
    } catch (e) {
      return null
    }
  }

  async getByVin(vin) {
    try {
      const res = await this.get(`${this.apiUrl}/api/inventory/${vin}`)
      return res.data
    } catch (e) {
      return null
    }
  }

  async getMakes() {
    try {
      const res = await this.get(
        `${this.apiUrl}/api/inventory/car-filter/makes`
      )
      return res.data
    } catch (e) {
      return null
    }
  }

  async getModels(make = null) {
    try {
      let url = ''
      if (make) {
        url = `${this.apiUrl}/api/inventory/car-filter/models-by-make/${make}`
      } else {
        url = `${this.apiUrl}/api/inventory/car-filter/models`
      }
      const res = await this.get(url)
      return res.data
    } catch (e) {
      return null
    }
  }

  async getBody() {
    try {
      const res = await this.get(`${this.apiUrl}/api/inventory/car-filter/body`)
      return res.data
    } catch (e) {
      return null
    }
  }

  async getYears(make = null, model = null) {
    try {
      let url = ''

      if (make && model) {
        url = `${
          this.apiUrl
        }/api/inventory/car-filter/years-by-make-models/${make}/${model}`
      } else {
        url = `${this.apiUrl}/api/inventory/car-filter/year`
      }

      const res = await this.get(url)

      return res.data
    } catch (e) {
      return null
    }
  }

  async getTenCars() {
    try {
      const res = await this.get(`${this.apiUrl}/api/inventory/ten-cars`)
      return res.data
    } catch (e) {
      return null
    }
  }

  async getFilters() {
    try {
      const [makes, models, bodies, years] = await Promise.all([
        this.getMakes(),
        this.getModels(),
        this.getBody(),
        this.getYears()
      ])
      return { error: false, data: { makes, models, bodies, years } }
    } catch (e) {
      return null
    }
  }

  async getByYear(year) {
    try {
      const res = await this.get(
        `${this.apiUrl}/api/inventory/query-limit-skip-cars?Year=${year}`
      )
      return res.data
    } catch (e) {
      return null
    }
  }

  async getByMake(make) {
    try {
      const res = await this.get(
        `${this.apiUrl}/api/inventory/query-limit-skip-cars?Make=${make}`
      )
      return res.data
    } catch (e) {
      return null
    }
  }

  async getByModel(model) {
    try {
      const res = await this.get(
        `${this.apiUrl}/api/inventory/query-limit-skip-cars?Model=${model}`
      )
      return res.data
    } catch (e) {
      return null
    }
  }

  async getSimilars(vin) {
    try {
      const res = await this.get(`${this.apiUrl}/api/inventory/similars/${vin}`)
      return res.data
    } catch (e) {
      return null
    }
  }

  async getCarsAndModelsByMake(make) {
    try {
      const [models, cars] = await Promise.all([
        this.getModels(make),
        this.getByMake(make)
      ])
      return { error: false, data: { models, cars } }
    } catch (e) {
      return null
    }
  }

  async getYearsAndCarsByModel(model, make = null) {
    try {
      const [years, cars] = await Promise.all([
        this.getYears(make, model),
        this.getByModel(model)
      ])
      return { error: false, data: { years, cars } }
    } catch (e) {
      return null
    }
  }

  async getCarList(params) {
    try {
      let url = `${
        this.apiUrl
      }/api/inventory/query-limit-skip-cars?source=frontend`
      if (params && params.length > 0) url += `${params}`
      const response = await this.get(url)
      return response.data
    } catch (e) {
      return null
    }
  }

  async getVINData(vin) {
    try {
      const response = await this.get(`${this.apiUrl}/api/vin/${vin}`)
      return response.data
    } catch (e) {
      return null
    }
  }
}

export default InventoryService
