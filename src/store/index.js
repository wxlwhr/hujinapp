import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import workFlow from './modules/workFlow'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    houtaizhi: '',
    wkToken: '',
    zhidu: []
  },
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    workFlow,
    user
  },
  getters
})

export default store
