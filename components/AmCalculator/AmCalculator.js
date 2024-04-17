import Calculator from '~/helpers/PayCalculator'
import CarFormat from '~/helpers/CarFormat'


export default {
  name: 'am-calculator',
  components: {},
  props: {
    Price: { type: Number }
  },
  data() {
    return {
      price: 20000,
      downpayment: 1000,
      years: 6,
      rate: 7.5,
      priceOptions: null,
      downOptions: null,
      yearOptions: null,
    }
  },
  computed: {},
  mounted() {

    let padding = null,
      size = null

    if (this.$ua.deviceType() == 'pc') {
      padding = '5px 25px'
      size = '1.3'
    } else {
      padding = '3px 10px'
      size = '.9'
    }


    this.priceOptions = {
      processStyle: { backgroundColor: '#00520a', height: '5px' },
      tooltipStyle: { backgroundColor: '#00520a', borderColor: '#00520a', padding: padding, size },
      min: 5000,
      max: 250000,
      interval: 100,
      height: 15,
      width: 'auto',
      tooltip: 'always'
    }
    this.downOptions = {
      processStyle: { backgroundColor: '#00520a', height: '5px' },
      tooltipStyle: { backgroundColor: '#00520a', borderColor: '#00520a', padding: padding, 'font-size': size },
      min: 0,
      max: 25000,
      interval: 100,
      height: 15,
      width: 'auto',
      tooltip: 'always'
    }
    this.yearOptions = {
      processStyle: { backgroundColor: '#00520a', height: '5px' },
      tooltipStyle: { backgroundColor: '#00520a', borderColor: '#00520a', padding: padding, 'font-size': size },
      min: 3,
      max: 6,
      interval: 1,
      height: 15,
      width: 'auto',
      tooltip: 'always'
    }

    //region Bind de Botones
    const btnContainer = document.getElementById('item-container')
    const btns = btnContainer.getElementsByClassName('item')
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        for (let j = 0; j < btns.length; j++) {
          btns[j].classList.remove('selected')
        }
        this.classList.add('selected')
      })
    }
    //endregion

  },
  methods: {
    handlerPrice() {
      const porcent = Math.ceil(this.Price * 0.2)
      const discount = this.Price - porcent
      this.price = discount
    },

    handlerMonthlyPayment() {
      const month = Calculator.MonthlyPayment(this.rate, this.years, this.downpayment, this.Price)
      return CarFormat.PriceFormat(month)
    },

    handlerDownPayment() {
      const down = Math.ceil(this.Price * 0.2)
      this.downpayment = down
    },

    setRate(rate) {
      this.rate = rate
    },

    getMonthlyPayment() {
      const month = Calculator.MonthlyPayment(this.rate, this.years, this.downpayment, this.price)
      return CarFormat.PriceFormat(month)
    },
    getFormattedNumber(number) {
      return CarFormat.PriceFormat(number)
    },
    goToInventory(){

      const query = {};

      query.min_price = this.price;
      query.max_price = 250000;

      this.$router.push({
        path: '/inventory',
        query: query
      })
    },
  }
}
