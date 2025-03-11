import { createStore } from 'vuex'

import auth from './modules/auth'
import signin from './modules/signin'
import register from './modules/register'
import user from './modules/user'
import posts from './modules/posts'

export default createStore({
  modules: {
    auth,
    signin,
    register,
    user,
    posts
  }
})
