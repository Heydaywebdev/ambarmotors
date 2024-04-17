export default {
  set(key, value) {
    if (process.client) {
      localStorage.setItem(key, value)
    }
  },
  get(key) {
    if (process.client) {
      return localStorage.getItem(key)
    }
    return null
  },

  addRecentlyViewed(car) {
    const items = JSON.parse(this.get('ambarmotors_recently_viewed') || '[]')

    if (items.findIndex(c => c.VIN === car.VIN) > -1) return

    delete car.Company

    items.unshift(car)

    if (items.length > 5) items.pop()

    this.set('ambarmotors_recently_viewed', JSON.stringify(items))
  },

  getRecentlyViewed() {
    return JSON.parse(this.get('ambarmotors_recently_viewed') || '[]')
  },

  getCompared() {
    return JSON.parse(this.get('ambarmotors_compare_module') || '[]')
  },


  setCompared(cars) {
    this.set('ambarmotors_compare_module', JSON.stringify(cars))
  },

  getFavorites() {
    return JSON.parse(this.get('ambarmotors_favorite_module') || '[]')
  },

  setFavorites(cars) {
    this.set('ambarmotors_favorite_module', JSON.stringify(cars))
  },

  setPriceFromCampaign(source) {
    this.set('ambarmotors_campaign_source', JSON.stringify(source))
  },

  getEzLinkTracking() {
    return JSON.parse(localStorage.getItem('ezl_link_tracking'));
  },

  getVisitorHash() {
    return JSON.parse(localStorage.getItem('ezl_visitor'));
  },

  getPriceFromCampaign() {
    return JSON.parse(this.get('ambarmotors_campaign_source'))
  },

  setEZLCampaignSource(source) {
    this.set('ezl_campaign_tracking_source', JSON.stringify(source))
  },

  getEZLCampaignSource() {
    return JSON.parse(this.get('ezl_campaign_tracking_source'))
  },
}
