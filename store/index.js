import LocalStore from '~/helpers/LocalStore'
import { getEnv } from '../server/utils/sharedEnv'

export const strict = false

export const state = () => ({
  sharedEnv: {},
  filterToggle: {},
  userFilters: [],
  mobileMenuExpand: false,
  carsCompared: [],
  carsFavorites: [],
  isComparing: false,
  car: null,
  userFiltersModels: '',
  userFiltersMakes: '',
  userFiltersBodies: '',
  userFiltersYears: '',
  showFavorites: false
})

export const mutations = {
  setSharedEnv(state, content) {
    state.sharedEnv = content
  },

  setFilterToggle(state, content) {
    state.filterToggle[content.key] = content.value
  },

  toggleMobileMenu(state) {
    state.mobileMenuExpand = !state.mobileMenuExpand
  },


  setFavorites(state, cars) {
    state.carsFavorites = cars
    LocalStore.setFavorites(state.carsFavorites)
  },

  toggleShowFavorites(state) {
    state.showFavorites = !state.showFavorites
  },

  setIsComparing(state, value) {
    state.isComparing = value
  },

  addToFavorites(state, car) {
    if ( state.carsFavorites.findIndex(c => c.VIN === car.VIN) < 0 ) {
      state.carsFavorites.push(car)
    }
    LocalStore.setFavorites(state.carsFavorites)
  },

  delFavorite(state, car) {
    const index = state.carsFavorites.findIndex(c => c.VIN === car.VIN)
    if (index > -1) {
      state.carsFavorites.splice(index, 1)
    }
    LocalStore.setFavorites(state.carsFavorites)
  },

  addToCompared(state, car) {
    if ( state.carsCompared.findIndex(c => c.VIN === car.VIN) < 0  && state.carsCompared.length < 4) {
      state.carsCompared.push(car)
    }
    LocalStore.setCompared(state.carsCompared)
  },

  delCompared(state, car) {
    const index = state.carsCompared.findIndex(c => c.VIN === car.VIN)
    if ( index > -1 ) {
      state.carsCompared.splice(index, 1)
    }
    LocalStore.setCompared(state.carsCompared)
  },

  setCompared(state, cars) {
    state.carsCompared = cars
    LocalStore.setCompared(state.carsCompared)
  },


  setCar(state, content) {
    state.car = content
  },

  presetFilterToggle(state, content) {
    state.filterToggle = content
  },

  setUserFilters(state, content) {
    state.userFilters = content
  },

  toggleUserFilter(state, filter) {
    const index = state.userFilters.findIndex(a => a === filter)
    if (index !== -1) state.userFilters.splice(index, 1)
    else state.userFilters.push(filter)
  }
}
export const getters = {
  sharedEnv: state => state.sharedEnv,
  getFilterToggle: state => state.filterToggle,
  getUserFilters: state => state.userFilters,
  getCar: state => state.car,
  getMobileMenu: state => state.mobileMenuExpand,
  getCompared: state => state.carsCompared,
  getIsComparing: state => state.isComparing,
  getFavorites: state => state.carsFavorites,
  isShowFavorites: state => state.showFavorites
}

const getSharedEnv = (env) => {
  return process.server ? require('~/server/utils/sharedEnv').getEnv(env) || {} : {};
}


export const actions = {
  nuxtServerInit({ commit }) {
    if (process.server) {
      const env = global.env || process.env.NODE_ENV || 'development';
      commit('setSharedEnv', getSharedEnv(env))
    }
  },

  setIsComparing({ commit }, value) {
    commit('setIsComparing', value)
  },

  setFilterToggle({ commit }, content) {
    commit('setFilterToggle', content)
  },

  toggleMobileMenu( {commit}) {
    commit('toggleMobileMenu')
  },

  setUserFilters({ commit }, content) {
    commit('setUserFilters', content)
  },

  toggleUserFilter({ commit }, filter) {
    commit('toggleUserFilter', filter)
  },

  setCar({ commit }, car) {
    commit('setCar', car)
  },

  setFavorites({commit}, cars) {
    commit('setFavorites', cars)
  },

  addToFavorites({commit}, car) {
    commit('addToFavorites', car)
  },

  delFavorite({commit}, car) {
    commit('delFavorite', car)
  },

  setCompared({commit}, cars) {
    commit('setCompared', cars)
  },

  addToCompared({commit}, car) {
    commit('addToCompared', car)
  },

  delCompared({commit}, car) {
    commit('delCompared', car)
  },
  toggleShowFavorites({commit}){
    commit('toggleShowFavorites')
  }
}
