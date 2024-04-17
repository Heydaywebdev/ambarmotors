import InventoryService from '~/services/inventory.service'
import AmCarCard from '~/components/AmCarCard/index.vue'

export default {
  name: 'AmCarsSimilar',
  components: { AmCarCard },
  props: ['car'],
  data() {
    return {
      cars: []
    }
  },
  computed: {
    fileserver() {
      return this.$store.getters.sharedEnv.cdnUrl
    }
  },
  async mounted() {
    const service = new InventoryService(
      this.$axios,
      this.$store.getters.sharedEnv.inventoryUrl
    )
    const res = await service.getSimilars(this.car.VIN)
    if (res && !res.error) {
      this.cars = res.data.similars
    }
  },
  methods: {
    getImageUrl(car) {

      if ( !(car.SelectedImage || car.Images.length > 0) )
        return 'https://ambarmotors.com/images/assets/coming-soon.svg'
      const img = car.SelectedImage ? car.SelectedImage : car.Images[0].File
      return `${this.fileserver}/api/files/${img}?resolution=1080`
    }
  }
}
