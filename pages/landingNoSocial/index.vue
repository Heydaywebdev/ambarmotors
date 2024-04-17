<template src="./landingNoSocial.html"></template>
<script>
  import { mapGetters } from 'vuex'
  import FormService from '~/services/form.service'
  import locales from './locales.json'
  import LocalStore from "@/helpers/LocalStore";
  export default {
    name: 'landing-no-social',
    nuxtI18n: {
      paths: {
        en: '/no-social-security',
        es: '/sin-seguro-social'
      }
    },
    components: {},
    props: [],
    head() {
      return {
        title:this.$t('tab_title'),
        script: [
          {
            src:
              'https://www.google.com/recaptcha/api.js?render=6LcAgKwUAAAAACCtODSku12MNUkIi_zelwPQEARE'
          }
        ]
      }
    },
    data () {
      return {
        form: {
          FirstName: '',
          MiddleName: '',
          LastName: '',
          Email: '',
          Phone: '',
          Source: 'No Social Landing',
          Comments: ''
        }
      }
    },
    computed: {
      ...mapGetters(['sharedEnv']),

    },
    mounted () {
      this.$recaptcha.init();
      this.scrollToHash();
    },
    created() {
      this.$validator.localize('es', {
        attributes: locales.es
      })

      this.$validator.localize('en', {
        attributes: locales.en
      })
    },
    methods: {
      async sendLandingForm() {
        await this.$validator.validate()

        if (this.errors.items.length > 0) return

        const token = await this.$recaptcha.execute('login')
        if (!token) alert('Please retry recaptcha')
        const service = new FormService(this.$axios, this.sharedEnv.apiUrl)

        this.form.TrackingSource = LocalStore.getEZLCampaignSource();
        this.form.EzLinkTracking = LocalStore.getEzLinkTracking();
        this.form.EzVisitorHash = LocalStore.getVisitorHash();
        this.form.token = token

        const res = await service.sendLandingForm(this.form)

        if (res && !res.error) {
          const query = this.$route.query;
          query.source = `ssn-landing`
          query.name = `${this.form.FirstName} ${this.form.LastName}`
          this.$router.push(this.localePath({ name: 'thanks', query }))
        } else {
          alert('Error sending form')
        }
      },
      scrollToHash() {
        const hash = window.location.hash;
        if (hash && hash === '#form-cta') {
          this.scrollToElement(hash.substring(1));
        }
      },
      scrollToElement(id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

</script>
<style src="./landingNoSocial.scss" scoped lang="scss"></style>
<i18n src="./locales.json" scoped></i18n>

