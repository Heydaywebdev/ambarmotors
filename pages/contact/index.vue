<template src='./contact.html'></template>
<script>
import {mapGetters} from 'vuex'
import FormService from '~/services/form.service'
import locales from './locales.json'
import LocalStore from "@/helpers/LocalStore";

export default {
  name: 'Contact',
  nuxtI18n: {
    paths: {
      en: '/contact-us',
      es: '/contactanos'
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

  data() {
    return {
      contact: {
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Comments: ''
      },
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['sharedEnv']),
    isValid() {
      return true
    },
    api_url() {
      return this.sharedEnv.apiUrl
    }
  },
  mounted() {
    this.$recaptcha.init()
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
    async sendContact() {
      await this.$validator.validate()

      if (this.errors.items.length > 0) return

      this.isLoading = true


      const token = await this.$recaptcha.execute('login')
      if (!token) alert('Please retry recaptcha')
      const service = new FormService(this.$axios, this.sharedEnv.apiUrl)

      this.contact.token = token
      this.contact.TrackingSource = LocalStore.getEZLCampaignSource();

      const res = await service.sendContact(this.contact)
      if (res && !res.error) {
        const query = this.$route.query
        query.name = `${this.contact.FirstName} ${this.contact.LastName}`
        query.source = `contact-form`
        this.$router.push(this.localePath({name: 'thanks', query}))
        this.isLoading = false

      } else {
        alert('Error sending form')
      }
    }
  }
}
</script>
<style src='./contact.scss' scoped lang='scss'></style>
<i18n scoped src='./locales.json'></i18n>
