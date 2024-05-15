import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'nav-mobile',
  components: {},
  props: [],
  data () {
    return {
      hideNav: false,
      languageActive:'',
      items: [
        {
          title: 'vehicles',
          to: 'https://express.ambarmotors.com/inventory/used'
        },
        {
          title: 'sell-car',
          to: { name: 'sell' }
        },
        {
          title: 'financing',
          to: { name: 'pre-approved' }
        },
        {
          title: 'capitalOne',
          to: { name: 'capitalOne' }
        },
        {
          title: 'calculator',
          to: { name: 'calculator' }
        },
        {
          title: 'assurance',
          to: { name: 'assurance' }
        },
        {
          title: 'services',
          to: { name: 'services' }
        },
        {
          title: 'about',
          to: { name: 'about' }
        },
        {
          title: 'contact',
          to: { name: 'contact' }
        }
      ],
    }
  },
  computed: {
    ...mapGetters([
      'getMobileMenu',
    ])

  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'toggleMobileMenu'
    ]),

    navLink(link) {
      this.toggleMobileMenu();
      if (typeof link.to === 'string') {
        console.log('Enlace externo:', link.to); // <-- Agrega este console.log
        window.location.href = link.to;
      } else {
        this.$router.push(link.to);
      }
    }
  }
};