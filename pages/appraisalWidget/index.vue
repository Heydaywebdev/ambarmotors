<template src="./appraisalWidget.html"></template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppraisalWidget',
  nuxtI18n: {
    paths: {
      en: '/sell-us-your-car-now',
      es: '/vendenos-tu-auto-ahora'
    }
  },
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isShowFavorites', 'sharedEnv']),

    api_url() {
      return this.sharedEnv.apiUrl
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style src="./appraisalWidget.scss" scoped lang="scss"></style>
<i18n src="./locales.json" scoped></i18n>
