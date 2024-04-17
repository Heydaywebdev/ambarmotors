import AmNav from '../Nav/index.vue'
import AmNavMobile from '../NavMobile/index.vue'
import AmSearchCar from '~/components/AmSearchCar/index.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'am-header',
  components: { AmNav, AmNavMobile, AmSearchCar },
  data() {
    return {
      showMenu: false
    }
  },

  computed: {
    ...mapGetters([
      'getFavorites'
    ]),
    isHome(){
      const home = this.$route && this.$route.name && this.$route.name.includes('index')
      return home;
    }
  },

  methods: {
    ...mapActions([
      'toggleMobileMenu',
    ]),
  },

  jsonld() {
    return {
      "@context": "https://schema.org",
      "@type": "AutoDealer",
      "name":"Ambar Motors",
      "url":"https://ambarmotors.com",
      "logo":"https://ambarmotors.com/images/assets/logo-large.png",
      "image":"https://ambarmotors.com/images/assets/logo-large.png",
      "telephone":"(305)614-3505",
      "maps":"https://www.google.com/maps/place/4875+NW+77th+Ave,+Doral,+FL+33166/@25.8178484,-80.3221937,17z/data=!3m1!4b1!4m5!3m4!1s0x88d9ba2b5c57462f:0x9939092bdb656f6b!8m2!3d25.8178448!4d-80.3198896",
      "openingHours":["Mon-Sat 9:30 am - 8:00 pm", "Sun 11:00 am - 5:00 pm"],
      "address":{
        "@type":"PostalAddress",
        "streetAddress":"4875 NW 77th Ave",
        "addressLocality": "Miami",
        "addressRegion": "FL"
      }
    }
  },
}
