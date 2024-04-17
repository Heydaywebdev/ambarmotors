<template src="./catalog.html"></template>
<script>
import AmCarCard from '~/components/AmCarCard/index.vue'
import AmPagination from '~/components/AmPagination.vue'
import AmCarsFilter from '~/components/AmCarsFilter/index.vue'
import AmSearchCar from '~/components/AmSearchCar/index.vue'
import { mapActions, mapGetters } from 'vuex'
import InventoryService from '~/services/inventory.service'

export default {
  name: 'CatalogPage',
  components: { AmCarCard, AmCarsFilter, AmSearchCar, AmPagination },
  nuxtI18n: {
    paths: {
      en: '/catalog',
      es: '/catalogo'
    }
  },
  computed: {
    ...mapGetters(['sharedEnv', 'getUserFilters']),
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

  data() {
    return {
      cars: [],
      loading: false,
      filters: { makes: [], models: [], bodies: [], years: [] },
      totalPages: 0,
      currentPage: 1,
      perPage: 20
    }
  },

  watchQuery: true,

  methods: {
    ...mapActions(['setUserFilters']),

    sorting(kind) {
      const query = { ...this.$route.query }

      query.sort = kind

      delete query.page

      this.$router.push({
        path: this.$route.path,
        query: query
      })
    },

    clearFilter(filter) {
      const query = { ...this.$route.query }

      if (query.make) {
        if (query.make === filter) {
          delete query.make
        } else {
          const makes = query.make.split(',')
          const existIndex = makes.findIndex(m => m === filter)
          if (existIndex) {
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
          if (existIndex) {
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
          if (existIndex) {
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
          if (existIndex) {
            bodies.splice(existIndex, 1)
            query.body = bodies.join(',')
          }
        }
      }

      if (query.year) {
        if (query.year === filter) {
          delete query.year
        } else {
          const years = query.year.split(',')
          const existIndex = years.findIndex(m => m === filter)
          if (existIndex) {
            years.splice(existIndex, 1)
            query.year = years.join(',')
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

      this.$router.push({
        path: this.$route.path,
        query: query
      })
    },

    async nextPage() {
      try {
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
        userFilters += `&Make=${query.make}`
        storeFilters.push(...query.make.split(','))
      }
      if (query.model) {
        userFilters += `&Model=${query.model}`
        storeFilters.push(...query.model.split(','))
      }
      if (query.body) {
        userFilters += `&Body=${query.body}`
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
      if (query.query) {
        userFilters += `&Query=${query.query}`
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
        return {
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
    } catch (e) {}
  }
}
</script>
<style src="./catalog.scss" lang="scss" scoped></style>
<i18n src="./locales.json" scoped></i18n>
