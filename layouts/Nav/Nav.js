import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'am-nav',
  components: {},
  props: [],
  computed: {
    ...mapGetters([
      'getFavorites'
    ])
  },
  data() {
    return {
      showNav: false,
      languageActive: 'English',
      language: {
        en: {
          Name: 'English',
          Key: 'US',
          Flag: 'usa'
        },
        es: {
          Name: 'Spain',
          Key: 'ES',
          Flag: 'spain'
        }
      },
      shown: {
        Language: false,
        More: false
      },
      items: [
        {
          title: 'vehicles',
          to: { name: 'inventory' }
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
      ],
      more: [
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
      expanded: false
    }
  },
  methods: {

    ...mapActions(['toggleShowFavorites']),

    onCloseLang() {
      this.shown.Language = false
    },
    onCloseMore() {
      this.shown.More = false
    },
    toggleExpand(menu) {
      for (const key of Object.keys(this.shown)) {
        if (key === menu) {
          this.shown[key] = !this.shown[key]
        } else {
          this.shown[key] = false
        }
      }
    }
  }
}
