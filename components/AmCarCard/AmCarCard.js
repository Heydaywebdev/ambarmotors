import {mapActions} from 'vuex'
import AmPriceBalanceDisclaimer from '~/components/AmPriceBalanceDisclaimer/index.vue'
import LocalStore from '~/helpers/LocalStore'

export default {
  name: 'am-car-card',
  components: {AmPriceBalanceDisclaimer},
  props: {
    car: {type: Object, required: true},
    firstCar: {type: Boolean}
  },
  data() {
    return {
      Campaign: {
        has: false,
        name: ''
      }
    }
  },
  computed: {
    discount() {
      const CAMPAIGN_NAME = LocalStore.getPriceFromCampaign()
      if (!CAMPAIGN_NAME) {
        const porcent = Math.ceil(this.car.RetailPrice.Value * 0.2)
        const discount = this.car.RetailPrice.Value - porcent
        return discount
      } else {
        const PRICES = {
          autotrader: this.car.ThirdPartyPrice.Autotrader.Value,
          carfax: this.car.ThirdPartyPrice.Carfax.Value,
          cargurus: this.car.ThirdPartyPrice.Cargurus.Value,
          carsdotcom: this.car.ThirdPartyPrice.Carsdotcom.Value,
          edmunds: this.car.ThirdPartyPrice.Edmunds.Value,
          facebook: this.car.ThirdPartyPrice.Facebook.Value,
          google: this.car.ThirdPartyPrice.Google.Value,
          truecars: this.car.ThirdPartyPrice.Truecars.Value
        }

        this.Campaign.has = true

        return PRICES[CAMPAIGN_NAME] || this.car.StickerPrice.Value || this.car.RetailPrice.Value
      }

    },
    isFavorite() {
      return (
        this.$store.getters.getFavorites.findIndex(
          c => c.VIN === this.car.VIN
        ) > -1
      )
    },
    isCompared() {
      return (
        this.$store.getters.getCompared.findIndex(c => c.VIN === this.car.VIN) >
        -1
      )
    },
    isComparing() {
      return (
        this.$store.getters.getCompared.length > 1 ||
        this.$store.getters.getIsComparing
      )
    },

    fileserver() {
      return this.$store.getters.sharedEnv.cdnUrl
    },

    carImg() {
      if (!(this.car.SelectedImage || this.car.Images.length > 0))
        return 'https://ambarmotors.com/coming-soon.png'
      const img = this.car.SelectedImage
        ? this.car.SelectedImage
        : this.car.Images[0].File
      return `${this.fileserver}/api/files/${img}.jpg?resolution=360&zoom=off&frame=off`
    },

    carPayment(params) {
      let r = (params.apr / 12) / 100 || (3.5 / 12) / 100
      let n = params.years * 12 || 6 * 12
      let d = params.downpayment || 1000
      let p = this.car.RetailPrice.Value - d
      let per_month = p * ((r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1))
      return per_month.toFixed(0)
    }
  },
  mounted() {
    this.adjustDisclaimerBox();
  },
  methods: {
    ...mapActions([
      'setFavorites',
      'addToFavorites',
      'delFavorite',
      'setCompared',
      'addToCompared',
      'delCompared'
    ]),

    getSlug(car) {
      return `${car.Year}+${car.Make}+${car.Model}+${car.Body}+${car.VIN.substr(
        9,
        7
      )}`
    },

    adjustDisclaimerBox() {
      const showDisclaimerText = this.$refs.disclaimerTextRef;
      const disclaimerBoxRef = this.$refs.disclaimerBoxRef;

      const adjustPosition = function () {
        const rect = disclaimerBoxRef.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        if (rect.x < 0) {
          const overflowX = rect.right - viewportWidth;
          disclaimerBoxRef.style.left = `${disclaimerBoxRef.offsetLeft - overflowX}px`;
        }

        if(rect.right > viewportWidth){
          const overflowX = rect.right - viewportWidth;
          disclaimerBoxRef.style.left = `${disclaimerBoxRef.offsetLeft - overflowX}px`;
        }
      };

      showDisclaimerText.addEventListener('mouseover', adjustPosition);

      showDisclaimerText.addEventListener('touchstart', adjustPosition);
    }
  }
}
