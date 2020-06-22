import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SongEdit from '../views/SongEdit.vue'
import SongAdd from '../views/SongAdd.vue'
import SongView from '../views/SongView.vue'
import Songbooks from '../views/Songbooks.vue'
import SongbookAdd from '../views/SongbookAdd.vue'
import SongbookEdit from '../views/SongbookEdit.vue'
import SongEditGuidelines from '../components/SongEditGuidelines.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/guidelines',
    name: 'Guidelines',
    component: SongEditGuidelines
  },
  {
    path: '/song/:song_slug/edit',
    name: 'SongEditPublic',
    component: SongEdit,
    props: true
  },
  {
    path: '/user/song/:song_slug/edit',
    name: 'SongEditUser',
    component: SongEdit,
    props: true
  },
  {
    path: '/songadd',
    name: 'SongAdd',
    component: SongAdd,
    props: true
  },
  {
    path: '/song/:song_slug',
    name: "SongViewPublic",
    component: SongView,
    props: true
  },
  {
    path: '/user/song/:song_slug',
    name: "SongViewUser",
    component: SongView,
    props: true
  },
  {
    path: '/user/songbooks',
    name: "Songbooks",
    component: Songbooks,
  },
  {
    path: '/user/songbook-add',
    name: "SongbookAdd",
    component: SongbookAdd
  },
  {
    path: '/user/songbook/:songbook_slug',
    name: "SongbookEdit",
    component: SongbookEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
