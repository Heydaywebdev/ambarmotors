<template src="./sell.html"></template>
<script>
  import { mapGetters } from 'vuex'
  import { getIframe } from '../appraisalWidget/iframe'

  export default {
    name: 'sell',
    nuxtI18n: {
      paths: {
        en: '/sell-your-car',
        es: '/vendenos-tu-auto'
      }
    },
    components: {},
    props: [],
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters(['isShowFavorites', 'sharedEnv']),

      api_url() {
        return this.sharedEnv.apiUrl
      },
      iframeDoc() {
        return getIframe(this.api_url);
      }
    },
    mounted () {
    },
    methods: {

    }
  }

</script>
<style src="./sell.scss" scoped lang="scss"></style>
<i18n scoped src="./locales.json"></i18n>

