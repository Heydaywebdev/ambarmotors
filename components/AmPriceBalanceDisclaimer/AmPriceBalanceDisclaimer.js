export default {
  name: 'am-price-balance-disclaimer',
  components: {},
  props: ['price'],
  data () {
    return {

    }
  },
  computed: {
    down(){
      const down = Math.ceil(this.price * 0.2);
      return down
    },

    discount(){
      const porcent = Math.ceil(this.price * 0.2);
      const discount = this.price- porcent;
      return discount
    },
  },
  mounted () {

  },
  methods: {

  }
}
