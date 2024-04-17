<template src='./watchList.html'></template>
<script>
import { mapGetters } from 'vuex'
import AmCarCard from '~/components/AmCarCard/index.vue'

export default {
  name: 'watchList',
  nuxtI18n: {
    paths: {
      en: '/watchlist',
      es: '/autos-vistos'
    }
  },
  components: { AmCarCard },
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'getFavorites'
    ]),
    Car: {
      set(value) {
        this.setCar(value)
      },
      get() {
        return this.getCar()
      }
    },
    fileserver() {
      return this.$store.getters.sharedEnv.cdnUrl
    }
  },
  mounted() {

  },
  methods: {
    getImageUrl(car) {

      if (!(car.SelectedImage || car.Images.length > 0))
        return 'https://ambarmotors.com/images/assets/coming-soon.svg'
      const img = car.SelectedImage ? car.SelectedImage : car.Images[0].File
      return `${this.fileserver}/api/files/${img}?resolution=1080`
    },
    getSlug(car) {
      return `${car.Year}+${car.Make}+${car.Model}+${car.Body}+${car.VIN.substr(
        9,
        7
      )}`
    },
    discount(car) {
      const porcent = Math.ceil(car.RetailPrice.Value * 0.2)
      const discount = car.RetailPrice.Value - porcent
      return discount
    }
  }
}
</script>
<style src='./watchList.scss' scoped lang='scss'></style>
<i18n src='./locales.json'></i18n>
