<template src='./home/home.html'></template>
<script>
import AmHero from '~/components/AmHero/index.vue'
import AmHeroChristmas from '~/components/AmHeroChristmas/index.vue'
import AmCarRecently from '~/components/AmCarRecently/index.vue'

export default {
  name: 'Home',
  components: { AmHero, AmHeroChristmas, AmCarRecently },
  props: [],
  head(){
    return{
      title:this.$t('tab_title')
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
  },
  methods: {}
}
</script>
<style src='./home/home.scss' scoped lang='scss'></style>
<i18n src='./home/locales.json' scoped></i18n>
