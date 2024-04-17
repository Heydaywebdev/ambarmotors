<template src="./index.html"></template>
<script>
import { mapActions, mapGetters } from 'vuex'
import InventoryService from '~/services/inventory.service'
import FormService from '~/services/form.service'
import locales from './locales.json'
import AmCalculator from '~/components/AmCalculatorPB/index.vue'
import AmSubscription from '~/components/AmSubscription/index.vue'
import AmCarSimilars from '~/components/AmCarsSimilar/index.vue'
import AmGallery from '~/components/AmGallery/index.vue'
import AmSliderImg from '~/components/AmSliderImg/index.vue'
import LocalStore from '~/helpers/LocalStore'
import CarFormat from '~/helpers/CarFormat.js'
import Modal from '~/components/Modal/index.vue'
import AmPriceBalanceDisclaimer from '~/components/AmPriceBalanceDisclaimer/index.vue'
import AmDisclosure from '~/components/AmDisclosure/index.vue'

export default {
  name: 'Slug',
  components: {
    AmCalculator,
    AmSubscription,
    AmCarSimilars,
    AmGallery,
    AmSliderImg,
    Modal,
    AmPriceBalanceDisclaimer,
    AmDisclosure
  },
  nuxtI18n: {
    paths: {
      en: '/catalog/:vin',
      es: '/catalogo/:vin'
    }
  },
  props: [],
  watchQuery: true,
  data() {
    return {
      Campaign: {
        has: false,
        name: ''
      },
      toggleExpandEquipment: false,
      tabActive: 'overview',
      warrantyTabs: '',
      divscrolltop: 0,
      isInViewport: false,

      availability: {
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Comments: ''
      },

      windows: {
        showFeatures: false,
        showGallery: false
      },
      aClassDetails: true,
      toggleAvailabilityModal: false,
      showVideoModal: false
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

    isFavorite() {
      return (
        this.$store.getters.getFavorites.findIndex(
          c => c.VIN === this.Car.VIN
        ) > -1
      )
    },

    textShowFeatures() {
      return this.windows.showFeatures ? 'Show Less' : 'Show More'
    },
    TextPrice() {
      return CarFormat.PriceFormat(this.Car.Price)
    },
    monthlyEstimate() {
      return PayCalculator.MonthlyPayment(3.95, 6, 1000, this.Car.Price)
    },

    hasStandardEquipment() {
      return this.Car.StandardEquipment.length > 2
    },

    equipments() {
      if (this.hasStandardEquipment) {
        return {
          SafetyFeatures: [],
          IntFeatures: [],
          ExtFeatures: [],
          OptionalFeatures: []
        }
      }

      const equipments = {
        SafetyFeatures: this.Car.SafetyFeatures,
        IntFeatures: [],
        ExtFeatures: [],
        OptionalFeatures: []
      }

      Object.keys(this.Car.IntFeatures).forEach(i =>
        equipments.IntFeatures.push(...this.Car.IntFeatures[i])
      )

      Object.keys(this.Car.ExtFeatures).forEach(i =>
        equipments.ExtFeatures.push(...this.Car.ExtFeatures[i])
      )

      Object.keys(this.Car.OptionalFeatures).forEach(i =>
        equipments.OptionalFeatures.push(...this.Car.OptionalFeatures[i])
      )

      return equipments
    },
    carPayment(params) {
      const r = params.apr / 12 / 100 || 3.5 / 12 / 100
      const n = params.years * 12 || 6 * 12
      const d = params.downpayment || 1000
      const p = this.Car.RetailPrice.Value - d
      const per_month =
        p * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
      return per_month.toFixed(0)
    },
    fileserver() {
      return this.$store.getters.sharedEnv.cdnUrl
    },

    carImg() {
      if (!(this.Car.SelectedImage || this.Car.Images.length > 0))
        return 'https://ambarmotors.com/coming-soon.png'
      const img = this.Car.SelectedImage
        ? this.Car.Images[2].File
        : this.Car.Images[0].File
      return `${
        this.fileserver
      }/api/files/${img}?resolution=720&zoom=off&frame=off`
    },

    discount() {
      const CAMPAIGN_NAME = LocalStore.getPriceFromCampaign()
      if (!CAMPAIGN_NAME) {
        const porcent = Math.ceil(this.Car.RetailPrice.Value * 0.2)
        const discount = this.Car.RetailPrice.Value - porcent
        return discount
      } else {
        const PRICES = {
          autotrader: this.Car.ThirdPartyPrice.Autotrader.Value,
          carfax: this.Car.ThirdPartyPrice.Carfax.Value,
          cargurus: this.Car.ThirdPartyPrice.Cargurus.Value,
          carsdotcom: this.Car.ThirdPartyPrice.Carsdotcom.Value,
          edmunds: this.Car.ThirdPartyPrice.Edmunds.Value,
          facebook: this.Car.ThirdPartyPrice.Facebook.Value,
          google: this.Car.ThirdPartyPrice.Google.Value,
          truecars: this.Car.ThirdPartyPrice.Truecars.Value
        }

        this.Campaign.has = true

        return PRICES[CAMPAIGN_NAME] || this.Car.StickerPrice.Value || this.Car.RetailPrice.Value
      }

    },
  },

  async asyncData({ store, $axios, params, query }) {
    const service = new InventoryService(
      $axios,
      store.getters.sharedEnv.inventoryUrl
    )
    const res = await service.getByVin(params.vin)
    if (res && !res.error && res.data) {
      LocalStore.addRecentlyViewed(res.data)
      store.commit('setCar', res.data)
    }
  },
  beforeMount() {
    if (this.isShowFavorites) {
      this.toggleShowFavorites()
    }

    this.handleCampaignSource()
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.$recaptcha.init()
    this.warrantyTabs = this.$t(`warranty-tabs-t1`)
  },

  created() {
    this.$validator.localize('es', {
      attributes: locales.es
    })

    this.$validator.localize('en', {
      attributes: locales.en
    })
  },

  methods: {
    ...mapActions([
      'setCar',
      'toggleShowFavorites',
      'addToFavorites',
      'delFavorite'
    ]),
    ...mapGetters(['getCar']),

    showTabContent(tab) {
      this.tabActive = tab
    },

    warrantyTabContent(tab) {
      this.warrantyTabs = tab
    },

    toggleShowFeatures() {
      this.windows.showFeatures = !this.windows.showFeatures
    },

    toggleAClassDetails() {
      this.aClassDetails = !this.aClassDetails
    },

   handleScroll() {
      const inTop = this.$refs.specifications.getBoundingClientRect().top
      this.isInViewport = inTop < 0 ? true : false
    },

    getSlug(car) {
      return `${car.Year}+${car.Make}+${car.Model}+${car.Body}+${car.VIN.substr(
        9,
        7
      )}`
    },

    async checkAvailability() {
      await this.$validator.validate()

      if (this.errors.items.length > 0) return

      const token = await this.$recaptcha.execute('login')
      if (!token) alert('Please retry recaptcha')
      const service = new FormService(this.$axios, this.sharedEnv.apiUrl)

      this.availability.token = token
      this.availability.VIN = this.Car.VIN
      const res = await service.checkAvailability(this.availability)

      if (res && !res.error) {
        this.availability = {
          FirstName: '',
          MiddleName: '',
          LastName: '',
          Email: '',
          Phone: '',
          Comments: ''
        }
        this.toggleAvailabilityModal = false
      }
    },

    handleCampaignSource() {
      if (this.$route.query && this.$route.query.campaign_source) {
        LocalStore.setPriceFromCampaign(this.$route.query.campaign_source)
      }
    },

    closeVideoModal() {
      this.showVideoModal = false
    },
  }
}
</script>
<style src="./index.scss" scoped lang="scss"></style>
<i18n src="./locales.json"></i18n>
