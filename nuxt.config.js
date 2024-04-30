const pkg = require('./package')
const server = '0.0.0.0'
const port = 5000

module.exports = {
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      //Search Console
      { name: 'google-site-verification', content: 'ySEC9wuhg585bmR0KDxQGr70Kf8cvZWhzu8Ay74yMY4' },
      //Merchant Remarketing
      { hid: 'google-site-verification', name: 'google-site-verification', content: '90Ur1d4b6aMgtDWKqHLbc6m5XtNF6V66yuTAMBn9n44' },
      //Merchant Vehicles ADS
      { hid: 'google-site-verification', name: 'google-site-verification', content:'_pZsIiVHEuEe_EsQ59eEf2s_UFihiIqpwrCgfGpUgfk' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Carter+One|Fondamento|Frank+Ruhl+Libre|Roboto&display=swap'
      }
    ],

    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=AW-1003773781',
        async: true
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-1003773781');
        `,
        type: 'text/javascript',
        charset: 'utf-8'
      },
      {
        innerHTML: `
          gtag('config', 'AW-1003773781/mTEACPfUwKIZENW-0d4D', {
            'phone_conversion_number': '(305) 827-8484'
          });
        `,
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ]
  },

  serverMiddleware: ['~/server/backend'],

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FF9F05' },

  /*
   ** Global CSS
   */
  css: ['~/scss/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/jsonld.js',
    '~/plugins/globalComponents',
    {
      src: '~/plugins/closable.js',
      ssr: false
    },
    {
      src: '~/plugins/slider.js',
      ssr: false
    },
    {
      src: '~/plugins/range.js',
      ssr: false
    },
    {
      src: '~/plugins/vue-infinite-scroll.js',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    // 'nuxt-buefy',
    '@nuxtjs/pwa',
    'nuxt-user-agent',
    'nuxt-device-detect',
    '@nuxtjs/recaptcha',
    [
      'nuxt-validate',
      {
        nuxti18n: true
      }
    ],
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US'
          },
          {
            code: 'es',
            iso: 'es-ES'
          }
        ],
        strategy: 'prefix_and_default',
        defaultLocale: 'en',
        vueI18nLoader: true,
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: {
              welcome: 'Welcome'
            },
            es: {
              welcome: 'Bienvenido'
            }
          }
        }
      }
    ]
  ],

  recaptcha: {
    hideBadge: true,
    siteKey: '6LcAgKwUAAAAACCtODSku12MNUkIi_zelwPQEARE',
    version: 3
  },

  axios: {},

  server: {
    port: port,
    host: server
  },

  /*
   ** Build configuration
   */
  env: {
    jwt_key: '1234567890',
    production: {
      baseUrl: 'https://ambarmotors.com',
      inventoryUrl: 'https://inventory.ezlead.io',
      cdnUrl: 'https://cdn.ezlead.io',
      apiUrl: 'https://api.ezlead.io',
      ezlead_key: '03c257dae67e'
    },
    staging: {
      baseUrl: 'https://staging.ambarmotors.com',
      inventoryUrl: 'https://inventory.ezleadsdev.com',
      cdnUrl: 'https://cdn.ezleadsdev.com',
      apiUrl: 'https://api.ezleadsdev.com',
      ezlead_key: '123c57d67aee'
    },
    development: {
      // baseUrl: 'https://staging.ambarmotors.com',
      // inventoryUrl: 'https://inventory.ezleadsdev.com',
      // cdnUrl: 'https://cdn.ezleadsdev.com',
      // apiUrl: 'https://api.ezleadsdev.com',
      // ezlead_key: '123c57d67aee'
      // baseUrl: `http://localhost.ambarmotors.com:${port}`,
      baseUrl: `http://localhost:${port}`,
      inventoryUrl: 'https://inventory.ezlead.io',
      cdnUrl: 'https://cdn.ezlead.io',
      apiUrl: 'http://localhost:5000',
      ezlead_key: 'b23c57d67aee'

    }
  },
  build: {
    postcss: null,
    /*
     ** You can extend webpack config here
     */
    /*    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }

    */
  }
}
