<template src="./landingMiles.html"></template>
<script>
  import { mapGetters } from 'vuex'
  import FormService from '~/services/form.service'
  export default {
    name: 'landing-miles',
    nuxtI18n: {
      paths: {
        en: '/warranty-200k-miles',
        es: '/garantia-hasta-200mil-millas'
      }
    },
    components: {},
    props: [],
    head() {
      return {
        script: [
          {
            src:
              'https://www.google.com/recaptcha/api.js?render=6LcAgKwUAAAAACCtODSku12MNUkIi_zelwPQEARE'
          }
        ]
      }
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['sharedEnv']),

    },
    mounted () {
      this.$recaptcha.init()
    },
    created() {
      // this.$validator.localize('es', {
      //   attributes: locales.es
      // })
      //
      // this.$validator.localize('en', {
      //   attributes: locales.en
      // })
    },
    methods: {

    }
  }

</script>
<style src="./landingMiles.scss" scoped lang="scss"></style>
<i18n src="./locales.json" scoped></i18n>

