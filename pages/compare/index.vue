<template src="./compare.html"></template>
<script>
  import AmComparedCarCard from "~/components/AmCarCompare/index.vue"

  export default {
    name: 'compare',
    nuxtI18n: {
      paths: {
        en:'/compare',
        es:'/compare'
      }
    },
    components: { AmComparedCarCard},
    props: [],
    data () {
      return {

      }
    },
    computed: {


      Compared:{
        get(){
          return this.$store.getters.getCompared;
        }
      }
    },
    mounted () {
    },
    methods: {
    }
  }

</script>
<style src="./compare.scss" scoped lang="scss"></style>

