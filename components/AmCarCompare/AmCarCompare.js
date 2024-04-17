import { mapActions } from 'vuex'

export default {
  name: 'am-car-compare',
  components: {},
  props: {
    car: { type: Object, required: true },
  }
  ,
  data () {
    return {

    }
  },
  computed: {
    isFavorite() {
      return (
        this.$store.getters.getFavorites.findIndex(
          c => c.VIN === this.car.VIN
        ) > -1
      )
    },
    fileserver() {
      return this.$store.getters.sharedEnv.cdnUrl
    },

    isCompared() {
      return (
        this.$store.getters.getCompared.findIndex(c => c.VIN === this.car.VIN) >
        -1
      )
    },

    carImg() {
      if (!(this.car.SelectedImage || this.car.Images.length > 0))
        return 'https://ambarmotors.com/images/assets/coming-soon.svg'
      const img = this.car.SelectedImage
        ? this.car.SelectedImage
        : this.car.Images[0].File
      return `${this.fileserver}/api/files/${img}?resolution=360&zoom=off&frame=off`
    },

    carPayment(params) {
      let r = (params.apr / 12) / 100 || (3.5 / 12) / 100;
      let n = params.years * 12 || 6 * 12;
      let d = params.downpayment || 1000
      let p = this.car.RetailPrice.Value - d;
      let per_month = p * ((r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1));
      return per_month.toFixed(0);
    },
  },
  mounted () {

  },
  methods: {
    getSlug(car) {
      return `${car.Year}+${car.Make}+${car.Model}+${car.Body}+${car.VIN.substr(
        9,
        7
      )}`
    },

    onDeleteCar(){
      this.isCompared ? this.delCompared(this.car) : this.addToCompared(this.car);
      if(this.$store.getters.getCompared.length < 2)
        this.$router.push({
          path: '/inventory',
        })
    },

    ...mapActions([
      'setFavorites',
      'addToFavorites',
      'delFavorite',
      'setCompared',
      'addToCompared',
      'delCompared'
    ]),
  }
}
