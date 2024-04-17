<template>
  <div class="sorry" v-if="error.statusCode === 404">
    <img src="/404/404.png" alt="">
    <div class="title" v-html="$t('error_title')"></div>
    <a href="/">{{$t('back')}}</a>
    <!--<div class="decription" v-html="$t('error_description')"></div>-->
  </div>
  <div class="sorry" v-else-if="error.statusCode === 500">
    <img src="/500/500.png" alt="">
    <div class="title" v-html="$t('error_title')"></div>
    <!--<div class="decription" v-html="$t('error_description')"></div>-->
    <div class="decription" v-html="error.message"></div>
  </div>
  <div class="sorry" v-else>
    <img src="/404/404.png" alt="">
    <div class="title" v-html="$t('error_title')"></div>
    <!--<div class="decription" v-html="$t('error_description')"></div>-->
    <div class="decription" v-html="error.message"></div>
  </div>
</template>

<script>
  export default {
    name: 'Sorry',
    props: ['error'],
    mounted() {
      console.error(this.error);
    }
  }
</script>

<style scoped lang="scss">
  .sorry {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:50px 0;
    width: 100%;
    img{
      margin-bottom:20px;
    }
    .title {
      font-weight: bold;
      color: black;
      margin-bottom:20px;
    }
  }
</style>

<i18n>
  {
  "en" : {
  "error_title" : "<h1>Sorry... Page not found.</h1>",
  "error_description" : "<p>The resource you are looking for does not exist, please try again or contact support service at <a href='mailto:support@ambarmotors.com'></a>support@ambarmotors.com</p>",
  "back":"Back to Home"
  },
  "es" : {
  "error_title" : "<h3>No se ha encontrado esta pagina.</h3>",
  "error_description" : "<p>El recurso buscado no existe, por favor intente de nuevo o contacte al servicio de soporte via <a href='mailto:support@ambarmotors.com'></a>soporte@ambarmotors.com</p>",
  "back": "Regresa al inicio"
  }
  }
</i18n>
