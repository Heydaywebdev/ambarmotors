export default {
  name: 'am-footer',
  computed:{
    isInventory(){
      const inventory = this.$route && this.$route.name && this.$route.name.includes('inventory__')
      const catalog = this.$route && this.$route.name && this.$route.name.includes('catalog__')
      return inventory || catalog;
    }
  },
  mounted() {
  }
}
