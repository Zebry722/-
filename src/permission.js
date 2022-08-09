/**
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // has no token

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
*/
import router from "@/router";
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//前置守卫
//to：到哪里去    from：从哪里来  next：必须执行，如果不执行 页面就死了
//next()放过   next(false)跳转终止    next(地址)跳转到某个地址
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  nprogress.start() //开启进度条
  if (store.getters.token) {
    //如果有token
    if (to.path === '/login') {
      //如果要访问的是login的话
      next('/')  //跳转到主页
    } else {
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
      }
      next()
    }
  } else {
    //如果没有token的情况下,是否在白名单
    if (whiteList.indexOf(to.path) > -1) {
      //表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()  //手动强制关闭，解决了手动切换地址是进度条不关闭的问题
})
//后置守卫
router.afterEach(() => nprogress.done()  //关闭进度条
)