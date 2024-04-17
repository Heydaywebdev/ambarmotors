<template>
  <div class="sorry">
    <img src="/500/500.png" alt="">
    <div class="title" v-html="$t('error_title')"></div>
    <div class="description" v-html="$t('error_description')"></div>
  </div>
</template>

<script>
export default {
  name: 'Sorry'
}
</script>

<style scoped lang="scss">
  .sorry {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: absolute;
    top: 0;
    width: 100%;
    img{
      margin-bottom:20px;
    }
    .title {
      font-size: 3em;
      text-align: center;
    }
    .description {
      margin-top:20px;
      text-align: center;
    }
  }
</style>

<i18n>
  {
    "en" : {
      "error_title" : "<h3>Oops! An error occurred.</h3>",
      "error_description" : "<p>An error occurred, please try again or contact support service at <a href='mailto:support@ambarmotors.com'></a>support@ambarmotors.com</p>"
    },
    "es" : {
      "error_title" : "<h3>Oops! Ocurrió un error.</h3>",
      "error_description" : "<p>Ocurrió un error, por favor intente de nuevo o contacte al servicio de soporte via <a href='mailto:support@ambarmotors.com'></a>soporte@ambarmotors.com</p>"
    }
  }
</i18n>
