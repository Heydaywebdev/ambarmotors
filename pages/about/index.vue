<template src="./about.html"></template>
<script>
  export default {
    name: 'AboutPage',
    nuxtI18n: {
      paths: {
        en:'/about',
        es:'/nosotros'
      }
    }
  }

</script>
<style src="./about.scss" scoped lang="scss"></style>
<i18n scoped src="./locales.json"></i18n>
