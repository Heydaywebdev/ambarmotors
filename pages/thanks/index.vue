<template src="./thanks.html"></template>
<script>
  export default {
    name: 'thanks',
    components: {},
    props: [],
    data () {
      return {
        name: ''
      }
    },
    computed: {

    },
    mounted () {
      if ( this.$route.query.name  ) {
        this.name = this.$route.query.name;
      }
    },
    methods: {

    }
  }

</script>
<style src="./thanks.scss" scoped lang="scss"></style>
<i18n src="./locales.json"></i18n>

