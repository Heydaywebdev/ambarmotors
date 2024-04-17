import { mapGetters } from 'vuex'

export default {
  name: 'am-save-cars',
  components: {},
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
