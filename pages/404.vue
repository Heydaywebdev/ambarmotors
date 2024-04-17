<template>
  <div class="sorry">
<div>test</div>    
<img src="/404/404.png" alt="">
    <div class="title" v-html="$t('error_title')"></div>
    <div class="decription" v-html="$t('error_description')"></div>
  </div>
</template>

<script>
export default {
  name: 'Sorry'
}
</script>

<style scoped></style>

<i18n>
  {
    "en" : {
      "error_title" : "<h3>Not Found.</h3>",
      "error_description" : "<p>The resource you are looking for does not exist, please try again or contact support service at <a href='mailto:support@ambarmotors.com'></a>support@ambarmotors.com</p>"
    },
    "es" : {
      "error_title" : "<h3>No encontrado.</h3>",
      "error_description" : "<p>El recurso buscado no existe, por favor intente de nuevo o contacte al servicio de soporte via <a href='mailto:support@ambarmotors.com'></a>soporte@ambarmotors.com</p>"
    }
  }
</i18n>
