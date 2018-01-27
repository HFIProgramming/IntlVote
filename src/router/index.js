import Vue from 'vue'
import Router from 'vue-router'
import Basement from '@/layouts/Basement'
import VoteBasement from '@/layouts/VoteBasement'
import VoteResult from '@/layouts/VoteResult'
import NotFoundComponent from '@/layouts/NotFoundComponent'
import Index from '@/layouts/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/vote/ticket/:ticket/vote/:vote_id/',
      name: 'VoteBasement',
      component: VoteBasement,
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/vote/ticket/:ticket/',
      name: 'Basement',
      component: Basement,
      props: true,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: 'vote/ticket/:ticket/vote/:vote_id/result',
      name: 'VoteResult',
      component: VoteResult,
      props: true,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    { path: '*', component: NotFoundComponent }
  ]
})
