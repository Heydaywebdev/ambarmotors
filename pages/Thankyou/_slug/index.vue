<template src="./index.html"></template>
<script>
  export default {
    name: 'thankyou',
    nuxtI18n: {
      paths: {
        en: '/thanks/:slug',
        es: '/gracias/:slug'
      }
    },
    components: {},
    props: [],
    data () {
      return {

      }
    },
    computed: {

    },
    mounted () {

    },
    methods: {

    }
  }
</script>
<style src="./index.scss" scoped lang="scss"></style>
<i18n src="./locales.json"></i18n>

