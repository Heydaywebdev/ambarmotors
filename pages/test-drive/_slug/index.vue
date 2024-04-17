<template src="./index.html"></template>
<script>
import {mapActions, mapGetters} from 'vuex'
import LocalStore from '~/helpers/LocalStore'
import InventoryService from '~/services/inventory.service'
import FormService from '~/services/form.service'
import CompanyService from '~/services/company.service'
import locales from './locales.json'
import CarFormat from '~/helpers/CarFormat.js'
import error from '../../../layouts/error'

export default {
  name: 'Slug',
  components: {},
  nuxtI18n: {
    paths: {
      en: '/test-drive/:slug',
      es: '/manejar-auto/:slug'
    }
  },
  props: [],

  head() {
    return {
      script: [
        {
          src:
            'https://www.google.com/recaptcha/api.js?render=6LcAgKwUAAAAACCtODSku12MNUkIi_zelwPQEARE'
        }
      ]
    }
  },

  data() {
    return {
      Company: {
        Locations: []
      },
      form: {
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Date: new Date(),
        Location: 'Select Location',
        Hour: 'Select Time',
        Comments: ''
      }
    }
  },

  computed: {
    ...mapGetters(['sharedEnv', 'isShowFavorites']),
    Car: {
      set(value) {
        this.setCar(value)
      },
      get() {
        return this.getCar()
      }
    },

    textShowFeatures() {
      return this.windows.showFeatures ? 'Show Less' : 'Show More'
    },
    TextPrice() {
      return CarFormat.PriceFormat(this.Car.Price)
    },

    carPayment(params) {
      const r = params.apr / 12 / 100 || 3.5 / 12 / 100
      const n = params.years * 12 || 6 * 12
      const d = params.downpayment || 1000
      const p = this.Car.Price - d
      const perMonth = p * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
      return perMonth.toFixed(0)
    },
    fileserver() {
      return this.$store.getters.sharedEnv.cdnUrl
    },

    api_url() {
      return this.sharedEnv.apiUrl
    }
  },

  async asyncData({store, $axios, params, query}) {
    const service = new InventoryService(
      $axios,
      store.getters.sharedEnv.inventoryUrl
    )
    const res = await service.getCar(params.slug)
    if (res && !res.error) {
      LocalStore.addRecentlyViewed(res.data)
      store.commit('setCar', res.data)
    }
  },

  mounted() {
    this.$recaptcha.init()
    const companyService = new CompanyService(this.$axios, this.sharedEnv.apiUrl)

    companyService.getPublicInfo().then(res => {
      if (res && !res.error) {
        this.Company = res.data
      }
    }).catch(e => {
      console.error(e)
    })

  },

  created() {
    this.$validator.localize('es', {
      attributes: locales.es
    })

    this.$validator.localize('en', {
      attributes: locales.en
    })
  },

  beforeMount() {
    this.handleCampaignTrackingSource();
  },

  methods: {
    ...mapActions(['setCar', 'toggleShowFavorites']),
    ...mapGetters(['getCar']),
    getImageUrl(car) {
      if (!(car.SelectedImage || car.Images.length > 0))
        return 'https://ambarmotors.com/images/assets/coming-soon.svg'
      const img = car.SelectedImage ? car.SelectedImage : car.Images[0].File
      return `${this.fileserver}/api/files/${img}?resolution=720&frame=off&zoom=off`
    },

    async sendTestDrive() {
      await this.$validator.validate()

      if (this.errors.items.length > 0) return

      const token = await this.$recaptcha.execute('login')
      if (!token) alert('Please retry recaptcha')
      const service = new FormService(this.$axios, this.sharedEnv.apiUrl)

      this.form.token = token;
      this.form.VIN = this.Car.VIN;
      this.form.TrackingSource = LocalStore.getEZLCampaignSource();
      const res = await service.sendTestDrive(this.form)

      if (res && !res.error) {
        const query = this.$route.query;
        query.form = `test-drive`
        query.name = `${this.form.FirstName} ${this.form.LastName}`
        this.$router.push(this.localePath({name: 'thanks', query}))
      } else {
        alert('Error sending form')
      }
    },

    handleCampaignTrackingSource() {
      if (this.$route.query && this.$route.query.ezl_campaign_tracking_source) {
        LocalStore.setEZLCampaignSource(this.$route.query.ezl_campaign_tracking_source)
      }
    }
  }
}
</script>
<style src="./index.scss" scoped lang="scss"></style>
<i18n src="./locales.json"></i18n>
