import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  timeline: [
    {
      timestamp: '2019/8/11',
      title: 'Commit',
      content: '提交'
    },
    {
      timestamp: '2019/4/23',
      title: 'Update',
      content: '哈哈'
    },
    {
      timestamp: '2018-04-11',
      title: 'Created',
      content: '创建成功',
      size: 'large',
      type: 'primary',
      icon: 'el-icon-circle-check'
    }
  ],
  activitys: [
    {
      id: '0004',
      type: 'image',
      time: new Date('2019-11-15 06:44:10'),
      imgs: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      share: [],
      like: []
    },
    {
      id: '0002',
      type: 'share',
      time: new Date('2019-11-14 23:44:10'),
      sharelink: {
        id: '0001',
        content: 'Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.'
      },
      desc: '分享了一篇好文章，大家一起来看！',
      share: [],
      like: []
    },
    {
      id: '0001',
      type: 'message',
      time: new Date('2019-11-13 20:00:00'),
      content: 'Lorem ipsum represents a long-held tradition for designers, typographers and the like. Some people hate it and argue for its demise, but others ignore the hate as they create awesome tools to help create filler text for everyone from bacon lovers to Charlie Sheen fans.',
      share: [],
      like: []
    }
  ]
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  UPLOAD_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  UPLOAD_SHARE: (state, {indexs, user}) => {
    if (!state.activitys[indexs].share.indexOf(user) > -1) {
      state.activitys[indexs].share.push(user)
    }
  },
  UPLOAD_LIKE: (state, { indexs, user }) => {
    const ps = state.activitys[indexs].like.indexOf(user)
    if (ps > -1) {
      state.activitys[indexs].like.splice(ps, 1)
    } else {
      state.activitys[indexs].like.push(user)
    }
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(res => {
          const { data } = res
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()

          dispatch('delAllViews', null, { root: true })

          resolve()
        }).catch((err) => {
          reject(err)
        })
    })
  },

  uploadAvatar({ commit }, avatar) {
    return new Promise(resolve => {
      commit('UPLOAD_AVATAR', avatar)
      resolve()
    })
  },

  share({ commit, state }, {id, user}) {
    // console.log(id, user)
    let indexs
    state.activitys.map((v, index) => {
      if (v.id === id) indexs = index
    })
    // console.log(user)
    // console.log(indexs)
    return new Promise((resolve, reject) => {
      if (!(state.activitys[indexs].share.indexOf(user) > -1)) {
        commit('UPLOAD_SHARE', {indexs, user})
        resolve('分享成功!经验+3')
      } else {
        reject('您已经分享过了!')
      }
    })
  },

  likeAgree({ commit, state }, { id, user }) {
    let indexs
    state.activitys.map((v, index) => {
      if (v.id === id) indexs = index
    })
    commit('UPLOAD_LIKE', {indexs, user})
  }
}

export default {
  state,
  actions,
  mutations
}