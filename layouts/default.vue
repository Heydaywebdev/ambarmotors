<template>
  <div class="main">
    <div class="main__header">
      <AmHeader/>
      <AmSaveCars v-if="isShowFavorites"/>
    </div>
    <div class="main__container">
      <nuxt/>
    </div>
    <div class="main__footer">
      <AmFooter/>
    </div>

    <script async type="application/javascript">
      ;(function (w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        })
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', 'GTM-WPPV57B')
    </script>


    <script
      async
      type="application/javascript"
      :src="`${api_url}/livechat.js`"
    ></script>
    <script
      async
      type="application/javascript"
      src="https://www.googletagmanager.com/gtag/js?id=UA-36270699-2"
    ></script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-FHJYL0YNYQ"></script>

    <script async>
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }

      gtag('js', new Date());

      gtag('config', 'G-FHJYL0YNYQ');
    </script>

    <script type="application/javascript" async>
      // Global site tag (gtag.js) - Google Analytics
      window.dataLayer = window.dataLayer || []

      function gtag() {
        dataLayer.push(arguments)
      }

      gtag('js', new Date())
      gtag('config', 'UA-36270699-2')
    </script>
    <script defer type="application/javascript">
      var _userway_config = {
        account: 'UpqvEBOFlo'
      }
    </script>
    <script
      defer
      type="application/javascript"
      src="https://cdn.userway.org/widget.js"
    ></script>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import LocalStore from '~/helpers/LocalStore'
import AmHeader from './AmHeader/index.vue'
import AmSaveCars from './AmSaveCars/index.vue'
import AmFooter from './AmFooter/index.vue'

export default {
  components: {AmHeader, AmFooter, AmSaveCars},
  computed: {
    ...mapGetters(['isShowFavorites', 'sharedEnv']),
    api_url() {
      return this.sharedEnv.apiUrl
    }
  },
  data() {
    return {
      items: [
        {
          title: 'Home.backup',
          icon: 'home',
          to: {name: 'index'}
        },
        {
          title: 'About',
          icon: 'lightbulb',
          to: {name: 'about'}
        }
      ]
    }
  },
  methods: {
    ...mapActions(['setFavorites', 'setCompared'])
  },
  mounted() {
    this.setCompared(LocalStore.getCompared() || [])
    this.setFavorites(LocalStore.getFavorites() || [])
  }
}
</script>
<style lang="scss">
@import '~/scss/main.scss';

:root {
  --primary-green: #1b4d08;
  --primary-green-dark: #1c4a0c;
  --primary-green-ligth: #2da401;
  --primary-orange: #ffae00;
  --primary-orange-dark: #f2a03a;
  --primary-orange-light: #00520a;
  --secondary-green: #00520a;
  --secondary-green-dark: #1c4a0c;
  --secondary-green-light: #2da401;
  --secondary-orange: #ffae00;
  --secondary-orange-dark: #f2a03a;
  --secondary-orange-light: #f7f7f7;
  --gray-primary: #e8e8eb;
  --gray-border: #737587;
  --gray-secondary: #d1d2d8;
  --gray-alt: #f5f5f5;
  --gradient-primary-green: linear-gradient(67deg, #00520a 0%, #2da401 100%);
  --gradient-primary-green-ligth: linear-gradient(
      -125deg,
      #00520a 0%,
      #3daf02 72%,
      #30d400 100%
  );
  --gradient-primary-green-orange: linear-gradient(
      -135deg,
      #147508 0%,
      #fdff41 100%
  );
  --gradient-primary-yellow: linear-gradient(-135deg, #ffae00 0%, #fbe301 100%);
  --gradient-primary-orange: linear-gradient(-135deg, #f2a03a 0%, #f54934 100%);
  --p: #50525e;
  --titles: #4b4a4a;
  --white: #fff;
  --border: #e0e2e9;
  --circle-bg: #f8fafd;
  --error: orangered;
  --body-bg: #f9f9f9;
  --box-shadow-orange: 0 0 5px rgba(255, 165, 25, 0.3);
  --box-shadow-gray: 0 21px 21px 0 rgba(0, 0, 0, 0.03);
}

h2 {
  font-size: 2em;
}

body {
  background: var(--body-bg);
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    padding-top: 81px; // Original is 81px
    height: 100vh;
    display: flex;
    flex-direction: column;
    @media #{$media-movil, $media-iphone, $media-laptop} {
      padding-top: 70px; // Original is 70px
    }


    &__container {
      flex: 1;
      @media #{$media-movil, $media-iphone} {
        width: 100%;
        //overflow: scroll;
      }
    }
  }
}
</style>
