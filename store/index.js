import { DARK_THEME } from '../services/helpers/consts'

export const state = () => ({
  darkTheme: '',
  sessions: [],
  members: [],
  organizers: []
})

export const getters = ({
  isDarkTheme: state => !!state.darkTheme
})
export const mutations = {
  updateTheme (state) {
    state.darkTheme = this.$cookies.get(DARK_THEME) || ''
  },
  updateSessions (state, sessions) {
    state.sessions = sessions
  },
  updateMembers (state, members) {
    state.members = members
  },
  updateOrganizers (state, organizers) {
    state.organizers = organizers
  }
}
export const actions = {
  activateDark (context) {
    this.$cookies.set(DARK_THEME, 'dark', { maxAge: 60 * 60 * 24 * 1000, path: '/' })
    context.commit('updateTheme')
  },
  deactivateDark (context) {
    this.$cookies.remove(DARK_THEME)
    context.commit('updateTheme')
  },
  async nuxtServerInit (context) {
    await context.commit('updateTheme')
    await context.dispatch('user/getUser', { root: true })
  }
}
