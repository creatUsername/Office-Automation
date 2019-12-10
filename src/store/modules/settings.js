// import variables from '@/styles/element-variables.scss'
import { showSettings, tagsView, fixedHeader, sidebarLogo } from '@/settings'
import variables from '@/styles/element-variables.scss'

const state = {
  theme: variables.theme,
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  state,
  mutations,
  actions
}