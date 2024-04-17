<template src="./calculator.html"></template>
<script>
  import AmCalculator from '~/components/AmCalculator/index.vue'

  export default {
    name: 'calculator',
    components: {AmCalculator},
    nuxtI18n: {
      paths: {
        en: '/calculator',
        es: '/calculadora'
      }
    },
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
<style src="./calculator.scss" scoped lang="scss"></style>

