export default {
  name: 'modal',
  components: {},
  props: {
    close: { type: Function },
    width: { type: String, default: '500px' },
    padding: { type: String, default: '20px' }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {

  },
  methods: {
    cancelModal() {
      return this.close && this.close()
    }
  }
}
