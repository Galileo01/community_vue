import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/Home')
const Login = () => import('views/Login')
const PostNew = () => import('views/PostNew')
const PostDetail = () => import('views/PostDetail')
const Profile = () => import('views/Profile')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/search',
    component: Home,
    props: true
  },
  {
    path: '/login/:type',
    component: Login,
    props: true
  },
  {
    path: '/post/new',
    component: PostNew
  },
  {
    path: '/postdetail/:post_id',
    component: PostDetail,
    props: true
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
