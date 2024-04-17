<template src='./inventory.html'></template>
<script>
import AmCarCard from '~/components/AmCarCard/index.vue'
import AmPagination from '~/components/AmPagination.vue'
import LocalStore from '~/helpers/LocalStore'
import AmCarsFilter from '~/components/AmCarsFilter/index.vue'
import AmSearchCar from '~/components/AmSearchCar/index.vue'
import { mapActions, mapGetters } from 'vuex'
import InventoryService from '~/services/inventory.service'

export default {
  name: 'InventoryPage',
  components: { AmCarCard, AmCarsFilter, AmSearchCar, AmPagination },
  nuxtI18n: {
    paths: {
      en: '/inventory',
      es: '/inventario'
    }
  },
  computed: {
    ...mapGetters(['sharedEnv', 'getUserFilters', 'getCompared']),
    sortCaption() {
      const query = { ...this.$route.query }
      const sort = query.sort ? query.sort.toString() : null

      if (!sort) return null

      switch (sort) {
        case '1':
          return 'lowest_price'
        case '2':
          return 'highest_price'
        case '3':
          return 'lowest_mileage'
        case '4':
          return 'highest_mileage'
        case '5':
          return 'oldest_model'
        case '6':
          return 'newest_model'
        default:
          return 'sort'
      }
    }
  },
  head() {
    return {
      title: this.$t('tab_title')
    }
  },

  data() {
    return {
      showFilters: true,
      cars: [],
      filters: {
        makes: [],
        models: [],
        bodies: [],
        years: [],
        min_price: 0,
        max_price: 0,
        min_mileage: 0,
        max_mileage: 0
      },
      totalPages: 1,
      currentPage: 1,
      perPage: 10
    }
  },

  methods: {
    ...mapActions([
      'setUserFilters',
      'setFavorites',
      'setCompared',
      'setIsComparing'
    ]),

    sorting(kind) {
      const query = { ...this.$route.query }

      query.sort = kind

      delete query.page

      this.$router.push({
        path: this.$route.path,
        query: query
      })

      this.load(query)
        .then(null)
        .catch(null)

    },

    async load(query) {
      try {
        const service = new InventoryService(
          this.$axios,
          this.$store.getters.sharedEnv.inventoryUrl
        )

        let userFilters = ''
        const storeFilters = []

        if (query.make) {
          userFilters += `&Make=${encodeURIComponent(query.make)}`
          storeFilters.push(...query.make.split(','))
        }
        if (query.model) {
          userFilters += `&Model=${encodeURIComponent(query.model)}`
          storeFilters.push(...query.model.split(','))
        }
        if (query.body) {
          userFilters += `&Body=${encodeURIComponent(query.body)}`
          storeFilters.push(...query.body.split(','))
        }
        if (query.year) {
          userFilters += `&Year=${query.year}`
          storeFilters.push(...query.year.split(','))
        }
        if (query.min_price) {
          userFilters += `&MinPrice=${query.min_price}`
        }
        if (query.max_price) {
          userFilters += `&MaxPrice=${query.max_price}`
        }
        if (query.min_mileage) {
          userFilters += `&MinMileage=${query.min_mileage}`
        }
        if (query.max_mileage) {
          userFilters += `&MaxMileage=${query.max_mileage}`
        }
        if (query.query) {
          userFilters += `&Query=${encodeURIComponent(query.query)}`
          storeFilters.push(...[query.query])
        }
        if (query.page) {
          userFilters += `&Page=${query.page}`
        }
        if (query.sort) {
          userFilters += `&Sort=${query.sort}`
        }

        this.$store.commit('setUserFilters', storeFilters)

        const res = await service.getCarList(userFilters)

        if (res && !res.error && res.data) {
          const car = res.data.cars.length ? res.data.cars[0] : null
          this.firstCar = car
          this.cars = res.data.cars
          this.totalPages = res.data.totalPages
          this.currentPage = res.data.currentPage || query.page || 1
          return true
        }
        return false
      } catch (e) {
        return false
      }
    },

    async nextPage() {
      try {
        if (this.currentPage + 1 >= this.totalPages) return

        const service = new InventoryService(
          this.$axios,
          this.$store.getters.sharedEnv.inventoryUrl
        )

        this.loading = true

        const query = this.$route.query

        let userFilters = ''

        if (query.make) {
          userFilters += `&Make=${query.make}`
        }
        if (query.model) {
          userFilters += `&Model=${query.model}`
        }
        if (query.body) {
          userFilters += `&Body=${query.body}`
        }
        if (query.year) {
          userFilters += `&Year=${query.year}`
        }
        if (query.min_price) {
          userFilters += `&MinPrice=${query.min_price}`
        }
        if (query.max_price) {
          userFilters += `&MaxPrice=${query.max_price}`
        }
        if (query.query) {
          userFilters += `&Query=${query.query}`
        }

        userFilters += `&Page=${++this.currentPage}`

        if (query.sort) {
          userFilters += `&Sort=${query.sort}`
        }

        const res = await service.getCarList(userFilters)

        if (res && !res.error && res.data) {
          this.cars.push(...res.data.cars)
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },

    onFilterChanged(query) {
      this.load(query)
        .then(null)
        .catch(null)
    },

    clearFilter(filter) {
      const query = { ...this.$route.query }

      if (query.make) {
        if (query.make === filter) {
          delete query.make
        } else {
          const makes = query.make.split(',')
          const existIndex = makes.findIndex(m => m === filter)
          if (existIndex > -1) {
            makes.splice(existIndex, 1)
            query.make = makes.join(',')
          }
        }
      }

      if (query.model) {
        if (query.model === filter) {
          delete query.model
        } else {
          const models = query.model.split(',')
          const existIndex = models.findIndex(m => m === filter)
          if (existIndex > -1) {
            models.splice(existIndex, 1)
            query.model = models.join(',')
          }
        }
      }

      if (query.year) {
        if (query.year === filter) {
          delete query.year
        } else {
          const years = query.year.split(',')
          const existIndex = years.findIndex(m => m === filter)
          if (existIndex > -1) {
            years.splice(existIndex, 1)
            query.year = years.join(',')
          }
        }
      }

      if (query.body) {
        if (query.body === filter) {
          delete query.body
        } else {
          const bodies = query.body.split(',')
          const existIndex = bodies.findIndex(m => m === filter)
          if (existIndex > -1) {
            bodies.splice(existIndex, 1)
            query.body = bodies.join(',')
          }
        }
      }

      if (query.query && query.query === filter) {
        delete query.query
      }

      if (query.sort && query.sort === filter) {
        delete query.sort
      }

      delete query.sort
      delete query.page

      this.onFilterChanged(query)

      this.$router.push({
        path: this.$route.path,
        query: query
      })
    },

    clearAllFilters() {
      const query = { ...this.$route.query }

      delete query.model
      delete query.make
      delete query.year
      delete query.body
      delete query.query
      delete query.sort
      delete query.page

      this.onFilterChanged(query)

      this.$router.push({
        path: this.$route.path,
        query: query
      })
    },

    goToCompare() {

      this.$router.push({
        path: '/compare'
      })
    },

    toggleCompare() {
      this.setIsComparing(!this.$store.getters.getIsComparing)
    },

    handleCampaignSource() {
      if (this.$route.query && this.$route.query.campaign_source) {
        LocalStore.setPriceFromCampaign(this.$route.query.campaign_source)
      }
    }
  },

  async asyncData({ store, $axios, query }) {
    try {
      const service = new InventoryService(
        $axios,
        store.getters.sharedEnv.inventoryUrl
      )

      let userFilters = ''
      const storeFilters = []

      if (query.make) {
        userFilters += `&Make=${encodeURIComponent(query.make)}`
        storeFilters.push(...query.make.split(','))
      }
      if (query.model) {
        userFilters += `&Model=${encodeURIComponent(query.model)}`
        storeFilters.push(...query.model.split(','))
      }
      if (query.body) {
        userFilters += `&Body=${encodeURIComponent(query.body)}`
        storeFilters.push(...query.body.split(','))
      }
      if (query.year) {
        userFilters += `&Year=${query.year}`
        storeFilters.push(...query.year.split(','))
      }
      if (query.min_price) {
        userFilters += `&MinPrice=${query.min_price}`
      }
      if (query.max_price) {
        userFilters += `&MaxPrice=${query.max_price}`
      }
      if (query.min_mileage) {
        userFilters += `&MinMileage=${query.min_mileage}`
      }
      if (query.max_mileage) {
        userFilters += `&MaxMileage=${query.max_mileage}`
      }
      if (query.query) {
        userFilters += `&Query=${encodeURIComponent(query.query)}`
        storeFilters.push(...[query.query])
      }
      if (query.page) {
        userFilters += `&Page=${query.page}`
      }
      if (query.sort) {
        userFilters += `&Sort=${query.sort}`
      }

      store.commit('setUserFilters', storeFilters)

      let res = await service.getFilters()

      let allFilters = {}

      if (res && !res.error) {
        if (!res.data.years.error) {
          res.data.years.data = res.data.years.data.sort((a, b) => b - a)
        }

        allFilters = res.data
      } else {
        allFilters = { makes: [], models: [], bodies: [], years: [] }
      }

      const preset = {}

      for (const make of allFilters.makes.data) {
        preset[make.Make] = false
      }

      for (const model of allFilters.models.data) {
        preset[model.Model] = false
      }

      for (const body of allFilters.bodies.data) {
        preset[body] = false
      }

      for (const year of allFilters.years.data) {
        preset[year] = false
      }

      store.commit('presetFilterToggle', preset)

      res = await service.getCarList(userFilters)

      if (res && !res.error && res.data) {
        const car = res.data.cars.length ? res.data.cars[0] : null
        return {
          firstCar: car,
          cars: res.data.cars,
          filters: allFilters,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPage || query.page || 1
        }
      }

      return {
        cars: [],
        filters: { makes: [], models: [], bodies: [], years: [] },
        totalPages: 0,
        currentPage: 1
      }
    } catch (e) {
    }
  },

  mounted() {
    this.setCompared(LocalStore.getCompared() || [])
    this.setFavorites(LocalStore.getFavorites() || [])
  },

  beforeMount() {
    this.handleCampaignSource()
  }
}
</script>
<style src='./inventory.scss' lang='scss' scoped></style>
<i18n src='./locales.json' scoped></i18n>
