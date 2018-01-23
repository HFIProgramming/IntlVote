import Vue from 'vue'
import Router from 'vue-router'
import Basement from '@/layouts/Basement'
import VoteBasement from '@/layouts/VoteBasement'
import Index from '@/layouts/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/ticket/:ticket/vote/:vote_id',
      name: 'VoteBasement',
      component: VoteBasement,
      props: true
    },
    {
      path: '/ticket/:ticket',
      name: 'Basement',
      component: Basement,
      props: true
    }
  ]
})
