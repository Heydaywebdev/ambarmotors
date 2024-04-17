<template src="./landingUber.html"></template>
<script>
  import { mapGetters } from 'vuex'
  import FormService from '~/services/form.service'
  import LocalStore from "@/helpers/LocalStore";
  export default {
    name: 'landing-uber',
    nuxtI18n: {
      paths: {
        en: '/buy-to-uber',
        es: '/comprar-carro-para-uber'
      }
    },
    components: {},
    props: [],
    head() {
      return {
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
          Source: 'Uber Landing',
          Comments: ''
        }
      }
    },
    computed: {
      ...mapGetters(['sharedEnv']),

    },
    mounted () {
      this.$recaptcha.init()
    },
    created() {
      // this.$validator.localize('es', {
      //   attributes: locales.es
      // })
      //
      // this.$validator.localize('en', {
      //   attributes: locales.en
      // })
    },
    methods: {
      async sendLandingForm() {
        await this.$validator.validate()

        if (this.errors.items.length > 0) return

        const token = await this.$recaptcha.execute('login')
        if (!token) alert('Please retry recaptcha')
        const service = new FormService(this.$axios, this.sharedEnv.apiUrl)
        this.form.EzLinkTracking = LocalStore.getEzLinkTracking();
        this.form.EzVisitorHash = LocalStore.getVisitorHash();
        this.form.token = token
        const res = await service.sendLandingForm(this.form)

        if (res && !res.error) {
          const query = this.$route.query;
          query.name = `${this.form.FirstName} ${this.form.LastName}`
          this.$router.push(this.localePath({ name: 'thanks', query }))
        } else {
          alert('Error sending form')
        }
      }

    }
  }

</script>
<style src="./landingUber.scss" scoped lang="scss"></style>
<i18n src="./locales.json" scoped></i18n>

