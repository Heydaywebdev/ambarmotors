<template src="./financingWidget.html"></template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'financingWidget',
    nuxtI18n: {
      paths: {
        en: '/pre-approved-form',
        es: '/pre-aprovado-formulario'
      }
    },
    components: {},
    props: [],
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'isShowFavorites',
        'sharedEnv',
      ]),
      api_url() {
        return this.sharedEnv.apiUrl
      }
    },
    mounted () {

    },
    methods: {

    }
  }

</script>
<style src="./financingWidget.scss" scoped lang="scss"></style>
<i18n src="./locales.json" scoped></i18n>


