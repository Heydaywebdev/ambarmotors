import InventoryService from '@/services/inventory.service'

export default {
  name: 'am-search-car',
  components: {},
  props: {
    display: { type: String },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    searchMethod: { type: Function },
    change: { type: Function },
    value: { type: String }
  },
  data() {
    return {
      makes: [],
      models: [],
      years: [],
      query: '',
      results: []
    }
  },
  computed: {},
  mounted() {},
  methods: {
    updateText() {
      this.$emit('input', this.$refs.textbox.value)
      if (this.change) this.change(this.$refs.textbox.value)
    },

    search(query) {
      if (this.searchMethod) this.searchMethod(query)
    },

    async searchAutoComplete() {
      if (this.query.length < 2) return

      const service = new InventoryService(
        this.$axios,
        this.$store.getters.sharedEnv.inventoryUrl
      )
      const res = await service.getAutoComplete(this.query)

      if (res && !res.error) {
        this.results = res.data
      } else {
        this.results = []
      }
    },

    select(result) {
      const query = {
        make: null,
        model: null
      }
      const keys = result.key.split('+')
      const values = result.value.split('+')

      for (let i = 0; i < keys.length; i++) {
        query[keys[i].toLowerCase()] = values[i]
      }

      if (!query.make) delete query.make

      if (query.model) {
        delete query.make
      }

      if (!query.model) delete query.model

      this.results = []
      this.$router.push({
        path: this.localePath('inventory'),
        query: query
      })
    },

    onClose() {
      this.results = []
    }
  }
}
