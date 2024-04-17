<template src='./pre-approved.html'></template>
<script>
import LocalStore from '~/helpers/LocalStore'
import {mapGetters} from 'vuex'

export default {
  name: 'pre-approved',
  nuxtI18n: {
    paths: {
      en: '/pre-approved',
      es: '/pre-aprobado'
    }
  },
  components: {},
  props: [],
  head() {
    return {
      title: this.$t('tab_title')
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sharedEnv',
    ]),
    api_url() {
      return this.sharedEnv.apiUrl
    }
  },
  mounted() {
    this.scrollToHash();
  },
  methods: {
    handleCampaignSource() {
      if (this.$route.query && this.$route.query.campaign_source) {
        LocalStore.setPriceFromCampaign(this.$route.query.campaign_source)
      }
    },
    scrollToHash() {
      const hash = window.location.hash;
      if (hash && hash === '#financing_form') {
        this.scrollToElement(hash.substring(1));
      }
    },
    scrollToElement(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  },

  beforeMount() {
    this.handleCampaignSource()
  }
}

</script>
<style src='./pre-approved.scss' scoped lang='scss'></style>
<i18n src='./locales.json'></i18n>

