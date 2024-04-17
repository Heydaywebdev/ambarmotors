export default {
  name: 'am-slider',
  components: {
  },
  props: ['car'],
  data () {
    return {
    }
  },
  computed: {
    fileserver() {
      return this.$store.getters.sharedEnv.cdnUrl
    },

    carImg() {
      const img = this.car.SelectedImage ? this.car.SelectedImage : this.car.Images[0].File
      return `${this.fileserver}/api/files/${img}.jpg?zoom=off&frame=off`
    }
  },
  mounted () {

  },
  methods: {

    advancePage(direction) {
      if ( !(this.car.SelectedImage || this.car.Images.length > 0) ) return;
      const carrousel = this.$refs.carrousel;
      carrousel.advancePage(direction || "forward")
    },

    getImageUrl(img) {
      if ( !(this.car.SelectedImage || this.car.Images.length > 0) )
        return 'https://ambarmotors.com/coming-soon.png'
      return `${this.fileserver}/api/files/${img.File}.jpg?resolution=1080&frame=off&zoom=off`
    }
  }
}
