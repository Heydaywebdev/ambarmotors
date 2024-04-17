import LocalStore from '~/helpers/LocalStore'
import AmCarCard from '~/components/AmCarCard/index.vue'

export default {
  name: 'AmCarRecently',
  components: { AmCarCard },
  props: [],
  data() {
    return {
      cars: []
    }
  },
  computed: {},
  mounted() {
    this.cars = LocalStore.getRecentlyViewed()
  },
  methods: {}
}
