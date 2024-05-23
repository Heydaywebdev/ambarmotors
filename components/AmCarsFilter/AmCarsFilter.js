import { mapActions } from 'vuex'
import AmSearchCar from '../AmSearchCar/index.vue'

export default {
  name: 'AmCarsFilter',
  components: { AmSearchCar },
  props: {
    makes: Object,
    models: Object,
    bodies: Object,
    years: Object,
    onFilterChanged: Function
  },

  data() {
    return {
      showMoreFilters: {
        Makes: {
          unlocked: false,
          unlockable: this.makes?.data?.length > 12
        }
      },
      toggles: {},
      query: '',
      priceRange: [0, 120000],
      mileageRange: [0, 250000]
    }
  },

  computed: {
    getMakes() {
      if (this.showMoreFilters.Makes.unlocked) {
        return this.makes.data
      }

      return this.makes.data.slice(0, 11)
    },

    allMakes() {
      if (!this.makes || !this.makes.data) return 0

      return this.makes.data.reduce(function(a, b) {
        return b.count == null ? a : a + b.count
      }, 0)
    },

    filterToggle: {
      set(value) {
        this.$store.commit('setFilterToggle', value)
      },
      get() {
        return this.$store.state.filterToggle
      }
    },

    userFilters: {
      set(value) {
        this.$store.commit('setUserFilters', value)
      },
      get() {
        return this.$store.state.userFilters
      }
    }
  },

  mounted() {
    const query = { ...this.$route.query }

    if (query.min_price) this.priceRange[0] = +query.min_price || 0
    else this.priceRange[0] = 0

    if (query.max_price) this.priceRange[1] = +query.max_price || 120000
    else this.priceRange[1] = 120000

    if (query.min_mileage) this.mileageRange[0] = +query.min_mileage || 0
    else this.mileageRange[0] = 0

    if (query.max_mileage) this.mileageRange[1] = +query.max_mileage || 250000
    else this.mileageRange[1] = 250000
  },

  methods: {
    ...mapActions(['toggleUserFilter']),

    isSelected(key) {
      if (!key) return false
      const index = this.userFilters.indexOf(key.toString())
      return index !== -1
    },

    priceChange() {
      const query = { ...this.$route.query }

      query.min_price = this.priceRange[0]
      query.max_price = this.priceRange[1]

      delete query.page

      this.$router.push({
        path: this.$route.path,
        query: query
      })

      if (this.onFilterChanged) this.onFilterChanged(query)
    },

    mileageChange() {
      const query = { ...this.$route.query }

      query.min_mileage = this.mileageRange[0]
      query.max_mileage = this.mileageRange[1]

      delete query.page

      this.$router.push({
        path: this.$route.path,
        query: query
      })

      if (this.onFilterChanged) this.onFilterChanged(query)
    },

    visibilityClass(key, subKey = null) {
      if (subKey && this.isSelected(subKey)) {
        return 'selected show'
      }

      if (this.filterToggle[key]) return 'show'

      return 'hide'
    },

    selectionClass(key) {
      return this.isSelected(key) ? 'selected' : ''
    },

    toggle(make) {
      if (!this.filterToggle[make])
        this.filterToggle = { key: make, value: true }
      else this.filterToggle = { key: make, value: false }
    },

    pickMake(make) {
      const query = { ...this.$route.query }

      if (query.make && query.make !== make && query.model) {
        delete query.model
      }

      if (make === 'all_makes') {
        delete query.make
        delete query.model
      } else if (query.make && query.make.length > 0) {
        const userMakes = query.make.split(',')
        const index = userMakes.findIndex(a => a === make)
        if (index !== -1) {
          userMakes.splice(index, 1)
        } else {
          userMakes.push(make)
        }
        query.make = userMakes.join(',')
      } else {
        query.make = make
      }

      delete query.page

      this.$router.push({
        path: this.$route.path,
        query: query
      })

      if (this.onFilterChanged) this.onFilterChanged(query)
    },

    pickModel(make, model) {
      const query = { ...this.$route.query }

      if (model === 'all_models') {
        delete query.model
      } else if (query.model && query.model.length > 0) {
        const userModels = query.model.split(',')
        const index = userModels.findIndex(a => a === model)
        if (index !== -1) {
          userModels.splice(index, 1)
        } else {
          userModels.push(model)
        }
        query.model = userModels.join(',')
      } else {
        query.model = model
      }

      if (query.make && query.make.length > 0) {
        const userMakes = query.make.split(',')
        const mIndex = userMakes.findIndex(a => a === make)

        if (mIndex !== -1) {
          userMakes.splice(mIndex, 1)
        }

        query.make = userMakes.join(',')
      } else {
        delete query.make
      }

      this.toggleUserFilter(model)
      this.toggleUserFilter(make)

      if (!query.model || query.model.length === 0) delete query.model
      if (!query.make || query.make.length === 0) delete query.make

      delete query.page

      if (this.onFilterChanged) this.onFilterChanged(query)

      this.$router.push({
        name: this.$route.name,
        query: query
      })
    },

    search(searchString) {
      const query = { ...this.$route.query }

      query.query = searchString

      this.toggleUserFilter(searchString)
      if (!query.query || query.query.length < 2) delete query.query

      delete query.page

      if (this.onFilterChanged) this.onFilterChanged(query)

      this.$router.push({
        name: this.$route.name,
        query: query
      })
    },

    pickYear(year) {
      year = year.toString()
      const query = { ...this.$route.query }
      if (query.year) query.year = query.year.toString()

      if (year === 'all_years') {
        delete query.year
      } else if (query.year && query.year.length > 0) {
        const userYears = query.year.split(',')
        const index = userYears.findIndex(a => a === year.toString())
        if (index !== -1) {
          userYears.splice(index, 1)
        } else {
          userYears.push(year)
        }
        query.year = userYears.join(',')
      } else {
        query.year = year
      }

      this.toggleUserFilter(year)
      if (!query.year || query.year.length === 0) delete query.year

      delete query.page

      if (this.onFilterChanged) this.onFilterChanged(query)

      this.$router.push({
        name: this.$route.name,
        query: query
      })
    },

    pickBody(body) {
      const query = { ...this.$route.query }

      if (body === 'all_bodies') {
        delete query.body
      } else if (query.body && query.body.length > 0) {
        const userBody = query.body.split(',')
        const index = userBody.findIndex(a => a === body)
        if (index !== -1) {
          userBody.splice(index, 1)
        } else {
          userBody.push(body)
        }
        query.body = userBody.join(',')
      } else {
        query.body = body
      }

      this.toggleUserFilter(body)
      if (!query.body || query.body.length === 0) delete query.body

      delete query.page

      if (this.onFilterChanged) this.onFilterChanged(query)

      this.$router.push({
        name: this.$route.name,
        query: query
      })
    }
  }
}
