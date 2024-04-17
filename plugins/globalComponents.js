import Vue from 'vue'
import AmButton from '~/components/UI/AmButton.vue'

const components = { AmButton }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
